import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Select, Switch, TreeSelect, Radio, InputNumber, Button} from 'antd';
import {viewUserApi } from '@/api/user';
import { getRoleListApi } from '@/api/role';
import cx from 'classnames'
import {RES_STATUS} from '@/utils/code';

const {Item} = Form;
const { Option } = Select;
const OperateUser = ({
    isShow,
    title,
    confirm,
    cancel,
    userId
}) => {
    const [init, setInit] = useState({});
    const [roleList, setRoleList] = useState([]);
    const [form] = Form.useForm();
    const submit = () => {
        form.validateFields().then(val => {
            val.id = userId;
            confirm(val);
        })
    };
    useEffect(() => {
        if (isShow) {
            getRoleListApi().then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setRoleList(res.datas);
                }
            });
            if (userId) {
                viewUserApi({
                    id: userId
                }).then(res => {
                    if (res.code === RES_STATUS.SUCCESS_CODE) {
                        setInit(res.datas);
                        form.resetFields();
                        form.setFieldsValue(init);
                    }
                })
            } else {
                form.resetFields();
                form.setFieldsValue(init);
            }
        } else {
            setInit({});
        }
    }, [isShow]);
    return (
        <div className='operate-user-container'>
            <Modal
                title={title}
                visible={isShow}
                onOk={submit}
                onCancel={cancel}
                okText='确定'
                cancelText='取消'
                maskClosable={false}
                width={'40%'}
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    form={form}
                    initialValues={init}
                >
                    <Item
                        label='用户名'
                        name='username'
                        rules={[
                            {required: true, message: `请输入用户名称`}
                        ]}
                    >
                        <Input placeholder='请输入用户名' allowClear autoComplete='off'/>
                    </Item>
                    <Item
                        label='邮箱'
                        name='email'
                        rules={[
                            {required: true, message: `请输入邮箱`}
                        ]}
                    >
                        <Input placeholder='请输入邮箱' allowClear autoComplete='off'/>
                    </Item>
                    <Item
                        label='手机号'
                        name='mobile'
                        rules={[
                            {required: true, message: `请输入手机号`}
                        ]}
                    >
                        <Input placeholder='请输入手机号' type='number' allowClear autoComplete='off'/>
                    </Item>
                    <Item
                        label='角色'
                        name='roles'
                        roles={[
                            {required: true, message: `请选择角色`}
                        ]}

                    >
                        <Select
                            mode='multiple'
                        >
                            {
                                roleList.map(item => (
                                    <Option key={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item
                        label='备注'
                        name='remark'
                        rules={[
                            {required: true, message: '请输入备注'}
                        ]}
                    >
                        <Input placeholder='请输入备注' allowClear autoComplete='off'/>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
};

export default OperateUser
