import axios from 'axios';
import qs from 'qs';
import merge from 'merge';
import {message} from 'antd';
import {getToken} from '@/utils';
import store from '@/store';
import {showLoading, hideLoading} from '@/store/actions/global';

const baseURL = window.PLATFORM_CONFIG.baseUrl;
const service = axios.create({
    baseURL,
    timeout: 30000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// 计数器
let requestCount = 0;
function openLoading() {
    if(requestCount === 0) {
        store.dispatch(showLoading());
    }
    return requestCount ++;
}

function closeLoading() {
    if(requestCount <= 0) return;
    requestCount --;
    if(requestCount === 0) {
        store.dispatch(hideLoading())
    }
}

service.interceptors.request.use(
    config => {
        if(getToken()) {
            config.headers['authorization'] = 'Bearer ' + getToken();
        }
        // openLoading();
        return config;
    },
    error => {
        // closeLoading();
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        // closeLoading();
        return response.data;
    },
    error => {
        if (error.message === 'Network Error') {
            message.error('网络错误，请检查网络环境')
        } else if (error.message.indexOf('timeout of') > -1) {
            message.error(error.message);
        } else if (error.response.data.code === 401) {
            // token超时，跳转到登录
            message.error('token已过期，请重新登录');
            sessionStorage.clear();
            localStorage.clear();
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000)
        } else if (error.response.status === 404) {
            message.error(`请求接口【${error.response.config.url}】不存在!`);
        } else {
            message.error(`服务器错误：【${error.response.data.message}】`)
        }
        // closeLoading();
        return Promise.reject(error);
    }
);

service.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : baseURL) + actionName
};
/**
 * get 请求参数处理
 */
service.adornParams = (params = {}, openDefaultPrams = true) => {
    return params;
};
/**
 * post 请求数据处理
 */
service.adornData = (data = {}, contentType = 'json') => {
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
};
export default service;

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}
