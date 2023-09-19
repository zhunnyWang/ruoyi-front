<!--
 * @Author: wanglu
 * @Date: 2023-09-19 11:07:36
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-19 16:13:58
 * @Description:
-->
<template>
  <div class="app-container home">
    <div class="flex justify-end">
      <el-button :icon="ArrowLeft" type="primary" plain @click="toModelMarket">
        返回模型市场
      </el-button>
    </div>

    <div class="border-1 mx-10 my-5 shadow-dark-200">
      <el-checkbox
        v-model="checkAll"
        @change="handleCheckAllChange"
      >
        全选
      </el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group
        v-model="checkPanelItem"
        class="w-full"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="(item, index) in data"
          :key="index"
          style="height:80px;margin-bottom: 10px;"
        >
          <listCard :data="item" style="widrh:700px" />
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft,
} from '@element-plus/icons-vue'
import listCard from '@/views/ModelMarket/component/listCard.vue'

const router = useRouter()
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkPanelItem = ref([])
const data = reactive([
  {
    title: '虚假诉讼类案监督模型',
    text: '为预防性侵未成年人违法犯罪，进一步加强对未成年人……为预防性侵未成年人违法犯罪，进一步加强对未成年人……',
  },
  {
    title: '车辆保险诈骗类案监督模型',
    text: '为预防性侵未成年人违法犯罪，进一步加强对未成年人……为预防性侵未成年人违法犯罪，进一步加强对未成年人……',
  },
  {
    title: '网约车虚增车费诈骗监督模型',
    text: '为预防性侵未成年人违法犯罪，进一步加强对未成年人……为预防性侵未成年人违法犯罪，进一步加强对未成年人……',
  },
])
function handleCheckAllChange() {
  console.log('xx')
}
function handleCheckedCitiesChange() {
  console.log('xx')
}
function toModelMarket() {
  router.push('/ModelMarket')
}
</script>

<style lang=''>

</style>
