import request from '@/utils/request';

export function getRolePageApi(data) {
    return request({
        url: '/role/page',
        method: 'post',
        data: request.adornData(data)
    })
}

export function getRoleListApi(params) {
    return request({
        url: '/role/page',
        method: 'get',
        data: request.adornParams(params)
    })
}

export function saveRoleApi(data) {
    return request({
        url: '/role/create',
        method: 'post',
        data: request.adornData(data)
    })
}

export function updateRoleApi(data) {
    return request({
        url: '/role/update',
        method: 'post',
        data: request.adornData(data)
    })
}

export function delRoleApi(params) {
    return request({
        url: '/role/delete',
        method: 'get',
        params
    })
}

export function viewRoleApi(params) {
    return request({
        url: '/role/view',
        method: 'get',
        params
    })
}
