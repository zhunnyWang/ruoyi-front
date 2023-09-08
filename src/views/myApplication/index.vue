<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Xueying Wang
 * @LastEditTime: 2023-09-08 17:01:25
 * @Description: 
-->
<template>
   <div class="app-container">
      <el-form :model="form" ref="queryRef" :inline="true">
         <el-form-item label="审批状态" prop="status">
            <el-select v-model="form.status" placeholder="" clearable style="width: 200px">
               <el-option v-for="dict in approve_status" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
         </el-form-item>
         <el-form-item label="审批事项" prop="status">
            <el-select v-model="form.status" placeholder="" clearable style="width: 200px">
               <el-option v-for="dict in approve_items" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="dataSource">
         <el-table-column type="index" width="50" />
         <el-table-column label="申请事项" align="center" prop="postCode" />
         <el-table-column label="申请单位" align="center" prop="postName" />
         <el-table-column label="申请人" align="center" prop="postSort" />
         <el-table-column label="提交时间" align="center" prop="postName" />
         <el-table-column label="说明" align="center" prop="postSort" />
         <el-table-column label="审批状态" align="center" prop="status">
            <template #default="scope">
               <dict-tag :options="approve_status" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:post:edit']">查看</el-button>
            </template>
         </el-table-column>
      </el-table>

      <pagination v-show="paginationParams.total > 0" :total="paginationParams.total"
         v-model:page="paginationParams.current" v-model:limit="paginationParams.pageSize"
         @pagination="paginationChange" />
   </div>
</template>

<script setup name="Post">
import { listPost, addPost, delPost, getPost, updatePost } from "@/api/system/post"
import useTable from '@/composables/useTable'

const { proxy } = getCurrentInstance();
const { approve_status } = proxy.useDict("approve_status");
const { approve_items } = proxy.useDict("approve_items");

// table相关
const { loading, dataSource, pagination: paginationParams, handleChange } = useTable((params) => {
   return listPost(params)
})

const query = reactive({
   status: '3',
})

const refresh = () => {
   paginationParams.current = 1
   query.status = '3'
}

const paginationChange = (val) => {
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
})
/** 搜索按钮操作 */
function handleQuery() {
   query.status = form.status
}

function resetQuery() {
   form.status = '3'
   refresh()
}
</script>

