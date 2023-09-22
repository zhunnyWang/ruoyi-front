<!--
 * @Author: Xueying Wang
 * @Date: 2023-09-21 13:57:20
 * @LastEditors: Xueying Wang
 * @Description: 王雪莹
-->
<template>
  <layout-h>
    <layout-h-item class="w-14rem">
      <div class="head-container">
        <el-input v-model="deptName" placeholder="请输入部门名称" clearable prefix-icon="Search" style="margin-bottom: 20px" />
      </div>
      <div class="head-container">
        <el-tree
          ref="deptTreeRef" :data="deptOptions" :props="{ label: 'label', children: 'children' }"
          :expand-on-click-node="false" :filter-node-method="filterNode" node-key="id" highlight-current
          default-expand-all @node-click="handleNodeClick"
        />
      </div>
    </layout-h-item>
    <layout-h-item class="data-table">
      <el-form ref="queryRef" :model="queryParams" :inline="true" label-width="68px">
        <el-form-item label="用户名称" prop="userName" style="width: 240px">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber" style="width: 240px">
          <el-input v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable />
        </el-form-item>
        <el-form-item label="状态" prop="status" style="width: 240px">
          <el-select v-model="queryParams.status" placeholder="用户状态" clearable>
            <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" style="width: 308px;">
          <el-date-picker
            v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
            start-placeholder="开始日期" end-placeholder="结束日期"
          />
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
      <el-table v-loading="loading" :data="dataSource" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column key="userId" label="用户编号" align="center" prop="userId" />
        <el-table-column key="userName" label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" />
        <el-table-column key="nickName" label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" />
        <el-table-column key="deptName" label="部门" align="center" prop="dept.deptName" :show-overflow-tooltip="true" />
        <el-table-column key="phonenumber" label="手机号码" align="center" prop="phonenumber" width="120" />
        <el-table-column key="status" label="状态" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" disabled />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="160">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="paginationParams.total > 0" v-model:page="paginationParams.current"
        v-model:limit="paginationParams.pageSize" :total="paginationParams.total"
      />
    </layout-h-item>
  </layout-h>
</template>

<script setup>
import { deptTreeSelect, listUser } from '@/api/system/user'
import useTable from '@/composables/useTable'

const { proxy } = getCurrentInstance()
const { sys_normal_disable, sys_user_sex } = proxy.useDict('sys_normal_disable', 'sys_user_sex')

// 组织机构树
const deptName = ref('')
const deptOptions = ref(undefined)

const getDeptTree = () => {
  deptTreeSelect().then((res) => {
    deptOptions.value = res.data
  })
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const queryParams = reactive({
  userName: undefined,
  phonenumber: undefined,
  status: undefined,
  deptId: undefined,
})

const { loading, dataSource, pagination: paginationParams, handleChange } = useTable((params) => {
  return listUser(params)
})

watch(deptName, (val) => {
  proxy.$refs.deptTreeRef.filter(val)
})

// form表单
const dateRange = ref([])

const handleQuery = () => {
  handleChange(paginationParams, { ...proxy.addDateRange(queryParams, dateRange.value) })
}

const handleNodeClick = (data) => {
  queryParams.deptId = data.id
  handleQuery()
}

const resetQuery = () => {
  dateRange.value = []
  proxy.resetForm('queryRef')
  queryParams.deptId = undefined
  proxy.$refs.deptTreeRef.setCurrentKey(null)
  handleQuery()
}

const handleSelectionChange = () => {

}

onMounted(() => {
  getDeptTree()
  handleQuery()
})
</script>

<style lang="scss" scoped>
.data-table {
  width: calc(100% - 14rem);
}
</style>
