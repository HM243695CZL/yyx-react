import React, {useState, useEffect} from 'react';
import {
    Form, Input, Radio, Slider, Switch,
    InputNumber, Button, Modal, Checkbox
} from 'antd';
import {concat} from 'lodash';
import {
    TextList, RadioList, InputList, SwitchAttrList, InputNumberList,
    SwitchConfigList, CheckBoxList,
    optionObj
} from '../generator/right-board-config';
import IconPanel from '../icon-panel/IconPanel'
const {Item} = Form;
const {Group} = Checkbox;
const CompAttr = ({
    activeItem,
    changeFieldValue
}) => {
    const {
        fieldDefaultValue,
        label,
        labelAlign,
        span,
        colSpan,
        required,
    } = activeItem.config;
    const {
        placeholder,
        addonBefore,
        addonAfter,
        allowClear,
        bordered,
        disabled,
        maxLength,
        type,
        showCount,
        rows,
        accept,
        action,
        listType,
        maxCount
    } = activeItem.attr;
    const {
        buttonText
    } = activeItem.extra;
    const [form] = Form.useForm();
    const initVal = {
        fieldDefaultValue,
        __vModel__: activeItem.__vModel__,
        label,
        labelAlign,
        span,
        colSpan,
        required,

        placeholder,
        addonBefore,
        addonAfter,
        allowClear,
        bordered,
        disabled,
        maxLength,
        type,
        showCount,
        rows,
        accept,
        action,
        listType,
        maxCount,

        buttonText
    };
    const activeConfigKeys = Object.keys(activeItem.config);
    const activeAttrKeys = Object.keys(activeItem.attr);
    const activeExtraKeys = Object.keys(activeItem.extra);
    const allKeys = concat(activeConfigKeys, activeAttrKeys, activeExtraKeys);
    const [isShowIconModal, setIsShowIconModal] = useState(false);
    const chooseIcon = data => {
        console.log(data.render.displayName);
        setIsShowIconModal(false);
    };
    const cancel = () => {
        setIsShowIconModal(false);
    };
    const [init] = useState(initVal);
    useEffect(() => {
        form.setFieldsValue(initVal);
    }, [activeItem]);
    return (
        <div className='comp-attr-container'>
            <Form
                initialValues={init}
                form={form}
                onFieldsChange={(changedFields, allFields) => {
                    changeFieldValue(changedFields, allFields);
                }}
                labelCol={{
                    span: 8
                }}
            >
                <Item
                    label='????????????'
                    name='span'
                    wrapperCol={{
                        span
                    }}
                >
                    <Slider min={0} max={24} />
                </Item>
                <Item
                    label='label??????'
                    name='colSpan'
                    wrapperCol={{
                        span
                    }}
                >
                    <Slider min={0} max={12} />
                </Item>
                <Item
                    label='?????????'
                    name='__vModel__'
                    wrapperCol={{
                        span
                    }}
                >
                    <Input autoComplete='off' allowClear/>
                </Item>
                {
                    TextList.map(item => {
                        if(allKeys.includes(item.key)) {
                            return (
                                <div className='form-item' key={item.key}>
                                    {
                                        InputList.includes(item.key) && (
                                            <Item
                                                label={item.text}
                                                name={item.key}
                                                key={item.key}
                                            >
                                                <Input autoComplete='off' allowClear/>
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
                                    {
                                        SwitchAttrList.includes(item.key) && (
                                            <Item
                                                label={item.text}
                                                name={item.key}
                                                key={item.key}
                                            >
                                                <Switch checked={activeItem.attr[item.key]}  />
                                            </Item>
                                        )
                                    }
                                    {
                                        CheckBoxList.includes(item.key) && (
                                            <Item
                                                label={item.text}
                                                name={item.key}
                                                key={item.key}
                                            >
                                                <Group
                                                    options={optionObj[item.key]}
                                                />
                                            </Item>
                                        )
                                    }
                                    {
                                        SwitchConfigList.includes(item.key) && (
                                            <Item
                                                label={item.text}
                                                name={item.key}
                                                key={item.key}
                                            >
                                                <Switch checked={activeItem.config[item.key]}  />
                                            </Item>
                                        )
                                    }
                                    {
                                        InputNumberList.includes(item.key) && (
                                            <Item
                                                label={item.text}
                                                name={item.key}
                                                key={item.key}
                                            >
                                                <InputNumber className='w100' />
                                            </Item>
                                        )
                                    }
                                </div>
                            )
                        }
                    })
                }
            </Form>
            <Modal
                title='????????????'
                visible={isShowIconModal}
                maskClosable={false}
                width='80%'
                footer={[
                    <Button key='cancel' type='primary' onClick={e => cancel()}>??????</Button>
                ]}
            >
                <IconPanel
                    chooseIcon={chooseIcon}
                />
            </Modal>
        </div>
    )
};

export default CompAttr
