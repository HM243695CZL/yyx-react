import * as actionTypes from './actionTypes'
import {getMenu} from '@/utils';
import {dynamicRouter} from '@/router/dynamic-router';
import {cloneDeep} from 'lodash';
// 展开或收缩左侧菜单栏
const changeCollapsed = payload => ({
    type: actionTypes.CHANGE_COLLAPSED,
    payload
});
const addTagList = payload => (dispatch, getState) => {
    const curTagList = getState().UI.tagList;
    let findKey = false;
    curTagList.map(item => {
        if (payload.tabKey === item.tabKey) {
            findKey = true
        }
    });
    if (!findKey) {
        if (!payload.title) {
            (JSON.parse(getMenu())|| []).map(item => {
                if (item.path === payload.tabKey) {
                    payload.title = item.title
                }
                if (payload.tabKey === '/') {
                    payload.title = '首页'
                }
            });
        }
        dispatch({
            type: actionTypes.ADD_TAG_LIST,
            payload: [
                ...curTagList,
                { ...payload }
            ]
        });
        dispatch({
            type: actionTypes.CHANGE_CURRENT_PATH,
            payload: payload.tabKey
        });
    } else {
        dispatch({
            type: actionTypes.CHANGE_CURRENT_PATH,
            payload: payload.tabKey
        })
    }
};

const cutTagList = payload => (dispatch, getState) => {
    dispatch({
        type: actionTypes.CUT_TAG_LIST,
        payload: payload.tabKey
    })
};

const emptyTagList = () => ({
    type: actionTypes.EMPTY_TAG_LIST
});

const cutOtherTagList = payload => ({
    type: actionTypes.CUT_OTHER_TAG_LIST,
    payload: payload.tabKey
});

const changeCurrentPath = payload => ({
    type: actionTypes.CHANGE_CURRENT_PATH,
    payload: payload.tabKey
});
export {
    changeCollapsed,
    addTagList,
    cutTagList,
    emptyTagList,
    cutOtherTagList,
    changeCurrentPath
}
