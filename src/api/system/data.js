/*
 * @Author: Xueying Wang
 * @Date: 2023-09-21 11:39:50
 * @LastEditors: Xueying Wang
 * @Description: 数据管理-数据接口
 */
import request from '@/utils/request'

// 查询数据列表
export function listData(query) {
  return request({
    url: '/system/data/list',
    method: 'get',
    params: query,
  })
}

// 查询数据详细
export function getData(id) {
  return request({
    url: `/system/data/${id}`,
    method: 'get',
  })
}

// 新增数据
export function addData(data) {
  return request({
    url: '/system/data',
    method: 'post',
    data,
  })
}

// 修改数据
export function updateData(data) {
  return request({
    url: '/system/data',
    method: 'put',
    data,
  })
}

// 删除数据
export function delData(id) {
  return request({
    url: `/system/data/${id}`,
    method: 'delete',
  })
}
