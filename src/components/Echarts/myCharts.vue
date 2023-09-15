<!--
 * @Author: wanglu
 * @Date: 2023-09-12 14:22:14
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-14 17:37:46
 * @Description:
-->
<template>
  <div ref="chartDom" class="echart" />
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
})
const optionswl = reactive({
  tooltip: {
    trigger: 'item',
  },
  grid: {
    top: '13%',
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true,
  },
  legend: {
    orient: 'vertical',
    left: 'right',
  },
})
const optionsAll = { ...optionswl, ...props.options }
const chartDom = ref(null)
let myChart
const createChart = () => {
  if (chartDom.value) {
    myChart = echarts.init(chartDom.value)
    optionsAll && myChart.setOption(optionsAll, true)
  }
}

onMounted(() => {
  createChart()
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})

watch(() => props.options, (newOptions) => {
  myChart.clear()
  myChart.setOption(newOptions)
}, {
  deep: true,
})
</script>

<style lang='scss' scoped>
.echart {
  width: auto;
  min-height: 100px;
}
</style>
