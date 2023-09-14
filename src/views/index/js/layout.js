/*
 * @Author: wanglu
 * @Date: 2023-09-13 11:16:12
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-13 11:16:26
 * @Description: 
 */
const initPanelsLayout = [
  {
    x: 0,
    y: 0,
    w: 5,
    h: 8,
    i: 8,
    name: '个人信息',
    static: true
  },
  { x: 5, y: 5, w: 12, h: 8, i: 0, name: '公告栏' },
  { x: 0, y: 15, w: 5, h: 9, i: 1, name: '常用应用' },
  { x: 0, y: 24, w: 5, h: 16, i: 3, name: '常用流程' },
  { x: 17, y: 8, w: 7, h: 13, i: 6, name: '我的日程' },
  { x: 17, y: 31, w: 7, h: 9, i: 10, name: '我的会议' },
  { x: 17, y: 21, w: 7, h: 10, i: 11, name: '我的任务' },
  { x: 17, y: 0, w: 7, h: 8, i: 2, name: '督办提醒' },
  { x: 5, y: 21, w: 12, h: 8, i: 13, name: '督办公文' },
  { x: 5, y: 13, w: 12, h: 8, i: 4, name: '待办公文' },
  { x: 5, y: 0, w: 12, h: 5, i: 9, name: '待办事项' },
  { x: 5, y: 29, w: 12, h: 11, i: 12, name: '待办流程' },
  { x: 0, y: 8, w: 5, h: 7, i: 7, name: '快捷操作' }
]

export { initPanelsLayout }
