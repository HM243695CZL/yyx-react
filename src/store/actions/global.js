import {SHOW_LOADING, HIDE_LOADING} from './actionTypes';

const hideLoading = () => ({
    type: HIDE_LOADING
});

const showLoading = () => ({
    type: SHOW_LOADING
});

export {
    hideLoading,
    showLoading
}
