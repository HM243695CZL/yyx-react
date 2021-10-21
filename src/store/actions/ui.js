import * as actionTypes from './actionTypes'
import {getMenu} from '@/utils';
import {dynamicRouter} from '@/router/dynamic-router';
// 展开或收缩左侧菜单栏
const changeCollapsed = payload => ({
    type: actionTypes.CHANGE_COLLAPSED,
    payload
});

const addTagList = ({path, params = {}, type}) => (dispatch, getState) => {
    const curTagList = getState().UI.tagList;
    if(curTagList.filter(ele => ele.path === path).length) return;
    if(curTagList.length >= 15) {
        console.log('超过15个了，要删除了');
    }
    let data = (JSON.parse(getMenu())|| []);
    data = [...data, ...dynamicRouter];
    data.map(ele => {
        if(ele.path === path) {
            handleDispatch(ele);
        } else if(ele.children) {
            ele.children.map(item => {
                if(item.path === path) {
                    handleDispatch(item);
                }
            })
        }
    });
    function handleDispatch(obj) {
        if(type === 'dynamic') {
            data.map(item => {
                if(item.path === path) {
                    item.params = params;
                }
            })
        }
        dispatch({
            type: actionTypes.ADD_TAG_LIST,
            payload: {...obj, params}
        })
    }
};

const cutTagList = payload => ({
    type: actionTypes.CUT_TAG_LIST,
    payload
});

const emptyTagList = () => ({
    type: actionTypes.EMPTY_TAG_LIST
});

const cutOtherTagList = payload => ({
    type: actionTypes.CUT_OTHER_TAG_LIST,
    payload
});
export {
    changeCollapsed,
    addTagList,
    cutTagList,
    emptyTagList,
    cutOtherTagList
}
