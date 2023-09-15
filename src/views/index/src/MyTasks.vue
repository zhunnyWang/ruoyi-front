<!--
 * @Author: wanglu
 * @Date: 2023-09-13 10:53:08
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-15 11:19:11
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <span class="font-800">我的待办</span>
      <i
        v-show="!isPanelSetIcon"
        class="el-icon-close"
        style="float: right; padding: 3px 0"
        @click="deletePanelItem"
      />
    </template>
    <el-row gutter="10">
      <el-col v-for="(item, index) in taskData" :key="index" :xs="24" :sm="12" :md="8" :lg="8">
        <TaskCard :data="item" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import TaskCard from '@/views/index/components/TaskCard.vue'

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
