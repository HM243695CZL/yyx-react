import request from '@/utils/request'

export function uploadOneFileApi(data) {
    return request({
        url: '/common/upload/one',
        method: 'post',
        data
    })
}

export function uploadMoreFileApi(data) {
    return request({
        url: '/common/upload/more',
        method: 'post',
        data
    })
}
