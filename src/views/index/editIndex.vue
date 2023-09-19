<template>
  <div class="app-container home">
    <!-- 添加任务栏 -->
    <div class="addPanel-position-box">
      <div class="addPanel-container">
        <div class="panel-text-box flex items-center">
          <el-icon><Grid /> </el-icon>
          <span class="pl-1">面板 / {{ layout.length }}</span>
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
                :disabled="item === '个人信息'"
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
            <el-button type="primary" @click="getPanelItem">
              确定
            </el-button>
          </template>
        </Dialog>
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
    <!-- {{ layout }} -->
    <!-- 自定义布局项 -->
    <grid-layout
      v-model:layout="layout"
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
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Grid,
  Plus,
  Select,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import Dialog from '@/components/Dialog'
import MyTasks from '@/views/index/src/MyTasks.vue'
import MyData from '@/views/index/src/MyData.vue'
import MyModel from '@/views/index/src/MyModel.vue'
import ModelRun from '@/views/index/src/ModelRun.vue'

import { getPageInfo, postPageInfo } from '@/api/index/systemPage.js'

const router = useRouter()

const layout = ref([])
const panelOptions = ref([])
const checkPanelItem = ref([])
const panels = ref([])
const checkAll = ref(false)
const isIndeterminate = ref(true)

onMounted(() => {
  getPageInfo().then((res) => {
    const { code, data, msg } = res
    if (code === 200) {
      layout.value = data.pageInfos

      for (const attr in data.pageInfos) {
        panelOptions.value.push(data.pageInfos[attr].name)
        panels.value = panelOptions.value
      }

      if (layout.value === null) {
        checkPanelItem.value = panelOptions.value
      }
      else {
        layout.value = layout.value
        for (const attr in layout.value)
          checkPanelItem.value[attr] = layout.value[attr].name
      }
    }
    else {
      ElMessage({
        message: msg,
        type: 'error',
      })
    }
  })
})

// 退出编辑
function exitEdit() {
  router.push('/index')
}
// 保存最新面板布局参数
function saveLayoutData() {
  postPageInfo(layout.value).then((res) => {
    console.log('Post', layout.value)
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
      router.push('/index')
    }
    else {
      ElMessage({
        message: msg,
        type: 'error',
      })
    }
  })
}
// 全选面板选项
function handleCheckAllChange(val) {
  // this.checkPanelItem = val ? this.panels : ['个人信息']
  // this.isIndeterminate = false
}
// 多选面板选项
function handleCheckedCitiesChange(value) {
  // const checkedCount = value.length
  // this.checkAll = checkedCount === this.panels.length
  // this.isIndeterminate =
  //   checkedCount > 0 && checkedCount < this.panels.length
}
// 添加面板
function getPanelItem() {
  // const newLayout = []
  // const panelName = []
  // const layout = JSON.parse(window.sessionStorage.getItem('layout'))
  // if (layout) {
  //   for (const attr in layout) {
  //     this.checkPanelItem.filter(item => {
  //       if (item === layout[attr].name) {
  //         newLayout.push(layout[attr])
  //         panelName.push(layout[attr].name)
  //       }
  //     })
  //   }
  //   const addPanel = this.checkPanelItem
  //     .concat(panelName)
  //     .filter((item, i, arr) => {
  //       return arr.indexOf(item) === arr.lastIndexOf(item)
  //     })
  //   for (const attr in this.initLayout) {
  //     addPanel.filter(item => {
  //       if (item === this.initLayout[attr].name) {
  //         newLayout.push(this.initLayout[attr])
  //       }
  //     })
  //   }
  //   this.layout = newLayout
  // } else {
  //   console.log(this.checkPanelItem)
  //   const result = []
  //   for (const attr in this.initLayout) {
  //     result.push(this.initLayout[attr].name)
  //     this.checkPanelItem.filter((item, index) => {
  //       if (item === this.initLayout[attr].name) {
  //         newLayout.push(this.initLayout[attr])
  //       }
  //     })
  //   }
  //   this.layout = newLayout
  // }
}
// 恢复默认设置面板
function resetPanel() {
  checkPanelItem.value = panels.value
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
