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
