import React, {useState, useEffect} from 'react';
import {Button, Table, Modal, message, Form, Input} from 'antd';
import {getFormConfigListApi, deleteFormConfigApi} from '@/api/formConfig';
import {RES_STATUS, PageEntity, FilterEnum} from '@/utils/code';
import Pagination from '@/components/Pagination';
import {PaginationUtils} from '@/utils/PaginationUtils';
import {cloneDeep} from 'lodash';
import dayjs from 'dayjs';
import './list.less';
const {Item} = Form;

const List = ({
  changeFlag,
  refresh
}) => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [total, setTotal] = useState(0);
    const [prevImgUrl, setPrevImgUrl] = useState(null);
    const [isVisiblePreview, setIsVisiblePreview] = useState(false);
    const columns = [
        {
            title: '表单名称',
            dataIndex: 'name'
        },
        {
            title: '备注',
            dataIndex: 'remark'
        },
        {
            title: '缩略图',
            dataIndex: 'screenShot',
            render: data => <img onClick={e => previewImg(data)} className='img' src={data} title='缩略图' alt=''/>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: data => dayjs(data).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            render(data) {
                return (
                    <div className='operate-column'>
                        <span className='operate-edit' onClick={showConfig(data)}>修改</span>
                        <span className="operate-del" onClick={deleteConfig(data)}>删除</span>
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
    const deleteConfig = ({id}) => {
       return e => {
           deleteFormConfigApi({
               id
           }).then(res => {
               if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                   message.success(res.message);
                   getDataList();
               } else {
                   message.error(res.message);
               }
           })
       }
    };
    const previewImg = img => {
        setIsVisiblePreview(true);
        setPrevImgUrl(img);
    };
    const getDataList = () => {
        form.validateFields().then(val => {
            let pageInfo = cloneDeep(PageEntity);
            for (let o in val) {
                if(val[o]) {
                    pageInfo.filters[o] = PaginationUtils.filters(val[o], FilterEnum.CONTAINS);
                }
            }
            getFormConfigListApi(pageInfo).then(res => {
                if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                    setDataList(res.data);
                    setTotal(res.total);
                }
            });
        });
    };
    useEffect(() => {
        getDataList();
    }, [refresh]);
    return (
        <div className='list-container'>
            <div className="search-box">
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    form={form}
                    autoComplete='off'
                >
                    <Item
                        label='表单名称'
                        name='name'
                    >
                        <Input/>
                    </Item>
                </Form>
                <div className="btn-box">
                    <Button type='primary' onClick={showConfig()}>新增</Button>
                    <Button type='default' onClick={e => getDataList()}>查询</Button>
                </div>
            </div>
            <Pagination>
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={dataList}
                    bordered
                    pagination={{
                        total,
                        showSizeChanger: true,
                        showTotal: total => `共${total}条`,
                        onChange: (current, pageSize) => {
                            console.log(current);
                            console.log(pageSize);
                        }
                    }}
                />
            </Pagination>
            <Modal
                title='预览'
                visible={isVisiblePreview}
                maskClosable={false}
                width='70%'
                footer={[
                    <Button type='primary' key='preview-img' onClick={e => setIsVisiblePreview(false)}>关闭</Button>
                ]}
            >
                <img src={prevImgUrl} alt=""/>
            </Modal>
        </div>
    )
};
export default List
