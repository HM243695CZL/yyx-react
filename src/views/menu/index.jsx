import React, {Component} from 'react';
import {Button, message, Table, Tag, Input } from 'antd';
import {getMenuListApi, saveMenuApi, delMenuApi, editMenuApi} from '@/api/menu';
import './index.less'
import OperateMenu from './operateMenu'
import {RES_STATUS} from '@/utils/code';
import {arrayToTree, objectArraySort} from '@/utils';
class Menu extends Component {

    state = {
        dataList: [],
        title: '',
        menuId: '',
        rowData: {},
        visibleModal: false
    };
    componentWillMount() {
        this.getDataList();
    }
    getDataList() {
        getMenuListApi({
            page: 0,
            size: 10
        }).then(res => {
            if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                const data = arrayToTree(res.data, 'id', 'parentId');
                data.map(item => {
                    if(item.children && item.children.length) {
                        item.children.sort(objectArraySort('sortNum'))
                    }
                });
                data.sort(objectArraySort('sortNum'));
                this.setState({
                    dataList: data
                });
            }
        })
    }
    render() {
        const {dataList, visibleModal, title, rowData} = this.state;
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
                        <i className={data}/>
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
        const showModal = data => {
            return e => {
                // 修改
                if(data) {
                    this.setState({
                        visibleModal: true,
                        title: '编辑菜单',
                        rowData: data
                    })
                } else {
                    // 新增
                    this.setState({
                        visibleModal: true,
                        title: '新增菜单',
                        rowData: {}
                    })
                }

            }
        };
        const delMenu = ({id}) => {
            return e => {
                delMenuApi({id}).then(res => {
                    if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.message);
                        this.getDataList();
                    } else {
                        message.error(res.message);
                    }
                })
            }
        };
        const confirm = val => {
            if(val.id) {
                editMenuApi(val).then(res => {
                    if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.message);
                        this.getDataList();
                        this.setState({
                            visibleModal: false
                        });
                    } else {
                        message.error(res.message);
                    }
                })
            } else {
                saveMenuApi(val).then(res => {
                    if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.message);
                        this.getDataList();
                        this.setState({
                            visibleModal: false
                        });
                    } else {
                        message.error(res.message);
                    }
                })
            }
        };
        const cancel = () => {
            this.setState({
                visibleModal: false,
                rowData: {}
            })
        };
        return (
            <div className='menu-container'>
                <Input/>
                <div className="btn-box">
                    <Button type='primary' onClick={showModal()}>新增</Button>
                    <Button type='default' onClick={e => this.getDataList()}>查询</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataList}
                    bordered/>
                <OperateMenu
                    title={title}
                    isShow={visibleModal}
                    rowData={rowData}
                    confirm={confirm}
                    cancel={cancel}
                />
            </div>
        )
    }

}


export default Menu
