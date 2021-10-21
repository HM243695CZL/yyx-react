import {message} from 'antd';
import {SET_TOKEN, REMOVE_TOKEN, SET_USER_INFO} from './actionTypes';
import {RES_STATUS} from '@/utils/code';
import {loginApi} from '@/api/user';

const login = params => dispatch => {
    /**
     * 登录获取token
     */
    return new Promise(resolve => {
        loginApi(params).then(({rsp}) => {
            if(rsp.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                dispatch({
                    type: SET_TOKEN,
                    payload: rsp.data.token
                });
                dispatch({
                    type: SET_USER_INFO,
                    payload: rsp.data.userInfo
                });
                localStorage.setItem('token', rsp.data.token);
            }
            resolve(rsp);
        })
    })
};

export {
    login
}
