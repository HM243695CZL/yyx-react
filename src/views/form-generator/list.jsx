import React, {useState, useEffect} from 'react';
import {Button, Table, Modal} from 'antd';
import {getFormConfigListApi} from '@/api/formConfig';
import {RES_STATUS} from '@/utils/code';
import Pagination from '@/components/Pagination';
import dayjs from 'dayjs';
import './list.less';

const List = ({
  changeFlag,
  refresh
}) => {
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
    const previewImg = img => {
        console.log(111);
        setIsVisiblePreview(true);
        setPrevImgUrl(img);
    };
    const getDataList = () => {
        getFormConfigListApi({
            page: 0,
            size: 10
        }).then(res => {
            if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                setDataList(res.data);
                setTotal(res.total);
            }
        });
    };
    useEffect(() => {
        getDataList();
    }, [refresh]);
    return (
        <div className='list-container'>
            <div className="btn-box">
                <Button type='primary' onClick={showConfig()}>新增</Button>
                <Button type='default' onClick={e => getDataList()}>查询</Button>
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
