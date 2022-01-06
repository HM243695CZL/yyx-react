import request from '@/utils/request';

export function getMenuListApi(params) {
    return request({
        url: '/menu/list',
        method: 'get',
        params
    })
}
export function getMenuPageApi(data) {
    return request({
        url: '/menu/page',
        method: 'post',
        data: request.adornData(data)
    })
}
export function saveMenuApi(data) {
    return request({
        url: '/menu/create',
        method: 'post',
        data: request.adornData(data)
    })
}

export function editMenuApi(data) {
    return request({
        url: '/menu/update',
        method: 'post',
        data: request.adornData(data)
    })
}

export function delMenuApi(params) {
    return request({
        url: '/menu/delete',
        method: 'post',
        params
    })
}

export function viewMenuApi(params) {
    return request({
        url: '/menu/view',
        method: 'post',
        params
    })
}
