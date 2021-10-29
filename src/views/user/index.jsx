import React, {Component} from 'react';
import {Tag, Table, Button} from 'antd';
import {getUserListApi} from '@/api/user';
import './index.less';
import {RES_STATUS} from '@/utils/code';
class User extends Component{
    state = {
      dataList: []
    };
    componentWillMount() {
        this.getDataList();
    }
    getDataList() {
        getUserListApi({
            page: 0,
            size: 10
        }).then(res => {
            if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                this.setState({
                    dataList: res.data
                })
            }
        })
    }

    render() {
        const { dataList } = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: data => {
                    return (
                        <span>{data ? <Tag color='#87d068'>启用</Tag> : <Tag color='#f50'>禁用</Tag>}</span>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 120,
                render(data) {
                    return (
                        <div className='operate-column'>
                            <span className='operate-edit'>修改</span>
                            <span className="operate-del">删除</span>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className='user-container'>
                <div className="btn-box">
                    <Button type='primary'>新增</Button>
                    <Button type='default' onClick={e => this.getDataList()}>查询</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataList}
                    bordered
                />
            </div>
        )
    }
}
export default User
