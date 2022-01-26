import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, Input, Table, Tag, Select, message} from 'antd';
import { cloneDeep } from 'loadsh';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import { RES_STATUS, PageEntity, FilterEnum } from '@/utils/code';
import { PaginationUtils } from '@/utils/PaginationUtils';
import {addTagList} from '@/store/actions';
import MyPagination from '@/components/Pagination';
import {getGoodsPageApi, delGoodsApi, changeStatus } from '@/api/goods';
import './index.less';
const { Item } = Form;
const { Option } = Select;
const GoodsList = props => {
    const { addTagList, currentPath } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    const [stateData, setStateData] = useState({
        dataList: [],
        total: 0,
    });
    const [pageInfo, setPageInfo] = useState(cloneDeep(PageEntity));
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: '商品描述',
            dataIndex: 'title',
            align: 'center'
        },
        {
            title: '售价',
            dataIndex: 'sellPriceStart',
            align: 'center',
            render: (text, record) => {
                return record.sellPriceStart + '-' + record.sellPriceEnd + '￥'
            }
        },
        {
            title: '销量',
            dataIndex: 'sellCount',
            align: 'center',
        },
        {
            title: '库存',
            dataIndex: 'stock',
            align: 'center',
        },
        {
            title: '上架时间',
            dataIndex: 'publishTime',
            align: 'center',
            render: (data, record) => record.status ? dayjs(data).format('YYYY-MM-DD HH:mm:ss') : '-'
        },
        {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: data => <Tag color={data ? 'success' : 'warning'}>{data ? '上架' : '下架'}</Tag>
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 150,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={e => clickStatus(data)}>{data.status ? '下' : '上'}架</span>
                        <span className='operate-edit' onClick={showModal(data)}>修改</span>
                        <span className="operate-del" onClick={delGoods(data)}>删除</span>
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
            if (val['status'] === '' || val['status'] === undefined) {
                delete pageInfo.filters['status'];
            } else {
                pageInfo.filters['status'] = PaginationUtils.filters(val['status'], FilterEnum.EQUALS);
            }
            getGoodsPageApi(pageInfo).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setStateData({
                        ...stateData,
                        dataList: res.data.dataList,
                        total: res.data.total
                    })
                }
            })
        })
    };
    const showModal = data => {
        return e => {
            if (data) {
                // 修改
                history.push({
                    pathname: `/goods-info?goods-id=${data.id}`,
                    query: {}
                });
                addTagList({
                    tabKey: `/goods-info?goods-id=${data.id}`,
                    title: '修改商品'
                })
            } else {
                history.push({
                    pathname: `/goods-info?key=add-goods-info`,
                    query: {}
                });
                addTagList({
                    tabKey: `/goods-info?key=add-goods-info`,
                    title: '新增商品'
                })
            }
        }
    };
    /**
     * 点击上架或下架
     */
    const clickStatus = data => {
        changeStatus({
            id: data.id
        }).then( res => {
            if (res.code === RES_STATUS.SUCCESS_CODE) {
                message.success(res.data.message);
                getDataList(pageInfo);
            } else {
                message.error(res.message);
            }
        });
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
    const delGoods = ({id}) => {
        return e => {
            delGoodsApi({id}).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    message.success(res.data.message);
                    getDataList(pageInfo);
                } else {
                    message.error(res.message)
                }
            })
        }
    };
    useEffect(() => {
        if (currentPath === '/goods/goods-list') {
            getDataList(pageInfo);
        }
    }, [currentPath]);
    const { dataList, total } = stateData;
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
                        label='商品描述'
                        name='title'
                    >
                        <Input allowClear/>
                    </Item>
                    <Item
                        label='状态'
                        name='status'
                    >
                        <Select style={{width: '180px'}}>
                            <Option value=''>全部</Option>
                            <Option value={1}>上架</Option>
                            <Option value={0}>下架</Option>
                        </Select>
                    </Item>
                </Form>
                <div className="btn-box">
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
        </div>
    )
};
const mapStateToProps = state => ({
    currentPath: state.UI.currentPath
});
const mapDispatchToProps = dispatch => ({
    addTagList: payload => {
        dispatch(addTagList(payload))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);
