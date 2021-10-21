/**
 * 弹窗组件配置
 */
import React from 'react';
import {Modal, Form } from "antd";
import renderItem from './renderItem';

export default function CommonModal({formConfig, isShow, title, confirm, cancel}) {
    // 如果没有initialValues字段，则构建表单初始值
    if(!formConfig.initialValues) {
        let initialValues = {};
        formConfig.field.map(item => {
            initialValues[item.__config__.key] = item.__config__.value;
        });
        formConfig['initialValues'] = initialValues;
    }
    const [form] = Form.useForm();
    const submit = () => {
        form.validateFields().then(val => {
            confirm(val);
        })
    };
    const closeModal = () => {
        form.resetFields();
        cancel();
    };
    return (
        <div>
            <Modal title={title} visible={isShow}
                   onOk={submit} onCancel={closeModal}
                   okText='确定'
                   cancelText='取消'
                   maskClosable={false}
            >
                <Form
                    {...formConfig.layout}
                    form={form}
                    initialValues={formConfig.initialValues}
                >
                    {
                        formConfig.field.map(item => renderItem[item.tag](item))
                    }
                </Form>
            </Modal>
        </div>
    )
}
