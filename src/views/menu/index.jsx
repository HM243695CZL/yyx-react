import React, {useState, useEffect} from 'react';
import {Button, message, Table, Tag, Input, Form, Upload } from 'antd';
import {getMenuListApi, getMenuPageApi, saveMenuApi, delMenuApi, editMenuApi} from '@/api/menu';
import { uploadFileApi } from '@/api/common';
import MyPagination from '@/components/Pagination';
import OperateMenu from './operateMenu'
import {RES_STATUS,  PageEntity, FilterEnum} from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import {arrayToTree, objectArraySort} from '@/utils';
import {cloneDeep} from 'loadsh';
import './index.less'
const { Item } = Form;

const Menu = props => {
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
        dataList: [],
        title: '',
        menuId: '',
        total: 0,
    });
    const [isVisible, setIsVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'title'
        },
        {
            title: '菜单路径',
            dataIndex: 'path'
        },
        {
            title: '图标',
            dataIndex: 'icon',
            render: data => {
                return (
                    <i className={'fa fa-' + data}/>
                )
            }
        },
        {
            title: '排序',
            dataIndex: 'sortNum'
        },
        {
            title: '页面是否缓存',
            dataIndex: 'keepAlive',
            render: data => {
                return (
                    <span>{data ? <Tag color="#87d068">是</Tag> : <Tag color="#f50">否</Tag>}</span>
                )
            }
        },
        {
            title: '是否隐藏',
            dataIndex: 'hidden',
            render: data => {
                return <span>{data ? <Tag color="#87d068">是</Tag> : <Tag color="#f50">否</Tag>}</span>
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showModal(data)}>修改</span>
                        <span className="operate-del" onClick={delMenu(data)}>删除</span>
                    </div>
                )
            }
        }
    ];
    const getDataList = pageInfo => {
        form.validateFields().then(val => {
            for (const o in val) {
                if (val[o]) {
                    pageInfo.filters[o] = PaginationUtils.filters(val[o], FilterEnum.CONTAINS);
                } else {
                    delete pageInfo.filters[o];
                }
            }
            getMenuPageApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    const data = arrayToTree(res.data.dataList, 'id', 'parentId');
                    data.map(item => {
                        if(item.children && item.children.length) {
                            item.children.sort(objectArraySort('sortNum'))
                        }
                    });
                    data.sort(objectArraySort('sortNum'));
                    setStateData({
                        ...stateData,
                        dataList: data,
                        total: res.data.total
                    });
                }
            })
        });
    };
    const showModal = data => {
        return e => {
            // 修改
            if(data) {
                setIsVisible(true);
                setStateData({
                    ...stateData,
                    title: '编辑菜单',
                    menuId: data.id
                });
            } else {
                // 新增
                setIsVisible(true);
                setStateData({
                    ...stateData,
                    title: '新增菜单',
                    menuId: null
                });
            }

        }
    };
    const changePage = data => {
        let obj = {
            ...pageInfo,
            ...data
        };
        if (data.rows !== pageInfo.rows) {
            // 修改每页条数
            obj.first = 1;
        }
        setPageInfo(obj);
        getDataList(obj);
    };
    const clickSearch = () => {
        setPageInfo({
            ...pageInfo,
            first: 1
        });
        getDataList({
            ...pageInfo,
            first: 1
        });
    };
    const delMenu = ({id}) => {
        return e => {
            delMenuApi({id}).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                } else {
                    message.error(res.message);
                }
            })
        }
    };
    const confirm = val => {
        if(val.id) {
            editMenuApi(val).then(res => {
                if(res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        } else {
            delete val.id;
            saveMenuApi(val).then(res => {
                if(res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                    setIsVisible(false);
                } else {
                    message.error(res.message);
                }
            })
        }
    };
    const cancel = () => {
        setIsVisible(false);
        setStateData({
            ...stateData,
            rowData: {}
        })
    };
    const customUploadFile = files => {
        const { file } = files;
        let formData = new FormData();
        formData.append('file', file);
        uploadFileApi(formData).then(res => {
            setFileList([...fileList, {
                uid: res.data.id,
                name: file.name,
                status: 'done'
            }])
        })
    };
    useEffect(() => {
        getDataList(pageInfo);
    }, []);
    const {dataList, title, total, menuId} = stateData;
    return (
        <div className='menu-container'>
            <div className='search-box'>
                <Form
                    layout='inline'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    autoComplete='off'
                    form={form}
                >
                    <Item
                        label='菜单名称'
                        name='title'
                    >
                        <Input/>
                    </Item>
                    <Item
                        label='菜单地址'
                        name='path'
                    >
                        <Input/>
                    </Item>
                </Form>
                <div className="btn-box">
                    <Upload
                        fileList={fileList}
                        multiple
                        customRequest={e => customUploadFile(e)}
                    >
                        <Button>上传</Button>
                    </Upload>
                    <Button type='primary' onClick={showModal()}>新增</Button>
                    <Button type='default' onClick={e => clickSearch()}>查询</Button>
                </div>
            </div>
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataList}
                bordered
                pagination={false}
            />
            <MyPagination
                page={pageInfo.first}
                changePage={changePage}
                total={total}
            />
            <OperateMenu
                title={title}
                isShow={isVisible}
                menuId={menuId}
                confirm={confirm}
                cancel={cancel}
            />
        </div>
    )
};
export default Menu
