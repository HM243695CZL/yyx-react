import request from '@/utils/request'

export function uploadFileApi(data) {
    return request({
        url: '/upload',
        method: 'post',
        data
    })
}
