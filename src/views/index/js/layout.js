/*
 * @Author: wanglu
 * @Date: 2023-09-13 11:16:12
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-20 14:19:42
 * @Description:
 */
const initPanelsLayout = [
  {
    x: 0,
    y: 0,
    w: 12,
    h: 6,
    i: 0,
    name: '我的待办',
    static: true,
  },
  { x: 0, y: 6, w: 12, h: 4, i: 1, name: '消息通知' },
  { x: 12, y: 0, w: 12, h: 10, i: 2, name: '我的数据' },
  { x: 0, y: 10, w: 12, h: 10, i: 3, name: '我的模型' },
  { x: 12, y: 10, w: 12, h: 10, i: 4, name: '我的模型运行任务' },
  { x: 0, y: 20, w: 15, h: 10, i: 5, name: '产生量' },
  { x: 15, y: 20, w: 9, h: 10, i: 6, name: '所有模型排名' },
]

export { initPanelsLayout }
