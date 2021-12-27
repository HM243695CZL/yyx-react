import request from '@/utils/request';

export function getIconListPageApi(data) {
    return request({
        url: '/icon/page',
        method: 'post',
        data: request.adornParams(data)
    })
}

export function getIconListApi(data) {
    return request({
        url: '/icon/list',
        method: 'get',
        data: request.adornParams(data)
    })
}

export function saveIconApi(data) {
    return request({
        url: '/icon/create',
        method: 'post',
        data: request.adornData(data)
    })
}
export function delIconApi(data) {
    return request({
        url: '/icon/delete',
        method: 'post',
        data: request.adornData(data)
    })
}
