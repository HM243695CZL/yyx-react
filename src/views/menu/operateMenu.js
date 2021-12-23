import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Select, Switch, TreeSelect, Radio, InputNumber} from 'antd';
import {getMenuListApi} from '@/api/menu';
import {arrayToTree} from '@/utils';

const {Item} = Form;

const OperateMenu = ({
    isShow,
    title,
    confirm,
    cancel,
    rowData
}) => {
    const [parentMenu, setParentMenu] = useState([]);
    const [tipTxt, setTipTxt] = useState('菜单')
    const [form] = Form.useForm();
    useEffect(() => {
        if(isShow) {
            getMenuListApi({
                page: 0,
                size: 10
            }).then(res => {
                const data = res.data.filter(ele => ele.id !== rowData.id);
                setParentMenu(arrayToTree(data, 'id', 'parentId'));
            });
            form.resetFields();
            form.setFieldsValue(rowData);
        }
    }, [isShow, rowData]);
    const changeRadio = e => {
        e.target.value === 1 ? setTipTxt('菜单') : setTipTxt('目录')
    };
    const submit = () => {
        form.validateFields().then(val => {
            val.id = rowData.id;
            confirm(val);
        })
    };
    return (
        <div className='operate-menu-container'>
            <Modal
                title={title}
                visible={isShow}
                onOk={submit}
                onCancel={cancel}
                okText='确定'
                cancelText='取消'
                maskClosable={false}
            >
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    form={form}
                    initialValues={rowData}
                >
                    <Item
                        label='类型'
                        name='type'
                        rule={[]}
                    >
                        <Radio.Group value={1} onChange={e => changeRadio(e)}>
                            <Radio value={1}>菜单</Radio>
                            <Radio value={2}>目录</Radio>
                        </Radio.Group>
                    </Item>
                    <Item
                        label={tipTxt + '名称'}
                        name='title'
                        rules={[
                            {required: true, message: `请输入${tipTxt}名称`}
                        ]}
                    >
                        <Input placeholder={`请输入${tipTxt}名称`} allowClear autoComplete='off'/>
                    </Item>
                    <Item
                        label={tipTxt + '路径'}
                        name='path'
                        rules={[
                            {required: true, message: `请输入${tipTxt}路径`}
                        ]}
                    >
                        <Input placeholder={`请输入${tipTxt}路径`} allowClear autoComplete='off'/>
                    </Item>
                    <Item
                        label='上级菜单'
                        name='parentId'
                        rules={[]}
                    >
                        <TreeSelect
                            allowClear
                            treeDefaultExpandAll
                            style={{width: '100%'}}
                            value={rowData.parentId}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto'
                            }}
                            treeData={parentMenu}
                        />
                    </Item>
                    <Item
                        label='图标'
                        name='icon'
                        rules={[]}
                    >
                        <Input placeholder='图标' allowClear autoComplete='off'/>
                    </Item>
                    <Item
                        label='排序'
                        name='sortNum'
                        rules={[]}
                    >
                        <InputNumber className='w100' min={1} placeholder='数字越小越靠上' autoComplete='off'/>
                    </Item>
                    <Item
                        label='是否缓存'
                        name='keepAlive'
                        valuePropName='checked'
                    >
                        <Switch defaultChecked={rowData.keepAlive}/>
                    </Item>
                    <Item
                        label='是否隐藏'
                        name='hidden'
                        valuePropName='checked'
                    >
                        <Switch defaultChecked={rowData.hidden}/>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
};

export default OperateMenu
