<!--
 * @Author: wanglu
 * @Date: 2023-09-20 10:37:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-22 14:51:48
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <el-button-group>
          <el-button plain>
            产生量
          </el-button>
          <el-button plain>
            有效量
          </el-button>
        </el-button-group>
        <el-icon v-show="!isPanelSetIcon" class="ml-4 cursor-pointer" @click="deletePanelItem">
          <Close />
        </el-icon>
      </div>
    </template>
    <div class="flex justify-between items-center">
      <el-row>
        <el-col :sm="24" :md="24" :lg="12" :xl="12">
          <el-button-group size="mini">
            <el-button plain>
              今日
            </el-button>
            <el-button plain>
              本周
            </el-button>
            <el-button plain>
              本月
            </el-button>
            <el-button plain>
              全年
            </el-button>
          </el-button-group>
        </el-col>
        <el-col :sm="24" :md="24" :lg="12" :xl="12">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            :default-time="defaultTime1"
          />
        </el-col>
      </el-row>
    </div>

    <Echarts :options="options" width="90%" height="200px" />
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Echarts from '@/components/Echarts/index.vue'

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
const options = {
  xAxis: {
    // type: 'category',
    data: ['10月', '11月', '12月', '01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [230, 750, 1000, 500, 70, 510, 260, 600, 550, 50, 120, 230],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
}

const value1 = ref('')
const defaultTime1 = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
]
</script>

<style lang=''>

</style>
