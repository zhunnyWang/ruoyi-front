import request from '@/utils/request'

export function getMarketList(query) {
    return request({
      url: '/system/market/list',
      method: 'get',
      params: query,
    })
  }