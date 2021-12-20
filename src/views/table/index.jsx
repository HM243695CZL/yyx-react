import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Button, Input, message} from 'antd';
import {addTagList} from '@/store/actions';
import {withRouter} from 'react-router-dom';

class TableComponent extends Component{
    render() {
        const {history, addTagList, changeCurrentPath} = this.props;
        const add = data => {
            history.push({
                pathname: `/table-info?key=${data.key}`,
                query: {
                    id: data.key
                }
            });
            addTagList({
                tabKey: `/table-info?key=${data.key}`,
                title: '表格详情' + data.key
            })
        };
        const showMessage = () => {
            message.success(12);
        };
        const dataList = [
            {name: 'h', age: 18, key: '18'},
            {name: 'c', age: 19, key: '19'},
            {name: 'z', age: 20, key: '20'}
        ];
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '操作',
                key: 'action',
                width: 120,
                render(data) {
                    return (
                        <div className='operate-column'>
                            <span className='operate-edit' onClick={e => add(data)}>修改</span>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className='table-container'>
                <Button type='primary' onClick={e => showMessage()}>新增</Button>
                <Input placeholder="Basic usage" />
                <Table
                    columns={columns}
                    dataSource={dataList}
                    bordered/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addTagList: payload => {
        dispatch(addTagList(payload));
    }
});

export default withRouter(connect(null, mapDispatchToProps)(TableComponent))
