<template>
  <div class="app-container home">
    <!-- 添加任务栏 -->
    <div class="addPanel-position-box">
      <div class="addPanel-container">
        <div class="panel-text-box flex items-center">
          <el-icon><Grid /> </el-icon>
          <span class="pl-1">面板 / {{ layout.initList.length }}</span>
        </div>
        <el-divider direction="vertical" />
        <Dialog title="选择面板">
          <template #activator="{ on }">
            <el-button plain :icon="Plus" class="ml-2" @click="on">
              添加面板
            </el-button>
          </template>
          <template #default>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <div style="margin: 15px 0;" />
            <el-checkbox-group
              v-model="checkPanelItem"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(item, index) in panels"
                :key="index"
                :disabled="item === '我的待办'"
                :label="item"
              >
                {{ item }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <template #footer="{ hide }">
            <el-button @click="hide">
              取消
            </el-button>
            <el-button @click="resetPanel">
              恢复默认设置
            </el-button>
            <el-button type="primary" @click="() => getPanelItem(hide)">
              确定
            </el-button>
          </template>
        </Dialog>
        <div class="saveBtn-box">
          <el-button plain :icon="Back" @click="exitEdit">
            退出编辑
          </el-button>
          <el-button plain :icon="Select" @click="saveLayoutData">
            保存
          </el-button>
        </div>
      </div>
    </div>
    <!-- 自定义布局项 -->
    <grid-layout
      v-model:layout="layout.viewList"
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
        v-for="item in layout.viewList"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :static="item.static"
      >
        <MyTasks
          v-if="item.name === '我的待办'"
          :id="item.i"
          is-panel-set-icon="true"
          @deletePanelItemEvent="deletePanelItem"
        />
        <MyData
          v-if="item.name === '我的数据'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        />
        <MyModel
          v-if="item.name === '我的模型'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        />
        <ModelRun
          v-if="item.name === '我的模型运行任务'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        />
        <OutPut
          v-if="item.name === '产生量'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        />
        <ModelRank
          v-if="item.name === '所有模型排名'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        />
        <notice
          v-if="item.name === '消息通知'"
          :id="item.i"
          @deletePanelItemEvent="deletePanelItem"
        />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Back,
  Grid,
  Plus,
  Select,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import Dialog from '@/components/Dialog'
import MyTasks from '@/views/index/src/MyTasks.vue'
import notice from '@/views/index/src/notice.vue'
import MyData from '@/views/index/src/MyData.vue'
import MyModel from '@/views/index/src/MyModel.vue'
import ModelRun from '@/views/index/src/ModelRun.vue'
import OutPut from '@/views/index/src/output.vue'
import ModelRank from '@/views/index/src/ModelRank.vue'

import { getPageInfo, postPageInfo } from '@/api/index/systemPage.js'

const router = useRouter()

const layout = reactive({
  id: null,
  viewList: [],
  initList: [],
})
const panelOptions = ref([])
const checkPanelItem = ref([])
const panels = ref([])
const checkAll = ref(false)
const isIndeterminate = ref(true)

onMounted(() => {
  initPageInfo()
})

// 初始化数据
function initPageInfo() {
  getPageInfo().then((res) => {
    panelOptions.value = []
    const { code, data, msg } = res
    if (code === 200) {
      layout.initList = data.pageInfos
      layout.viewList = data.pageInfos.filter(item => item.status === 1)
      layout.id = data.id
      for (const attr in layout.initList) {
        panelOptions.value.push(layout.initList[attr].name)
        panels.value = panelOptions.value
        if (layout.initList[attr].status === 1)
          checkPanelItem.value[attr] = layout.initList[attr].name
      }
    }
    else {
      ElMessage({
        message: msg,
        type: 'error',
      })
    }
  })
}

// 退出编辑
function exitEdit() {
  router.push('/index')
}
// 保存最新面板布局参数
function saveLayoutData() {
  const sendData = {
    id: layout.id,
    pageInfos: layout.initList,
  }
  postPageInfo(sendData).then((res) => {
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
      setTimeout(() => {
        router.push({
          path: '/index',
          query: {
            date: new Date().getTime(),
          },
        })
      }, 500)
    }
    else {
      ElMessage({
        message: msg,
        type: 'error',
      })
    }
  })
}
// 全选-面板选项
function handleCheckAllChange(val) {
  checkPanelItem.value = val ? panels.value : ['我的待办']
  isIndeterminate.value = false
  if (val) {
    for (const attr in layout.initList)
      layout.initList[attr].status = 1
  }
  else {
    for (const attr in layout.initList) {
      if (layout.initList[attr].name !== '我的待办')
        layout.initList[attr].status = 0
    }
  }
}
// 多选-面板选项
function handleCheckedCitiesChange(value) {
  const checkedCount = value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < panels.value.length
  const noCheckLayout = panels.value.filter(item => !value.includes(item))
  checkAll.value = checkedCount === panels.value.length
  if (checkAll.value) {
    for (const attr in layout.initList)
      layout.initList[attr].status = 1
  }
  else {
    for (const attr in layout.initList) {
      value.forEach((i) => {
        if (layout.initList[attr].name === i)
          layout.initList[attr].status = 1
      })
      noCheckLayout.forEach((i) => {
        if (layout.initList[attr].name === i)
          layout.initList[attr].status = 0
      })
    }
  }
}
// 弹出框确定-添加面板
function getPanelItem(hide) {
  const sendData = {
    id: layout.id,
    pageInfos: layout.initList,
  }
  postPageInfo(sendData).then((res) => {
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        message: '面板设置成功',
        type: 'success',
      })
      initPageInfo()
      hide()
    }
    else {
      ElMessage({
        message: msg,
        type: 'error',
      })
    }
  })
}
// 恢复默认设置面板
function resetPanel() {
  checkPanelItem.value = panels.value
  for (const attr in layout.initList)
    layout.initList[attr].status = 1
}
// 根据面板id删除面板
function deletePanelItem(panelId) {
  const deleteName = []
  layout.value = Array.from(layout.value)
  for (const attr in layout) {
    if (layout.value[attr].i === panelId) {
      deleteName.push(layout[attr].name)
      delete layout[attr]
    }
  }
  layout.value = layout.value.filter((item) => {
    if (item !== undefined)
      return item
  })
  checkPanelItem.value = checkPanelItem.value
    .concat(deleteName)
    .filter((item, index, Arr) => {
      return Arr.indexOf(item) === Arr.lastIndexOf(item)
    })
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
