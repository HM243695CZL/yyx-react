import React, {useState, useEffect} from 'react';
import {
    Form, Input, Radio, Slider, Switch,
    InputNumber, Button, Modal
} from 'antd';
import {LikeOutlined, DeleteOutlined} from '@ant-design/icons';
import {
    TextList, RadioList, InputList, SwitchList, InputNumberList,
    ButtonList, optionObj
} from './generator/right-board-config';
import IconPanel from './IconPanel'
const {Item} = Form;
const CompAttr = ({
    activeItem,
    changeFieldValue
}) => {
    const {
        label,
        labelAlign,
        span
    } = activeItem.config;
    const {
        placeholder,
        addonBefore,
        addonAfter,
        allowClear,
        bordered,
        disabled,
        maxLength,
        prefix
    } = activeItem.attr;
    const [form] = Form.useForm();
    const initVal = {
        __vModel__: activeItem.__vModel__,
        label,
        labelAlign,
        span,

        placeholder,
        addonBefore,
        addonAfter,
        allowClear,
        bordered,
        disabled,
        maxLength,
        prefix
    };
    const [isShowIconModal, setIsShowIconModal] = useState(false);
    const [currentIconPosition, setCurrentIconPosition] = useState('');
    const showIconModal = data => {
        setCurrentIconPosition(data);
        setIsShowIconModal(true);
    };
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
                    label='表单栅格'
                    name='span'
                    wrapperCol={{
                        span
                    }}
                >
                    <Slider min={0} max={24} />
                </Item>
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
                                {
                                    SwitchList.includes(item.key) && (
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
                                {
                                    ButtonList.includes(item.key) && (
                                        <Item
                                            label={item.text}
                                            name={item.key}
                                            key={item.key}
                                        >
                                            <div className='button-box'>
                                                <Button key='choose' name='choose' type='default' size='small'
                                                        onClick={e => showIconModal(item.key)}
                                                        icon={<LikeOutlined />}
                                                >
                                                    选择
                                                </Button>
                                                <Button key='delete' name='delete' type='default' size='small'
                                                        icon={<DeleteOutlined />}
                                                >
                                                    删除
                                                </Button>
                                            </div>
                                        </Item>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </Form>
            <Modal
                title='选择图标'
                visible={isShowIconModal}
                maskClosable={false}
                width='80%'
                footer={[
                    <Button key='cancel' type='primary' onClick={e => cancel()}>关闭</Button>
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
