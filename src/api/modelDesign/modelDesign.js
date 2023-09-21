/*
 * @Author: wanglu
 * @Date: 2023-09-18 10:30:54
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-21 14:43:59
 * @Description:
 */
import request from '@/utils/request'

// import { parseStrEmpty } from '@/utils/ruoyi'
// 查询列表
export function getList(query) {
  return request({
    url: '/system/model/list',
    method: 'get',
    params: query,
  })
}

// 删除
export function deleteList(id) {
  return request({
    url: `/system/model/${id}`,
    method: 'delete',
  })
}

// 新建
export function addList(data) {
  return request({
    url: '/system/model',
    method: 'post',
    data,
  })
}

// 根据id获取详情
export function getListById(id) {
  return request({
    url: `/system/model/${id}`,
    method: 'get',
  })
}
