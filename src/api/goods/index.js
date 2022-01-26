import request from '@/utils/request';

export function getGoodsPageApi(data) {
    return request({
        url: '/goods/page',
        method: 'post',
        data: request.adornData(data)
    })
}

export function saveGoodsApi(data) {
    return request({
        url: '/goods/create',
        method: 'post',
        data: request.adornData(data)
    })
}

export function updateGoodsApi(data) {
    return request({
        url: '/goods/update',
        method: 'post',
        data: request.adornData(data)
    })
}

export function delGoodsApi(params) {
    return request({
        url: '/goods/delete',
        method: 'get',
        params
    })
}

export function viewGoodsApi(params) {
    return request({
        url: '/goods/view',
        method: 'get',
        params
    })
}

/**
 * 上架或下架商品
 * @param params
 */
export function changeStatus(params) {
    return request({
        url: '/goods/changeStatus',
        method: 'get',
        params
    })
}
