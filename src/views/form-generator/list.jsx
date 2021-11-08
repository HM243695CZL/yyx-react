import React, {useState} from 'react';
import {Button, Table} from 'antd';
import './list.less';
const List  = ({
    changeFlag
}) => {
    const [dataList] = useState([]);
    const columns = [
        {
            title: '表单名称',
            dataIndex: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime'
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showConfig(data)}>修改</span>
                        <span className="operate-del">删除</span>
                    </div>
                )
            }
        }
    ];
    const showConfig = data => {
        return e => {
            changeFlag(data);
        }
    };
    return (
        <div className='list-container'>
            <div className="btn-box">
                <Button type='primary' onClick={showConfig()}>新增</Button>
                <Button type='default'>查询</Button>
            </div>
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataList}
                bordered/>
        </div>
    )
};
export default List
