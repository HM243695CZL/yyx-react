import request from '@/utils/request';

export function loginApi(data) {
    return request({
        url: '/login',
        method: 'post',
        data: request.adornData(data)
    });
}

export function getUserListPageApi(data) {
    return request({
        url: '/user/page',
        method: 'post',
        data: request.adornData(data)
    })
}
export function saveUserApi(data) {
    return request({
        url: '/user/create',
        method: 'post',
        data: request.adornData(data)
    })
}
export function updateUserApi(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data: request.adornData(data)
    })
}
export function deleteUserApi(params) {
    return request({
        url: '/user/delete',
        method: 'get',
        params
    })
}
export function viewUserApi(params) {
    return request({
        url: '/user/view',
        method: 'get',
        params
    })
}

export function changeStatusApi(data) {
    return request({
        url: '/user/changeStatus',
        method: 'post',
        data: request.adornData(data)
    })
}
