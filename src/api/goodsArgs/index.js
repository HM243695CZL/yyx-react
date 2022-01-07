import request from '@/utils/request';

export function getGoodsArgsPageApi(data) {
    return request({
        url: '/goods-args/page',
        method: 'post',
        data: request.adornData(data)
    })
}

export function getGoodsArgsListApi(params) {
    return request({
        url: '/goods-args/list',
        method: 'get',
        params
    })
}

export function saveGoodsArgsApi(data) {
    return request({
        url: '/goods-args/create',
        method: 'post',
        data: request.adornData(data)
    })
}

export function updateGoodsArgsApi(data) {
    return request({
        url: '/goods-args/update',
        method: 'post',
        data: request.adornData(data)
    })
}

export function delGoodsArgsApi(params) {
    return request({
        url: '/goods-args/delete',
        method: 'get',
        params
    })
}

export function viewGoodsArgsApi(params) {
    return request({
        url: '/goods-args/view',
        method: 'get',
        params
    })
}
