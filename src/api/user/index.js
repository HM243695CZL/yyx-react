import request from '@/utils/request';

export function loginApi(data) {
    return request({
        url: '/login',
        method: 'post',
        data: request.adornData(data)
    });
}

export function getUserListApi(data) {
    return request({
        url: '/user/list',
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
export function deleteUserApi(data) {
    return request({
        url: '/user/delete',
        method: 'post',
        data: request.adornData(data)
    })
}
export function viewUserApi(data) {
    return request({
        url: '/user/view',
        method: 'post',
        data: request.adornData(data)
    })
}
