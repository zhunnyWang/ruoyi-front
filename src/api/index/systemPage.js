/*
 * @Author: wanglu
 * @Date: 2023-09-18 10:30:54
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-18 10:44:14
 * @Description:
 */
import request from '@/utils/request'

// import { parseStrEmpty } from '@/utils/ruoyi'
// 获取用户首页配置信息列表
export function getPageInfo() {
  return request({
    url: '/system/pageInfo',
    method: 'get',
  })
}
// 保存用户首页配置信息列表
export function postPageInfo(data) {
  return request({
    url: '/system/pageInfo',
    method: 'post',
    data,
  })
}
