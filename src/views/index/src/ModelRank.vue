<!--
 * @Author: wanglu
 * @Date: 2023-09-20 09:06:58
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-22 14:48:20
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-800">所有模型排名</span>
        <div class="flex items-center">
          <el-button-group>
            <el-button plain>
              执行次数
            </el-button>
            <el-button plain>
              线索数量
            </el-button>
          </el-button-group>
          <el-icon v-show="!isPanelSetIcon" class="ml-4 cursor-pointer" @click="deletePanelItem">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>
    <el-table :data="dataSource">
      <el-table-column label="排名" type="index" width="50" />
      <el-table-column label="模型名称" show-overflow-tooltip prop="name" align="center" />
      <el-table-column label="执行次数" prop="executeNum" align="center" />
      <el-table-column label="线索数量" prop="clueNum" align="center" />
    </el-table>
  </el-card>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import useTable from '@/composables/useTable'

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

// table相关
const { dataSource, handleChange, pagination } = useTable((params) => {
  return Promise.resolve({
    rows: [
      {
        id: 1,
        name: '诈骗罪案件立案信息',
        executeNum: 11,
        clueNum: 100,
      },
      {
        id: 2,
        name: '幼师行业从业禁止模型',
        executeNum: 15,
        clueNum: 30,
      },
      {
        id: 3,
        name: '民事虚假诉讼模型',
        executeNum: 16,
        clueNum: 22,
      },
      {
        id: 4,
        name: '车辆保险诈骗模型',
        executeNum: 78,
        clueNum: 15,
      },
      {
        id: 5,
        name: '劳资纠纷虚假诉讼模型',
        executeNum: 65,
        clueNum: 15,
      },
    ],
    total: 2,
  })
})

handleChange(pagination, { test: 1 })
</script>

<style lang=''>

</style>
