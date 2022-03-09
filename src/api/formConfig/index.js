import request from '@/utils/request';

export function saveFormConfigApi(data) {
    return request({
        url: '/form-config/create',
        method: 'post',
        data: request.adornData(data)
    });
}

export function getFormConfigListApi(data) {
    return request({
        url: '/form-config/page',
        method: 'post',
        data: request.adornData(data)
    })
}

export function deleteFormConfigApi(params) {
    return request({
        url: '/form-config/delete',
        method: 'get',
        params
    })
}

export function updateFormConfigApi(data) {
    return request({
        url: '/form-config/update',
        method: 'post',
        data: request.adornData(data)
    })
}

export function viewFormConfigApi(params) {
    return request({
        url: '/form-config/view',
        method: 'get',
        params
    })
}
