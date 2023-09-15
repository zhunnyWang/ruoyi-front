<!--
 * @Author: wanglu
 * @Date: 2023-09-14 13:56:18
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-14 16:22:47
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <span class="font-800">我的模型</span>
      <i
        v-show="!isPanelSetIcon"
        class="el-icon-close"
        style="float: right; padding: 3px 0"
        @click="deletePanelItem"
      />
    </template>
    <el-row gutter="5">
      <el-col v-for="(item, index) in modelDta" :key="index" :span="12" class="pt-2">
        <modelCard :data="item" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import modelCard from '@/views/index/components/modelCard.vue'

const modelDta = [
  {
    image: '',
    title: '套路贷分析模型',
    createPeople: '张明1',
    createTime: '2023-2-10 10:00:00',
  },
  {
    image: '',
    title: '车辆保险诈骗类监督模型',
    createPeople: '张明2',
    createTime: '2023-2-10 10:00:00',
  },
  {
    image: '',
    title: '劳资纠纷虚假诉讼监督模型',
    createPeople: '张明3',
    createTime: '2023-2-10 10:00:00',
  },
  {
    image: '',
    title: '幼师行业从业禁止类监督模型',
    createPeople: '张明4',
    createTime: '2023-2-10 10:00:00',
  },

]
</script>

<style lang=''>

</style>
