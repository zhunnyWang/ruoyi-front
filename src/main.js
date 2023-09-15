/*
 * @Author: wanglu
 * @Date: 2023-07-24 18:58:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-14 16:14:16
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-13 10:38:20
 * @Description:
 */
import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文语言

import '@/assets/styles/index.scss' // global css

import gridLayout from 'vue-grid-layout'
import App from './App'
import store from './store'
import router from './router'

import directive from './directive' // directive

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

// 导入Unocss
import 'virtual:uno.css'

import { useDict } from '@/utils/dict'
import { addDateRange, handleTree, parseTime, resetForm, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'
import { registerGlobComp } from '@/utils/registerGlobComp'

// 引入iconfont
import './assets/font/iconfont.css'

// 导入VueGridLayout自由拖拽组件

// 分页组件
// 自定义表格工具组件
// 富文本组件
// 文件上传组件
// 图片上传组件
// 图片预览组件
// 自定义树选择组件
// 字典标签组件


const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('SvgIcon', SvgIcon)
registerGlobComp(app)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.use(gridLayout)
app.component('SvgIcon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: zhCn,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
