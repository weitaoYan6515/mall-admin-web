import request from '@/utils/request'

export function defaultGraphicDataByType(params) {
    return request({
        url: '/dashBoard/defaultGraphicDataByType',
        method: 'get',
        params: params
    })
}
export function loadDistributePlan(params) {
    return request({
        url: '/dashBoard/loadDistributePlan',
        method: 'get',
        params: params
    })
}
export function saveTable(data) {
    return request({
        url: '/dashBoard/loadDistributePlan',
        method: 'post',
        data: data
    })
}
export function exportExcel() {
    return request({
        url: '/excel/export',
        method: 'get',
        responseType:'blob'
    })
}
export function importExcel(data) {
    return request({
        url: '/excel/import',
        method: 'post',
        data
    })
}

export function longTimeLoadForecast(params) {
    return request({
        url: '/dashBoard/longTimeLoadForecast',
        method: 'get',
        params: params
    })
}