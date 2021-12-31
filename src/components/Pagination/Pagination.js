import React, { useState, useEffect } from 'react';
import { ConfigProvider, Row, Pagination } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.less'
const pageSizeOptions = [3, 5, 10, 20, 50, 100];
export default function MyPagination({
     total,
     page,
     changePage
 }) {
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const change = (pageIndex, pageSize) => {
        setPageSize(pageSize);
        changePage({ first: pageIndex, rows: pageSize});
    };
    return (
        <ConfigProvider locale={zhCN}>
            <Row justify='end' className='pagination-container'>
                <Pagination
                    showSizeChanger
                    showTotal={total => `共${total}条`}
                    onChange={change}
                    current={page}
                    total={total}
                    pageSizeOptions={pageSizeOptions}
                />
            </Row>
        </ConfigProvider>
    )
}
