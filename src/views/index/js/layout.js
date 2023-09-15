/*
 * @Author: wanglu
 * @Date: 2023-09-13 11:16:12
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-14 17:32:15
 * @Description:
 */
const initPanelsLayout = [
  {
    x: 0,
    y: 0,
    w: 12,
    h: 8,
    i: 0,
    name: '我的待办',
    static: true,
  },
  { x: 12, y: 0, w: 12, h: 8, i: 1, name: '我的数据' },
  { x: 0, y: 8, w: 12, h: 8, i: 2, name: '我的模型' },
  { x: 12, y: 8, w: 12, h: 8, i: 3, name: '我的模型运行任务' },
]

export { initPanelsLayout }
