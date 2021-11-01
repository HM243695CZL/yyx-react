import React, { Component, useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { viewUserApi } from '@/api/user';
import {RES_STATUS} from '../../utils/code';
const { Item } = Form;

const UserModal = ({
    title,
    isVisible,
    cancel,
    confirm,
    id,
}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    useEffect(() => {
        if (isVisible) {
            if (id) {
                viewUserApi({
                    id
                }).then(res => {
                    if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        const { username, password, email, mobile } = res.data;
                        setData(res.data);
                        form.setFieldsValue({
                            username,
                            password,
                            email,
                            mobile
                        });
                    }
                })
            } else {
                form.setFieldsValue({
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                });
            }
        }
    }, [isVisible, id]);
    const submit = () => {
      form.validateFields().then(val => {
          val.user_id = id;
          confirm(val);
      });
    };
    return (
        <div className='user-modal-container'>
            <Modal
                title={title}
                visible={isVisible}
                maskClosable={false}
                width={'30%'}
                onCancel={cancel}
                footer={[
                    <Button key='user-cancel' type='default' onClick={cancel}>取消</Button>,
                    <Button key='user-confirm' type='primary' onClick={submit}>确定</Button>
                ]}
            >
                <Form
                    labelCol={{
                        span: 4
                    }}
                    wrapperCol={{
                        span: 20
                    }}
                    form={form}
                    initialValues={data}
                    autoComplete='off'
                >
                    <Item
                        label='用户名'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: '用户名不能为空'
                            }
                        ]}
                    >
                        <Input placeholder={'请输入用户名'}/>
                    </Item>
                    <Item
                        label='密码'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空'
                            }
                        ]}
                    >
                        <Input placeholder={'请输入密码'}/>
                    </Item>
                    <Item
                        label='邮箱'
                        name='email'
                        rules={[]}
                    >
                        <Input placeholder={'请输入邮箱'}/>
                    </Item>
                    <Item
                        label='手机号'
                        name='mobile'
                        rules={[]}
                    >
                        <Input placeholder={'请输入手机号'} type='number'/>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
};

export default UserModal
