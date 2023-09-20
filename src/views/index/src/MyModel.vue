<!--
 * @Author: wanglu
 * @Date: 2023-09-14 13:56:18
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-20 10:16:30
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <span class="font-800">我的模型</span>
        <el-button-group>
          <el-button plain>
            测试中
          </el-button>
          <el-button plain>
            使用中
          </el-button>
        </el-button-group>
      </div>
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
