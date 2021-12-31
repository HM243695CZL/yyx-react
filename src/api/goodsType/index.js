import request from '@/utils/request';

export function getGoodsTypePageApi(data) {
    return request({
        url: '/goods-type/page',
        method: 'post',
        data: request.adornData(data)
    })
}
export function saveGoodsTypeApi(data) {
    return request({
        url: '/goods-type/create',
        method: 'post',
        data: request.adornData(data)
    })
}
export function updateGoodsTypeApi(data) {
    return request({
        url: '/goods-type/update',
        method: 'post',
        data: request.adornData(data)
    })
}
export function delGoodsTypeApi(params) {
    return request({
        url: '/goods-type/delete',
        method: 'get',
        params
    })
}
export function viewGoodsTypeApi(params) {
    return request({
        url: '/goods-type/view',
        method: 'get',
        params
    })
}
