import * as actionTypes from '../actions/actionTypes'
const globalState = {
    loading: false
};

const global = (state = globalState, action) => {
    const {type} = action;
    switch (type) {
        case actionTypes.SHOW_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.HIDE_LOADING:
            return {
                ...state,
                loading: false
            };
        default:
            return {
                state
            }

    }
};

const userState = {
    token: '',
    userInfo: {},
    formInfo: {
        EditPassFormKey: 'EditPassFormKey',
        IconFormKey: 'IconFormKey',
        CategoryFormKey: 'CategoryFormKey',
        GoodsTypeFormKey: 'GoodsTypeFormKey',
        GoodsArgsFormKey: 'GoodsArgsFormKey',
        RoleFormKey: 'RoleFormKey',
    }
};
const user = (state = userState, action) => {
    const {type, payload} = action;
    switch (type) {
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: payload
            };
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                userInfo: payload
            }
    }
    return state;
};


const UIState = {
    collapsed: false,
    isMobile: false,
    menuSelected: [],
    tagList: [],
    currentPath: ''
};

const UI = (state = UIState, action) => {
    const {type, payload} = action;
    switch (type) {
        case actionTypes.CHANGE_COLLAPSED:
            return {
                ...state,
                collapsed: payload
            };
        case actionTypes.CHANGE_CURRENT_PATH:
            return {
                ...state,
                currentPath: payload
            };
        case actionTypes.ADD_TAG_LIST:
            return {
                ...state,
                tagList: payload
            };
        case actionTypes.CUT_TAG_LIST:
            return {
                ...state,
                tagList: [
                    ...state.tagList.filter(ele => ele.tabKey !== payload)
                ]
            };
        case actionTypes.EMPTY_TAG_LIST:
            return {
                ...state,
                tagList: []
            };
        case actionTypes.CUT_OTHER_TAG_LIST:
            return {
                ...state,
                tagList: [
                    ...state.tagList.filter(ele => ele.tabKey === payload)
                ]
            }
    }
    return state;
};

export {
    global,
    user,
    UI
}
