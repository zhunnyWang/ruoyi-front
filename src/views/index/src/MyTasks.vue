<!--
 * @Author: wanglu
 * @Date: 2023-09-13 10:53:08
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-22 14:50:42
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-800">我的待办</span>
        <el-icon v-show="!isPanelSetIcon" class="ml-4 cursor-pointer" @click="deletePanelItem">
          <Close />
        </el-icon>
      </div>
    </template>
    <el-row gutter="10">
      <el-col v-for="(item, index) in taskData" :key="index" :xs="24" :sm="12" :md="8" :lg="8">
        <TaskCard :data="item" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import TaskCard from '@/views/index/components/TaskCard.vue'

const props = defineProps({
  isPanelSetIcon: {
    type: Boolean,
  },
})
function deletePanelItem() {
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}
const taskData = [
  {
    title: '待研判线索',
    num: 82,
    color: '#70b603',
  },
  {
    title: '待审批事项',
    num: 20,
    color: '#f59a23',
  },
]
</script>

<style scoped>

</style>
