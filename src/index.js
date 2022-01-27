import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'normalize.css/normalize.css';
import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import './assets/fonts/iconfont.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './antd-config';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
