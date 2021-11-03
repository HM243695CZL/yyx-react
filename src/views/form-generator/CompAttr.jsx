import React, {useState, useEffect} from 'react';
import {Tabs, Form, Input} from 'antd';

const {Item} = Form;
const CompAttr = ({
    activeItem,
    changeFieldValue
}) => {
    const {
        label
    } = activeItem.config;
    const [form] = Form.useForm();
    const initVal = {
        __vModel__: activeItem.__vModel__,
        label
    };
    const [init] = useState(initVal);
    useEffect(() => {
        form.setFieldsValue(initVal);
    }, [activeItem]);
    return (
        <Form
            initialValues={init}
            form={form}
            onFieldsChange={(_, allFields) => {
                changeFieldValue(allFields);
            }}
            labelCol={{
                span: 4
            }}
        >
            <Item
                label='标题'
                name='label'
            >
                <Input autoComplete='off'/>
            </Item>
            <Item
                label='字段名'
                name='__vModel__'
            >
                <Input autoComplete='off'/>
            </Item>
        </Form>
    )
};

export default CompAttr
