import request from '@/utils/request'

export function dicInfo(params) {
    return request({
        url: '/dicInfo',
        method: 'get',
        params: params
    })
}