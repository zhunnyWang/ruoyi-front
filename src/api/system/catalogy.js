/*
 * @Author: Xueying Wang
 * @Date: 2023-09-21 11:17:04
 * @LastEditors: Xueying Wang
 * @Description: 数据管理-数据分类
 */
import request from '@/utils/request'

// 查询数据分类列表
export function listCatalogy(query) {
  return request({
    url: '/system/catalogy/list',
    method: 'get',
    params: query,
  })
}

// 查询数据分类详细
export function getCatalogy(id) {
  return request({
    url: `/system/catalogy/${id}`,
    method: 'get',
  })
}

// 新增数据分类
export function addCatalogy(data) {
  return request({
    url: '/system/catalogy',
    method: 'post',
    data,
  })
}

// 修改数据分类
export function updateCatalogy(data) {
  return request({
    url: '/system/catalogy',
    method: 'put',
    data,
  })
}

// 删除数据分类
export function delCatalogy(id) {
  return request({
    url: `/system/catalogy/${id}`,
    method: 'delete',
  })
}
