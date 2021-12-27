import request from '@/utils/request';

export function getMenuListApi(data) {
    return request({
        url: '/menu/list',
        method: 'get',
        data: request.adornParams(data)
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

export function delMenuApi(data) {
    return request({
        url: '/menu/delete',
        method: 'post',
        data: request.adornData(data)
    })
}

export function viewMenuApi(data) {
    return request({
        url: '/menu/view',
        method: 'post',
        data: request.adornData(data)
    })
}
