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
        url: '/form-config/list',
        method: 'post',
        data: request.adornData(data)
    })
}
