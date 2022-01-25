import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, Input} from 'antd';
import { cloneDeep } from 'loadsh';
import {connect} from 'react-redux';
import dayjs from 'dayjs';

import { RES_STATUS, PageEntity, FilterEnum } from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import MyPagination from '@/components/Pagination';
import CommonModal from '@/components/CommonModal';
import store from '@/store';
import {addTagList} from '@/store/actions';


import './index.less';
const { Item } = Form;
const GoodsList = props => {
    const { addTagList } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
        dataList: [],
        total: 0,
    });
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const getDataList = pageInfo => {

    };
    const showModal = data => {
        return e => {
            history.push({
                pathname: `/goods-info?key=add-goods-info`,
                query: {}
            });
            addTagList({
                tabKey: `/goods-info?key=add-goods-info`,
                title: '新增商品'
            })
        }
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
    return (
        <div className='goods-list-container'>
            <div className='search-box'>
                <Form
                    layout='inline'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    autoComplete='off'
                    form={form}
                >
                    <Item
                        label='中文名'
                        name='argsCnName'
                    >
                        <Input/>
                    </Item>
                    <Item
                        label='英文名'
                        name='argsEnName'
                    >
                        <Input/>
                    </Item>
                </Form>
                <div className="btn-box">
                    <Button type='primary' onClick={showModal()}>新增</Button>
                    <Button type='default' onClick={e => clickSearch()}>查询</Button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = ({
    addTagList
});
export default connect(null, mapDispatchToProps)(GoodsList);
