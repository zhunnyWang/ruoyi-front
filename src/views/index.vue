<!--
 * @Author: wanglu
 * @Date: 2023-07-24 18:58:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-14 17:39:48
 * @Description:
-->
<template>
  <div class="app-container home">
    <div class="addPanel-container">
      <el-button plain :icon="Setting" @click="editDesktop">
        自定义
      </el-button>
    </div>
    <grid-layout
      :layout="layout"
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
        <MyTasks
          v-if="item.name === '我的待办'"
          :panel-set-icon="true"
        />
        <MyData v-if="item.name === '我的数据'" :panel-set-icon="true" />
        <MyModel
          v-if="item.name === '我的模型'"
          :panel-set-icon="true"
        />
        <ModelRun
          v-if="item.name === '我的模型运行任务'"
          :panel-set-icon="true"
        />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup name="Index">
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import {
  Setting,
} from '@element-plus/icons-vue'
import { initPanelsLayout } from './index/js/layout'
import MyTasks from '@/views/index/src/MyTasks.vue'
import MyData from '@/views/index/src/MyData.vue'
import MyModel from '@/views/index/src/MyModel.vue'
import ModelRun from '@/views/index/src/ModelRun.vue'

import useLayoutStore from '@/store/modules/layout'

const layout = ref([])
layout.value = initPanelsLayout
const layoutStore = useLayoutStore()
const router = useRouter()

// 初始化面板项
layout.value = layoutStore.getLayout()

function editDesktop() {
  router.push('/index/editIndex')
}
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

