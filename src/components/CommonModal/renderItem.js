/**
 * 表单选项配置
 */
import React from 'react';
import {Form, Input, Select, Radio, InputNumber} from 'antd';
const renderItem = {
    'Input': function (item) {
        return (
            <Form.Item
                key={item.key}
                label={item.__config__.label}
                name={item.__config__.key}
                rules={item.__config__.rules}
            >
                <Input placeholder={item.__config__.placeholder} autoComplete='off'/>
            </Form.Item>
        )
    },
    'Select': function (item) {
        return (
            <Form.Item
                key={item.key}
                label={item.__config__.label}
                name={item.__config__.key}
                rules={item.__config__.rules}
            >
                <Select
                    allowClear
                >
                    {
                        item.options.map(ele => (
                            <Select.Option key={ele.value} value={ele.value}>{ele.label}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
        )
    },
    'Radio': function (item) {
        return (
            <Form.Item
                key={item.key}
                label={item.__config__.label}
                name={item.__config__.key}
                rules={item.__config__.rules}
            >
                <Radio.Group onChange={item.cb}>
                    {
                        item.options.map(ele => (
                            <Radio key={ele.value} value={ele.value}>{ele.label}</Radio>
                        ))
                    }
                </Radio.Group>
            </Form.Item>
        )
    },
    'InputNumber': function (item) {
        return (
            <Form.Item
                key={item.key}
                label={item.__config__.label}
                name={item.__config__.key}
                rules={item.__config__.rules}
            >
                <InputNumber
                    min={item.min}
                    style={item.style}
                />
            </Form.Item>
        )
    }
};
export default renderItem;
