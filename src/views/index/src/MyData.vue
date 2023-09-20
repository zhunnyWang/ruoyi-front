<!--
 * @Author: wanglu
 * @Date: 2023-09-14 10:57:49
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-20 10:34:06
 * @Description:
-->
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <span class="font-800">我的数据</span>
        <el-button-group>
          <el-button plain>
            使用中
          </el-button>
          <el-button plain>
            已过期
          </el-button>
        </el-button-group>
      </div>
    </template>
    <el-table :data="dataSource">
      <el-table-column label="排名" type="index" width="50" />
      <el-table-column label="模型名称" show-overflow-tooltip prop="name" align="center" />
      <el-table-column label="剩余时间" prop="remainingTime" align="center">
        <template #default="scope">
          <span :style="scope.row.remainingTime > 10 ? '' : 'color:red'">{{ scope.row.remainingTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请" align="center">
        <template #default="scope">
          <el-button link type="primary">
            申请
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import useTable from '@/composables/useTable'

// table相关
const { dataSource, handleChange, pagination } = useTable((params) => {
  return Promise.resolve({
    rows: [
      {
        id: 1,
        name: '法院民事案件立案信息',
        remainingTime: 7,
      },
      {
        id: 2,
        name: '公安机关诈骗罪立案数据',
        remainingTime: 7,
      },
      {
        id: 3,
        name: '市场监督管理部门知识产权处罚数据',
        remainingTime: 16,
      },
      {
        id: 4,
        name: '税务部门企业缴纳所得税数据',
        remainingTime: 78,
      },
      {
        id: 5,
        name: '市场监督管理部门企业工商登记信息数据',
        remainingTime: 65,
      },
    ],
    total: 2,
  })
})

handleChange(pagination, { test: 1 })
</script>

<style>
.el-card {
  height: 100%;
  position: relative;
}
.el-card .document-close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 200;
}
.document-list-box {
  display: grid;
  grid-template-columns: repeat(1, 100%);
}
.document-list-box .document-list-item {
  display: grid;
  grid-template-columns: 1fr 0.5fr 3.5fr 1fr 3fr 1fr 2fr;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
  line-height: 40px;
}
.document-list-item i {
  color: #ff394c;
}
.document-list-item > * {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
