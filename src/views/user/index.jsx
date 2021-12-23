import React, { useState, useEffect } from 'react';
import { Tag, Table, Button, message, Input, Form } from 'antd';
import { cloneDeep } from 'loadsh';
import { getUserListPageApi, saveUserApi, updateUserApi, deleteUserApi, viewUserApi } from '@/api/user';
import { viewFormConfigApi } from '@/api/formConfig';
import { RES_STATUS, PageEntity, FilterEnum } from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import Pagination from '@/components/Pagination';
import CommonModal from '@/components/CommonModal';
import store from '@/store';
import './index.less';
const { Item } = Form;

const User = props => {
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
       dataList: [],
       total: 0,
       title: '',
       id: null,
       fieldArr: ['username', 'password', 'email', 'mobile']
    });
    const [renderList, setRenderList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
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
            width: 120,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showModal(data)}>修改</span>
                        <span className="operate-del" onClick={delUser(data)}>删除</span>
                    </div>
                )
            }
        }
    ];
    const getFormConfig = () => {
        viewFormConfigApi({
            formKey: store.getState().user.formInfo.UserFormKey
        }).then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE) {
                setRenderList(JSON.parse(res.data.configData));
            } else {
                message.error(`获取表单配置失败，请检查"表单生成器"中的数据! 当前接口的formKey为："${ store.getState().user.formInfo.UserFormKey}"`);
            }
        })
    };
    const getDataList = () => {
        form.validateFields().then(val => {
            let pageInfo = cloneDeep(PageEntity);
            for (const o in val) {
                if (val[o]) {
                    pageInfo.filters[o] = PaginationUtils.filters(val[o], FilterEnum.CONTAINS);
                }
            }
            getUserListPageApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setStateData({
                        ...stateData,
                        dataList: res.data.dataList,
                        total: res.total
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
    const delUser = ({id}) => {
        return e => {
            deleteUserApi({id}).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList();
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
                    message.success(res.data.message);
                    getDataList();
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        } else {
            saveUserApi(val).then(res => {
                if(res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList();
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
        getDataList();
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
                    <Button type='default' onClick={e => getDataList()}>查询</Button>
                </div>
            </div>
            <Pagination>
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={dataList}
                    bordered
                    pagination={{
                        total,
                        showSizeChanger: true,
                        showTotal: total => `共${total}条`,
                        onChange: (current, pageSize) => {
                            console.log(current);
                            console.log(pageSize);
                        }
                    }}
                />
            </Pagination>
            <CommonModal
                title={title}
                isVisible={isVisible}
                id={id}
                renderList={renderList}
                confirm={confirm}
                cancel={cancel}
                viewFunc={viewUserApi}
                fieldArr={fieldArr}
            />
        </div>
    )
};
export default User
