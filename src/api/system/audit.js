/*
 * @Author: Xueying Wang
 * @Date: 2023-09-08 13:59:34
 * @LastEditors: Xueying Wang
 * @Description: 审批表生成接口
 */
import request from '@/utils/request'

// 查询审批列表
export function listAudit(query) {
  return request({
    url: '/system/audit/list',
    method: 'get',
    params: query,
  })
}

// 查询审批详细
export function getAudit(id) {
  return request({
    url: `/system/audit/${id}`,
    method: 'get',
  })
}

// 新增审批
export function addAudit(data) {
  return request({
    url: '/system/audit',
    method: 'post',
    data,
  })
}

// 修改审批
export function updateAudit(data) {
  return request({
    url: '/system/audit',
    method: 'put',
    data,
  })
}

// 删除审批
export function delAudit(id) {
  return request({
    url: `/system/audit/${id}`,
    method: 'delete',
  })
}
