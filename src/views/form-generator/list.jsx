import React, {useState, useEffect} from 'react';
import {Button, Table, Modal, message, Form, Input} from 'antd';
import {getFormConfigListApi, deleteFormConfigApi} from '@/api/formConfig';
import {RES_STATUS, PageEntity, FilterEnum} from '@/utils/code';
import MyPagination from '@/components/Pagination';
import {PaginationUtils} from '@/utils/PaginationUtils';
import {cloneDeep} from 'lodash';
import dayjs from 'dayjs';
import './list.less';
const {Item} = Form;

const List = ({
  changeFlag,
  refresh
}) => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [total, setTotal] = useState(0);
    const [prevImgUrl, setPrevImgUrl] = useState(null);
    const [isVisiblePreview, setIsVisiblePreview] = useState(false);
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const columns = [
        {
            title: '表单名称',
            dataIndex: 'name'
        },
        {
            title: '表单key',
            dataIndex: 'formKey'
        },
        {
            title: '备注',
            dataIndex: 'remark'
        },
        {
            title: '缩略图',
            dataIndex: 'screenShot',
            render: data => <img onClick={e => previewImg(data)} className='img' src={data} title='缩略图' alt=''/>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: data => dayjs(data).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showConfig(data)}>修改</span>
                        <span className="operate-del" onClick={deleteConfig(data)}>删除</span>
                    </div>
                )
            }
        }
    ];
    const showConfig = data => {
        return e => {
            changeFlag(data);
        }
    };
    const deleteConfig = ({id}) => {
       return e => {
           deleteFormConfigApi({
               id
           }).then(res => {
               if (res.code === RES_STATUS.SUCCESS_CODE) {
                   message.success(res.data.message);
                   getDataList();
               } else {
                   message.error(res.data.message);
               }
           })
       }
    };
    const previewImg = img => {
        setIsVisiblePreview(true);
        setPrevImgUrl(img);
    };
    const getDataList = pageInfo => {
        form.validateFields().then(val => {
            for (let o in val) {
                if(val[o]) {
                    pageInfo.filters[o] = PaginationUtils.filters(val[o], FilterEnum.CONTAINS);
                } else {
                    delete pageInfo.filters[o];
                }
            }
            getFormConfigListApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setDataList(res.data.dataList);
                    setTotal(res.data.total);
                } else {
                    message.error(res.data.message);
                }
            });
        });
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
    useEffect(() => {
        getDataList(pageInfo);
    }, [refresh]);
    return (
        <div className='list-container'>
            <div className="search-box">
                <Form
                    layout='inline'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    form={form}
                    autoComplete='off'
                >
                    <Item
                        label='表单名称'
                        name='name'
                    >
                        <Input/>
                    </Item>
                    <Item
                        label='表单key'
                        name='formKey'
                    >
                        <Input/>
                    </Item>
                </Form>
                <div className="btn-box">
                    <Button type='primary' onClick={showConfig()}>新增</Button>
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
            <Modal
                title='预览'
                visible={isVisiblePreview}
                onCancel={e => setIsVisiblePreview(false)}
                maskClosable={false}
                width='70%'
                footer={[
                    <Button type='primary' key='preview-img' onClick={e => setIsVisiblePreview(false)}>关闭</Button>
                ]}
            >
                <img src={prevImgUrl} alt=""/>
            </Modal>
        </div>
    )
};
export default List
