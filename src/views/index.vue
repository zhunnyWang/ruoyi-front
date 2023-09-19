<!--
 * @Author: wanglu
 * @Date: 2023-07-24 18:58:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-18 15:18:14
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
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
import {
  Setting,
} from '@element-plus/icons-vue'
import MyTasks from '@/views/index/src/MyTasks.vue'
import MyData from '@/views/index/src/MyData.vue'
import MyModel from '@/views/index/src/MyModel.vue'
import ModelRun from '@/views/index/src/ModelRun.vue'
import { getPageInfo } from '@/api/index/systemPage.js'

const layout = ref([])
const router = useRouter()

onMounted(() => {
  getPageInfo().then((res) => {
    layout.value = res.data.pageInfos
  })
})

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

