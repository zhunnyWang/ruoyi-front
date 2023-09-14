<template>
  <div class="app-container home">
    <!-- 添加任务栏 -->
    <div class="addPanel-position-box">
      <div class="addPanel-container">
        <div class="panel-text-box flex items-center">
          <el-icon><Grid /> </el-icon>
          <span>面板 / </span>
          <span>{{ initPanelsLayout.length }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="add-panel-box" @click="addPanelDialog = true">
          <el-button plain :icon="Plus" >
            添加面板
          </el-button>
        </div>
        <div class="saveBtn-box">
          <el-button plain :icon="CloseBold" @click="exitEdit">
            退出编辑
          </el-button>
          <el-button plain :icon="Select" @click="saveLayoutData">
            保存
          </el-button>
        </div>
      </div>
    </div>

    <!-- 面板对话框 -->
    <!-- <el-dialog title="选择面板" :visible.sync="addPanelDialog" width="40%">
      <span>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group
          v-model="checkPanelItem"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            :disabled="item === '个人信息'"
            v-for="(item, index) in panels"
            :label="item"
            :key="index"
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPanelDialog = false">取 消</el-button>
        <el-button @click="resetPanel">恢复默认设置</el-button>
        <el-button type="primary" @click="getPanelItem">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 自定义布局项 -->
    <grid-layout
      :layout.sync="layout"
      :col-num="24"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :static="item.static"
      >
        <person
          v-if="item.name === '个人信息'"
          :editPersonStyle="true"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></person>
        <wait-matter
          v-if="item.name === '待办事项'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></wait-matter>
        <notice
          v-if="item.name === '公告栏'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></notice>
        <document
          v-if="item.name === '待办公文'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></document>
        <quick-operation
          v-if="item.name === '快捷操作'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></quick-operation>
        <often-app
          v-if="item.name === '常用应用'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></often-app>
        <often-apply
          v-if="item.name === '常用流程'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></often-apply>
        <today-work
          v-if="item.name === '我的日程'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></today-work>
        <remind
          v-if="item.name === '督办提醒'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></remind>
        <meeting
          v-if="item.name === '我的会议'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></meeting>
        <my-task
          v-if="item.name === '我的任务'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></my-task>
        <process
          v-if="item.name === '待办流程'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></process>
        <my-document
          v-if="item.name === '督办公文'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        ></my-document>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
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

import { ElMessage } from 'element-plus'


import {
  Check,
  Delete,
  Edit,
  Message,
  CloseBold,
  Select,
  Grid,
  Plus,
} from '@element-plus/icons-vue'

import useLayoutStore from '@/store/modules/layout'

import { initPanelsLayout } from './js/layout'

import { useRouter } from 'vue-router'
const router = useRouter()  

const layoutStore = useLayoutStore()
const layout = ref([])

// 相当于vue2的create
console.log('layoutStore.getLayout()',layoutStore.getLayout())
layout.value = layoutStore.getLayout()
      if (layout.value === null) {
        // this.checkPanelItem = panelOptions
        layout.value = initPanelsLayout
      } else {
       layout.value = layout.value
        // for (const attr in this.layout) {
        //   this.checkPanelItem[attr] = this.layout[attr].name
        // }
      }

onMounted(()=>{
  // initPanel()
})

// 退出编辑
function exitEdit() {
  router.push('/index')
}
 // 保存最新面板布局参数
function saveLayoutData() {
  console.log('layoutStore.setLayout(layout.value)',layoutStore.setLayout(layout.value))
  layoutStore.setLayout(layout.value)
  if (layoutStore.getLayout()) {
    ElMessage({
      message: '恭喜你，这是一条成功消息',
      type: 'success'
    }).success({
      message: '保存成功',
      type: 'success',
      duration: 500
    })
    router.push('/index')
  }
}

// 初始化面板项
function initPanel() {

  layout = JSON.parse(layoutStore.getLayout())
  if (layout === null) {
    // this.checkPanelItem = panelOptions
    layout = initPanelsLayout
  } else {
    layout = layout
    // for (const attr in this.layout) {
    //   this.checkPanelItem[attr] = this.layout[attr].name
    // }
  }
}
</script>

<style>
.edit-container {
  background-color: #ebeef5;
  background-image: radial-gradient(#ccc 4%, transparent 0);
  background-size: 45px 45px;
}
/* 头部添加面板区域 */
.addPanel-position-box {
  position: sticky;
  top: 0px;
  z-index: 100;
}
.addPanel-container {
  height: 56px;
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
  background: #ebeef5;
}
.el-icon-circle-plus {
  color: #396aff;
  margin-right: 10px;
  cursor: pointer;
}
.saveBtn-box {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 10px;
}
.save-btn {
  background-color: #396aff !important;
  color: #fff !important;
}
.icon-layout {
  margin-right: 10px;
}
.panel-text-box {
  padding: 5px 10px;
}
.add-panel-box {
  padding: 5px 10px;
  cursor: pointer;
}
.add-panel-box:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  color: #409eff;
}
/* 自定义布局项 */
.vue-grid-layout {
  width: 100%;
}
/* 多选框 */
.el-checkbox-group {
  display: flex;
  flex-direction: column;
}
.el-checkbox {
  margin-bottom: 10px;
}
</style>
