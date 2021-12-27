import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Switch, TreeSelect, Radio, InputNumber, Button} from 'antd';
import cx from 'classnames'
import {getMenuListApi} from '@/api/menu';
import {arrayToTree} from '@/utils';
import  './index.less'
import {iconList} from './iconList';
const {Item} = Form;

const OperateMenu = ({
    isShow,
    title,
    confirm,
    cancel,
    rowData
}) => {
    const [parentMenu, setParentMenu] = useState([]);
    const [showIcon, setShowIcon] = useState(false);
    const [tipTxt, setTipTxt] = useState('菜单');
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
    const showIconList = () => {
        setShowIcon(true);
    };
    const closeIcon = () => {
        setShowIcon(false);
    };
    const confirmIcon = () => {
        console.log(111);
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
                        <div className='icon-box'>
                            {
                                rowData.icon && <i className={'fa fa-' + rowData.icon} />
                            }
                            <Button onClick={e => showIconList()}>选择图标</Button>
                        </div>
                        {/*<Input placeholder='图标' allowClear autoComplete='off'/>*/}
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
            <Modal
                title='图标列表'
                visible={showIcon}
                onCancel={closeIcon}
                onOk={confirmIcon}
                okText='确定'
                cancelText='取消'
                width='60%'
                maskClosable={false}
            >
                <ul className='icon-list'>
                    {
                        iconList.map(item => {
                            return (
                                <li key={item} className={cx({
                                    'active': rowData.icon === item
                                })}>
                                    <i className={
                                        cx('fa fa-' + item)
                                    } />
                                </li>
                            )
                        })
                    }
                </ul>
            </Modal>
        </div>
    )
};

export default OperateMenu
