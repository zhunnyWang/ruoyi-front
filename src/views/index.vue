<!--
 * @Author: wanglu
 * @Date: 2023-07-24 18:58:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-13 18:51:21
 * @Description: 
-->
<!--
 * @Author: wanglu
 * @Date: 2023-07-24 18:58:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-13 17:19:35
 * @Description: 
-->
<template>
  <div class="app-container home">
    <div class="addPanel-container">
      <el-button plain :icon="Setting" @click="editDesktop" >
        自定义
      </el-button>
    </div>
    <!-- {{ layout }} -->
    <grid-layout
        :layout.async="layout"
        :col-num="24"
        :row-height="30"
        :is-draggable="false"
        :is-resizable="false"
        :is-mirrored="false"       
        :vertical-compact="true"  
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :h="item.h"
          :i="item.i"
          :static="item.static"
          :w="item.w"
          :x="item.x"
          :y="item.y"
        >
        <notice v-if="item.name === '公告栏'" :panelSetIcon="true"></notice>
        <document
          v-if="item.name === '待办公文'"
          :panelSetIcon="true"
        ></document>
        <quick-operation
          v-if="item.name === '快捷操作'"
          :panelSetIcon="true"
        ></quick-operation>
        <often-app
          v-if="item.name === '常用应用'"
          :panelSetIcon="true"
        ></often-app>
        <often-apply
          v-if="item.name === '常用流程'"
          :panelSetIcon="true"
        ></often-apply>
        <today-work
          v-if="item.name === '我的日程'"
          :panelSetIcon="true"
        ></today-work>
        <person
          v-if="item.name === '个人信息'"
          :panelSetIcon="true"
         
        ></person>
        <wait-matter
          v-if="item.name === '待办事项'"
          :panelSetIcon="true"
        ></wait-matter>
        <remind v-if="item.name === '督办提醒'" :panelSetIcon="true"></remind>
        <meeting v-if="item.name === '我的会议'" :panelSetIcon="true"></meeting>
        <my-task v-if="item.name === '我的任务'" :panelSetIcon="true"></my-task>
        <process v-if="item.name === '待办流程'" :panelSetIcon="true"></process>
        <my-document
          v-if="item.name === '督办公文'"
          :panelSetIcon="true"
        ></my-document>
       
       
        </grid-item>
      </grid-layout>
    <!-- <el-card>
      <myCharts :options="options1"></myCharts>
    </el-card> -->
  </div>
</template>

<script setup name="Index">
import { reactive, ref, onMounted } from 'vue'
// import myCharts from "@/components/Echarts/myCharts.vue"

import notice from '@/views/index/components/WaitMatter.vue'
import document from '@/views/index/components/WaitMatter.vue'
import quickOperation from '@/views/index/components/WaitMatter.vue'
import oftenApp from '@/views/index/components/WaitMatter.vue'
import oftenApply from '@/views/index/components/WaitMatter.vue'
import todayWork from '@/views/index/components/WaitMatter.vue'
import Person from '@/views/index/components/WaitMatter.vue'
import waitMatter from '@/views/index/components/WaitMatter'
import Remind from '@/views/index/components/WaitMatter.vue'
import Meeting from '@/views/index/components/WaitMatter.vue'
import MyTask from '@/views/index/components/WaitMatter.vue'
import Process from '@/views/index/components/WaitMatter.vue'
import MyDocument from '@/views/index/components/WaitMatter.vue'


import { initPanelsLayout } from './index/js/layout'
import { useRouter } from 'vue-router'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Setting,
  Star,
} from '@element-plus/icons-vue'

import useLayoutStore from '@/store/modules/layout'

const layout = ref([])
layout.value = initPanelsLayout
const layoutStore = useLayoutStore()
const router = useRouter()  

// 初始化面板项
layout.value = layoutStore.getLayout()
      // if (!layout.value) {
      //   this.checkPanelItem = this.panels
      // }



function editDesktop() {
  router.push('/index/editIndex')
}

const options1 = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
})
</script>

<style scoped lang="scss">
.addPanel-container {
  height: 56px;
  display: flex;
  justify-content:  end;
  align-items: center;
  font-size: 14px;
  padding-right: 10px;
  background: #ebeef5;
}
</style>

