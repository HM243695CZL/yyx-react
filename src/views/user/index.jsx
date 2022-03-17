import React, { useState, useEffect } from 'react';
import { Tag, Table, Button, message, Input, Form } from 'antd';
import { cloneDeep } from 'loadsh';
import {
    getUserListPageApi, saveUserApi, updateUserApi,
    deleteUserApi, viewUserApi, changeStatusApi, changePassApi
} from '@/api/user';
import {viewFormConfigApi } from '@/api/formConfig';
import { RES_STATUS, PageEntity, FilterEnum } from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import MyPagination from '@/components/Pagination';
import store from '@/store';
import CommonModal from '@/components/CommonModal';
import OperateUser from './operate-user';
import './index.less';
const { Item } = Form;

const User = props => {
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
       dataList: [],
       total: 0,
       title: '',
       id: null,
        fieldArr: []
    });
    const [isVisible, setIsVisible] = useState(false);
    const [renderList, setRenderList] = useState([]);
    const [isPass, setIsPass] = useState(false);
    const [titlePass] = useState('修改密码');
    const [passId, setPassId] = useState();
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '备注',
            dataIndex: 'remark'
        },
        {
            title: '所属角色',
            dataIndex: 'roleNames',
            render: data => data.map(item => <Tag key={item} color='#52c41a'>{item}</Tag>)
        },
        {
            title: '手机号',
            dataIndex: 'mobile'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => {
                return (
                    <span>{data ? <Tag color='#87d068'>启用</Tag> : <Tag color='#f50'>禁用</Tag>}</span>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 240,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showModal(data)}>修改</span>
                        {
                            data.status ? <span className='operate-edit' onClick={changeStatus(data)}>禁用</span> : <span className='operate-edit' onClick={changeStatus(data)}>启用</span>
                        }
                        <span className='operate-edit' onClick={showPassModal(data)}>修改密码</span>
                        <span className="operate-del" onClick={delUser(data)}>删除</span>
                    </div>
                )
            }
        }
    ];
    const getFormConfig = () => {
        viewFormConfigApi({
            formKey: store.getState().user.formInfo.EditPassFormKey
        }).then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE && res.datas) {
                setRenderList(JSON.parse(res.datas.configData))
            } else {
                message.error(`获取表单配置失败，
                请检查"表单生成器"中的数据，当前接口的formKey为：
                "${ store.getState().user.formInfo.EditPassFormKey}"`);
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
            getUserListPageApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setStateData({
                        ...stateData,
                        dataList: res.datas.data,
                        total: res.datas.totalRecords
                    })
                }
            })
        });
    };
    const showModal = data => {
        return e => {
            if (data) {
                // 修改
                setStateData({
                    ...stateData,
                    title: '修改用户',
                    id: data.id
                });
                setIsVisible(true);
            } else {
                // 新增
                setStateData({
                    ...stateData,
                    title: '新增用户',
                    id: null
                });
                setIsVisible(true);
            }
        }
    };
    const showPassModal = data => {
        return e => {
            setIsPass(true);
            setPassId(data.id);
        }
    };
    const changeStatus = data => {
        return e => {
            changeStatusApi({
                id: data.id
            }).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
                    getDataList(pageInfo);
                } else {
                    message.error(res.message);
                }
            })
        }
    };
    const delUser = ({id}) => {
        return e => {
            deleteUserApi({id}).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
                    getDataList(pageInfo);
                } else {
                    message.error(res.message);
                }
            })
        }
    };
    const confirm = val => {
        if (val.id) {
            updateUserApi(val).then(res => {
                if(res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        } else {
            saveUserApi(val).then(res => {
                if(res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.message);
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
    const confirmPass = val => {
        if (val.password !== val.confirmPass) {
            message.error('两次密码不一致');
            return false;
        }
        changePassApi({
            password: val.password,
            id: passId
        }).then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE) {
                message.success(res.message);
                getDataList(pageInfo);
                setIsPass(false);
            } else {
                message.error(res.message);
            }
        })
    };
    const cancelPass = () => {
        setIsPass(false);
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
        getFormConfig();
    }, []);
    const { dataList, title, id, total, fieldArr } = stateData;
    return (
        <div className='user-container'>
            <div className='search-box'>
                <Form
                    layout='inline'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    autoComplete='off'
                    form={form}
                >
                    <Item
                        label='用户名'
                        name='username'
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
            <OperateUser
                title={title}
                isShow={isVisible}
                userId={id}
                confirm={confirm}
                cancel={cancel}
            />
            <CommonModal
                title={titlePass}
                isVisible={isPass}
                id=''
                renderList={renderList}
                confirm={confirmPass}
                cancel={cancelPass}
                fieldArr={fieldArr}
            />
        </div>
    )
};
export default User
