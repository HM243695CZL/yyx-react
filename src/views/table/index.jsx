import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Button, Input, message} from 'antd';
import {addTagList, changeCurrentPath} from '@/store/actions';


class TableComponent extends Component{
    constructor(props, ...args) {
        super(props, ...args);
        props.cacheLifecycles.didCache(this.componentDidCache);
        props.cacheLifecycles.didRecover(this.componentDidRecover);
    }
    componentDidCache = () => {
        console.log('table cached')
    };

    componentDidRecover = () => {
        console.log('table recovered')
    };
    render() {
        const {history, addTagList, changeCurrentPath} = this.props;
        const add = data => {
            history.push('/table/info?' + data.age);
            addTagList({
                path: '/table/info?' + data.age,
                params: data,
                type: 'dynamic'
            });
            changeCurrentPath('/table/info?' + data.age);
        };
        const addOther = data => {
            history.push('/table/dynamic?' + data.age);
            addTagList({
                path: '/table/dynamic?' + data.age,
                params: data,
                type: 'dynamic'
            });
            changeCurrentPath('/table/dynamic?' + data.age)
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
                            <span className="operate-del" onClick={e => addOther(data)}>删除</span>
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
    },
    changeCurrentPath: payload => {
        dispatch(changeCurrentPath(payload));
    }
});

export default connect(null, mapDispatchToProps)(TableComponent)
