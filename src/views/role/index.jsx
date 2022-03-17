import React, {useState, useEffect} from 'react';
import { Table, Button, message, Input, Form } from 'antd';
import { cloneDeep } from 'loadsh';
import { getRolePageApi, saveRoleApi, updateRoleApi,
    viewRoleApi, delRoleApi, divideAuthApi
} from '@/api/role';
import DivideAuth from './divide-auth';
import { viewFormConfigApi } from '@/api/formConfig';
import { RES_STATUS, PageEntity, FilterEnum } from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import MyPagination from '@/components/Pagination';
import CommonModal from '@/components/CommonModal';
import store from '@/store';
import './index.less';

const { Item } = Form;

const Role = props => {
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
        dataList: [],
        total: 0,
        title: '',
        id: null,
        fieldArr: ['name', 'remark']
    });
    const [renderList, setRenderList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [divideObj, setDivideObj] = useState({
        divideId: ''
    });
    const [showAuth, setShowAuth] = useState(false);
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: '角色名称',
            dataIndex: 'name'
        },
        {
            title: '备注',
            dataIndex: 'remark'
        },
        {
            title: '创建人',
            dataIndex: 'createUser'
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={divideAuth(data)}>分配权限</span>
                        <span className='operate-edit' onClick={showModal(data)}>修改</span>
                        <span className="operate-del" onClick={delRole(data)}>删除</span>
                    </div>
                )
            }
        }
    ];
    const getFormConfig = () => {
        viewFormConfigApi({
            formKey: store.getState().user.formInfo.RoleFormKey
        }).then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE && res.datas) {
                setRenderList(JSON.parse(res.datas.configData))
            } else {
                message.error(`获取表单配置失败，
                请检查"表单生成器"中的数据，当前接口的formKey为：
                "${ store.getState().user.formInfo.RoleFormKey}"`);
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
            getRolePageApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setStateData({
                        ...stateData,
                        dataList: res.datas.data,
                        total: res.datas.totalRecords
                    })
                }
            })
        })
    };
    const divideAuth = data => {
       return e => {
           setDivideObj({
               ...divideObj,
               divideId: data.id
           });
           setShowAuth(true)
       }
    };
    const showModal = data => {
        return e => {
            if (data) {
                // 修改
                setStateData({
                    ...stateData,
                    title: '修改角色名称',
                    id: data.id
                });
                setIsVisible(true);
            } else {
                // 新增
                setStateData({
                    ...stateData,
                    title: '新增角色名称',
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
    const delRole = ({id}) => {
        return e => {
            delRoleApi({id}).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
                    getDataList(pageInfo);
                } else {
                    message.error(res.message)
                }
            })
        }
    };
    const confirm = val => {
        if (val.id) {
            updateRoleApi(val).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        } else {
            saveRoleApi(val).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        }
    };
    const divideAuthConfirm = val => {
        divideAuthApi({
            id: divideObj.divideId,
            menus: val
        }).then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE) {
                message.success(res.message);
                setShowAuth(false);
            } else {
                message.error(res.message);
            }
        })
    };
    const divideAuthCancel = () => {
        setShowAuth(false);
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
        <div className='role-container'>
            <div className='search-box'>
                <Form
                    layout='inline'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    autoComplete='off'
                    form={form}
                >
                    <Item
                        label='角色名称'
                        name='name'
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
            <DivideAuth
                title='分配权限'
                divideObj={divideObj}
                isShow={showAuth}
                confirm={divideAuthConfirm}
                cancel={divideAuthCancel}
            />
            <CommonModal
                title={title}
                isVisible={isVisible}
                id={id}
                renderList={renderList}
                confirm={confirm}
                cancel={cancel}
                viewFunc={viewRoleApi}
                fieldArr={fieldArr}
            />
        </div>
    )
};

export default Role;
