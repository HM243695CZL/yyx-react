import React, {useEffect, useState} from 'react';
import {Form, Input} from 'antd';
const {TextArea} = Input;
const {Item} = Form;
const GlobalComponent = {
    Input,
    TextArea
};
const RenderItem = ({
    componentList,
    changeFieldValue
}) => {
    const [form] = Form.useForm();
    let initVal = {};
    componentList.map(item => {
        initVal[item.__vModel__] = item.config.fieldDefaultValue
    });
    const [init] = useState(initVal);
    useEffect(() => {
        form.setFieldsValue(initVal);
    }, [componentList]);
    const loop = (arr, index) => {
        return arr.map((item, i) => {
            const indexs = index === '' ? String(i) : `${index}-${i}`;
            const ComponentInfo = GlobalComponent[item.config.tag];
            return (
                <div data-id={indexs} key={indexs}>
                    <Item
                        label={item.config.label}
                        labelAlign={item.config.labelAlign}
                        labelCol={{
                            span: item.config.colSpan
                        }}
                        name={item.__vModel__}
                        required={item.config.required}
                        tooltip={item.config.tooltip}
                        initialValue={item.config.defaultValue}
                        wrapperCol={{
                            span: item.config.span
                        }}
                    >
                        <ComponentInfo {...item.attr} />
                    </Item>
                </div>
            )
        })
    };
    return (
        <div className='render-item-container'>
            <Form
                initialValues={init}
                form={form}
                onFieldsChange={(changedFields, allFields) => {
                    changeFieldValue(changedFields, allFields);
                }}
            >
                {
                    loop(componentList, '')
                }
            </Form>
        </div>
    )
};

export default RenderItem
