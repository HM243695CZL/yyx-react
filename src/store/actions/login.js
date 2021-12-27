import {message} from 'antd';
import {SET_TOKEN, REMOVE_TOKEN, SET_USER_INFO} from './actionTypes';
import {RES_STATUS} from '@/utils/code';
import {loginApi} from '@/api/user';

const login = params => dispatch => {
    /**
     * 登录获取token
     */
    return new Promise(resolve => {
        loginApi(params).then(res => {
            if(res.code === RES_STATUS.SUCCESS_CODE) {
                dispatch({
                    type: SET_TOKEN,
                    payload: res.data
                });
                // dispatch({
                //     type: SET_USER_INFO,
                //     payload: res.data.userInfo
                // });
                localStorage.setItem('token', res.data);
            }
            resolve(res);
        })
    })
};

export {
    login
}
