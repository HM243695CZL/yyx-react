import request from '@/utils/request';

export function getCategoryListPageApi(data) {
    return request({
        url: '/category/page',
        method: 'post',
        data: request.adornData(data)
    })
}
export function saveCategoryApi(data) {
    return request({
        url: '/category/create',
        method: 'post',
        data: request.adornData(data)
    })
}
export function updateCategoryApi(data) {
    return request({
        url: '/category/update',
        method: 'post',
        data: request.adornData(data)
    })
}
export function delCategoryApi(params) {
    return request({
        url: '/category/delete',
        method: 'get',
        params
    })
}
export function viewCategoryApi(params) {
    return request({
        url: '/category/view',
        method: 'get',
        params
    })
}
