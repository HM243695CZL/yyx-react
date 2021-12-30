import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Switch, TreeSelect, Radio, InputNumber, Button} from 'antd';
import cx from 'classnames'
import {getMenuListApi, viewMenuApi} from '@/api/menu';
import {getIconListApi} from '@/api/icon';
import {arrayToTree} from '@/utils';
import {RES_STATUS} from '@/utils/code';
import  './index.less'
const {Item} = Form;

const OperateMenu = ({
    isShow,
    title,
    confirm,
    cancel,
    menuId
}) => {
    const [parentMenu, setParentMenu] = useState([]);
    const [showIcon, setShowIcon] = useState(false);
    const [iconList, setIconList] = useState([]);
    const [tipTxt, setTipTxt] = useState('菜单');
    const [init, setInit] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        if(isShow) {
            getMenuListApi({
                page: 0,
                size: 10
            }).then(res => {
                const data = res.data.filter(ele => ele.id !== menuId);
                setParentMenu(arrayToTree(data, 'id', 'parentId'));
            });
            getIconListApi().then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setIconList(res.data);
                }
            });
            if (menuId) {
                viewMenuApi({
                    id: menuId
                }).then(res => {
                    if (res.code === RES_STATUS.SUCCESS_CODE) {
                        setInit(res.data);
                        form.resetFields();
                        form.setFieldsValue(init);
                    }
                });
            } else {
                form.resetFields();
                form.setFieldsValue(init);
            }
        } else {
            setInit({});
        }
    }, [isShow, menuId]);
    const changeRadio = e => {
        e.target.value === 1 ? setTipTxt('菜单') : setTipTxt('目录')
    };
    const submit = () => {
        form.validateFields().then(val => {
            val.id = menuId;
            confirm(val);
        })
    };
    const showIconList = () => {
        setShowIcon(true);
    };
    const closeIcon = () => {
        setShowIcon(false);
    };
    const confirmIcon = icon => {
        setInit({
            ...init,
            icon
        });
        form.setFieldsValue({
            ...init,
            icon
        });
        closeIcon();
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
                    initialValues={init}
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
                            value={init.parentId}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto'
                            }}
                            fieldNames={{
                                label: 'title',
                                value: 'id',
                                children: 'children'
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
                                init.icon && <i className={'fa fa-' + init.icon} />
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
                        <Switch defaultChecked={init.keepAlive}/>
                    </Item>
                    <Item
                        label='是否隐藏'
                        name='hidden'
                        valuePropName='checked'
                    >
                        <Switch defaultChecked={init.hidden}/>
                    </Item>
                </Form>
            </Modal>
            <Modal
                title={'图标列表(' + iconList.length + ')'}
                visible={showIcon}
                onCancel={closeIcon}
                onOk={closeIcon}
                okText='确定'
                cancelText='取消'
                width='60%'
                maskClosable={false}
            >
                <ul className='icon-list'>
                    {
                        iconList.map(item => {
                            return (
                                <li
                                    key={item}
                                    title={item}
                                    onClick={e => confirmIcon(item)}
                                    className={cx({
                                    'active': init.icon === item
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
