import {message} from 'antd';
import {SET_TOKEN, REMOVE_TOKEN, SET_USER_INFO} from './actionTypes';
import {arrayToTree, objectArraySort} from '@/utils';
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
                dispatch({
                    type: SET_USER_INFO,
                    payload: res.datas.userInfo
                });
                localStorage.setItem('token', res.datas.access_token);
                localStorage.setItem('userInfo', JSON.stringify(res.datas.userInfo));
                const data = arrayToTree(res.datas.menu, 'id', 'parentId');
                data.map(item => {
                    if(item.children && item.children.length) {
                        item.children.sort(objectArraySort('sortNum'))
                    }
                });
                localStorage.setItem('menu', JSON.stringify(data.sort(objectArraySort('sortNum'))));
            }
            resolve(res);
        })
    })
};

export {
    login
}
