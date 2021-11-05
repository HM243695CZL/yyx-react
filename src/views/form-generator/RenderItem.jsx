import React from 'react';
import {Form, Input} from 'antd';
const {TextArea} = Input;
const {Item} = Form;
const GlobalComponent = {
    Input,
    TextArea
};
const RenderItem = ({
    componentList
}) => {
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
            <Form>
                {
                    loop(componentList, '')
                }
            </Form>
        </div>
    )
};

export default RenderItem
