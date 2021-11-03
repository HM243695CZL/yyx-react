import React, {useState, useEffect} from 'react';
import {Form, Input, Radio} from 'antd';
import {
    TextList, RadioList, InputList,
    optionObj
} from './generator/right-board-config';

const {Item} = Form;
const CompAttr = ({
    activeItem,
    changeFieldValue
}) => {
    const {
        label,
        labelAlign
    } = activeItem.config;
    const {
        placeholder
    } = activeItem.attr;
    const [form] = Form.useForm();
    const initVal = {
        __vModel__: activeItem.__vModel__,
        label,
        placeholder,
        labelAlign
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
                span: 8
            }}
        >
            {
                TextList.map(item => {
                    return (
                        <div className='form-item' key={item.key}>
                            {
                                InputList.includes(item.key) && (
                                    <Item
                                        label={item.text}
                                        name={item.key}
                                        key={item.key}
                                    >
                                        <Input autoComplete='off'/>
                                    </Item>
                                )
                            }
                            {
                                RadioList.includes(item.key) && (
                                    <Item
                                        label={item.text}
                                        name={item.key}
                                        key={item.key}
                                    >
                                        <Radio.Group
                                            options={optionObj[item.key]}
                                            value={labelAlign}
                                            optionType="button"
                                            buttonStyle="solid"
                                        />
                                    </Item>
                                )
                            }
                        </div>
                    )
                })
            }
        </Form>
    )
};

export default CompAttr
