import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
class Pagination extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                {
                    this.props.children
                }
            </ConfigProvider>
        )
    }

}

export default Pagination
