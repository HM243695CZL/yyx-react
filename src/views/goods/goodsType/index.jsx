import React, {useState, useEffect} from 'react';
import { Table, Button, message, Input, Form } from 'antd';
import { cloneDeep } from 'loadsh';
import dayjs from 'dayjs';
import { getGoodsTypePageApi, saveGoodsTypeApi, updateGoodsTypeApi,
    delGoodsTypeApi, viewGoodsTypeApi
} from '@/api/goodsType';
import { viewFormConfigApi } from '@/api/formConfig';
import { RES_STATUS, PageEntity, FilterEnum } from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import MyPagination from '@/components/Pagination';
import CommonModal from '@/components/CommonModal';
import store from '@/store';
import './index.less';
const { Item } = Form;

const GoodsType = props => {
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
        dataList: [],
        total: 0,
        title: '',
        id: null,
        fieldArr: ['typeName']
    });
    const [renderList, setRenderList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: '分类名称',
            dataIndex: 'typeName'
        },
        {
            title: '创建人',
            dataIndex: 'createUser'
        },
        {
            title: '创建时间',
            dataIndex: 'createdTime',
            render: data => <span>{ dayjs(data).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showModal(data)}>修改</span>
                        <span className="operate-del" onClick={delGoodsType(data)}>删除</span>
                    </div>
                )
            }
        }
    ];
    const getFormConfig = () => {
        viewFormConfigApi({
            formKey: store.getState().user.formInfo.GoodsTypeFormKey
        }).then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE && res.data) {
                setRenderList(JSON.parse(res.data.configData));
            } else {
                message.error(`获取表单配置失败，
                请检查"表单生成器"中的数据，当前接口的formKey为：
                "${ store.getState().user.formInfo.GoodsTypeFormKey}"`);
            }
        })
    };
    const getDataList = pageInfo => {
        form.validateFields().then(val => {
            for (const o in val) {
                if (val[o]) {
                    pageInfo.filters[o] = PaginationUtils.filters(val[o], FilterEnum.CONTAINS);
                } else {
                    delete pageInfo.filters[o];
                }
            }
            getGoodsTypePageApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setStateData({
                        ...stateData,
                        dataList: res.data.dataList,
                        total: res.data.total
                    })
                }
            })
        })
    };
    const showModal = data => {
        return e => {
            if (data) {
                // 修改
                setStateData({
                    ...stateData,
                    title: '修改分类',
                    id: data.id
                });
                setIsVisible(true);
            } else {
                // 新增
                setStateData({
                    ...stateData,
                    title: '新增分类',
                    id: null
                });
                setIsVisible(true);
            }
        }
    };
    const changePage = data => {
        let obj = {
            ...pageInfo,
            ...data
        };
        if (data.rows !== pageInfo.rows) {
            // 修改每页条数
            obj.first = 1;
        }
        setPageInfo(obj);
        getDataList(obj);
    };
    const clickSearch = () => {
        setPageInfo({
            ...pageInfo,
            first: 1
        });
        getDataList({
            ...pageInfo,
            first: 1
        });
    };
    const delGoodsType = ({id}) => {
        return e => {
            delGoodsTypeApi({id}).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                } else {
                    message.error(res.message)
                }
            });
        }
    };
    const confirm = val => {
        if (val.id) {
            updateGoodsTypeApi(val).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        } else {
            saveGoodsTypeApi(val).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        }
    };
    const cancel = () => {
        setIsVisible(false);
    };
    useEffect(() => {
        getDataList(pageInfo);
        getFormConfig();
    }, []);
    const { dataList, title, id, total, fieldArr } = stateData;
    return (
        <div className='goods-type-container'>
            <div className='search-box'>
                <Form
                    layout='inline'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    autoComplete='off'
                    form={form}
                >
                    <Item
                        label='分类名称'
                        name='categoryName'
                    >
                        <Input/>
                    </Item>
                </Form>
                <div className="btn-box">
                    <Button type='primary' onClick={showModal()}>新增</Button>
                    <Button type='default' onClick={e => clickSearch()}>查询</Button>
                </div>
            </div>
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataList}
                bordered
                pagination={false}
            />
            <MyPagination
                page={pageInfo.first}
                changePage={changePage}
                total={total}
            />
            <CommonModal
                title={title}
                isVisible={isVisible}
                id={id}
                renderList={renderList}
                confirm={confirm}
                cancel={cancel}
                viewFunc={viewGoodsTypeApi}
                fieldArr={fieldArr}
            />
        </div>
    )
};

export default GoodsType;