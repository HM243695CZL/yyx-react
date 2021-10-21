import request from '@/utils/request';

export function getMenuListApi(data) {
    return request({
        url: '/menu/list',
        method: 'post',
        data: request.adornData(data)
    })
}

export function saveMenuApi(data) {
    return request({
        url: '/menu/save',
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
        url: '/menu/del',
        method: 'post',
        data: request.adornData(data)
    })
}
