<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Xueying Wang
 * @LastEditTime: 2023-09-13 16:45:20
 * @Description: 申请审批
-->
<template>
  <div class="app-container">
    <el-form ref="queryRef" :model="form" :inline="true">
      <el-form-item label="审批状态" prop="status">
        <el-select v-model="form.status" placeholder="" clearable style="width: 200px">
          <el-option v-for="dict in approve_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批事项" prop="stepType">
        <el-select v-model="form.stepType" placeholder="" clearable style="width: 200px">
          <el-option v-for="dict in approve_items" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="resetQuery">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="dataSource">
      <el-table-column type="index" width="50" />
      <el-table-column label="审批事项" align="center" prop="stepType" />
      <el-table-column label="审批状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="approve_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            v-hasPermi="['system:audit:edit']" type="text" icon="Edit"
            @click="handleView(scope.row)"
          >
            查看
          </el-button>
          <el-button
            v-hasPermi="['system:audit:remove']" type="text" icon="DocumentChecked"
            @click="handleAudit(scope.row)"
          >
            审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="paginationParams.total > 0" v-model:page="paginationParams.current"
      v-model:limit="paginationParams.pageSize" :total="paginationParams.total" @pagination="paginationChange"
    />
  </div>
</template>

<script setup name="Audit">
import { listAudit } from '@/api/system/audit'
import useTable from '@/composables/useTable'

const { proxy } = getCurrentInstance()
const { approve_status } = proxy.useDict('approve_status')
const { approve_items } = proxy.useDict('approve_items')

// 查询参数
const query = reactive({
  stepType: '3',
  status: '3',
})

const { loading, dataSource, pagination: paginationParams, handleChange } = useTable((params) => {
  return listAudit(params)
})

const refresh = () => {
  paginationParams.current = 1
  query.stepType = '3'
  query.status = '3'
}

const paginationChange = () => {
  handleChange({ ...paginationParams, current: val.page, pageSize: val.limit }, query)
}

watch(query, (val) => {
  handleChange(paginationParams, {
    ...val,
  })
})

onMounted(() => {
  handleChange(paginationParams, query)
})

// 搜索相关
const form = reactive({
  status: '3',
  stepType: '3',
})
/** 搜索按钮操作 */
function handleQuery() {
  query.status = form.status
  query.stepType = form.stepType
}

/** 重置按钮操作 */
function resetQuery() {
  form.status = '3'
  form.stepType = '3'
  refresh()
}

function handleView(row) {
  console.log(row)
}

function handleAudit(row) {
  console.log(row)
}
</script>
