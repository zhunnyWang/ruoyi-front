<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Xueying Wang
 * @LastEditTime: 2023-11-07 15:49:07
 * @Description: 模型注册
-->
<template>
  <div class="app-container">
    <el-form ref="queryRef" :model="query" :inline="true">
      <el-form-item label="业务类型" prop="status">
        <el-select v-model="query.businessType" placeholder="" clearable style="width: 200px">
          <el-option v-for="dict in business_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="监督类型" prop="status">
        <el-select v-model="query.supervisionType" placeholder="" clearable style="width: 200px">
          <el-option v-for="dict in supervise_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <Search v-model="inputText" v-model:input-text="query.name" class="w-300px" placeholder="输入模型名称" />
        <el-button icon="Plus" class="ml-2" @click="judgeAdd">
          新建
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="dataSource">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column label="模型编号" show-overflow-tooltip align="center" prop="id" />
      <el-table-column label="业务类型" align="center" prop="businessType">
        <template #default="scope">
          <dict-tag :options="business_type" :value="scope.row.businessType" />
        </template>
      </el-table-column>
      <el-table-column label="监督类型" align="center" prop="supervisionType">
        <template #default="scope">
          <dict-tag :options="supervise_type" :value="scope.row.supervisionType" />
        </template>
      </el-table-column>
      <el-table-column label="模型名称" show-overflow-tooltip align="center" prop="name" />
      <el-table-column label="注册单位" align="center" prop="createBy" />
      <el-table-column label="提交时间" show-overflow-tooltip align="center" prop="createTime" />
      <el-table-column label="模型状态" align="center" prop="modelStatus">
        <template #default="scope">
          {{ scope.row.modelStatus }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button v-hasPermi="['system:post:edit']" link type="primary" icon="View" @click="handleView(scope.row.id)">
            查看
          </el-button>
          <el-button v-hasPermi="['system:post:edit']" link type="primary" icon="Edit" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>
          <el-button
            v-hasPermi="['system:post:edit']" link type="danger" icon="Delete"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="paginationParams.total > 0" v-model:page="paginationParams.current"
      v-model:limit="paginationParams.pageSize" :total="paginationParams.total"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useTable from '@/composables/useTable'
import Search from '@/components/Search'
import { deleteList, getList } from '@/api/modelDesign/modelDesign.js'

const { proxy } = getCurrentInstance()
const { business_type } = proxy.useDict('business_type')
const { supervise_type } = proxy.useDict('supervise_type')

const router = useRouter()

// table相关
const inputText = ref('')

const query = reactive({
  businessType: '',
  supervisionType: '',
  name: '',
})

const { loading, dataSource, pagination: paginationParams, handleChange, refresh } = useTable((query) => {
  return getList(query)
})

onMounted(() => {
  handleChange(paginationParams, query)
})

watch(query, (val) => {
  handleChange(paginationParams, {
    ...val,
  })
})

const judgeAdd = () => {
  router.push('/modelManagement/modelResgisterAdd')
}

function handleDelete(params) {
  deleteList(params).then((res) => {
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        type: 'success',
        message: msg,
      })
      refresh()
    }
    else {
      ElMessage({
        type: 'error',
        message: msg,
      })
    }
  })
}
</script>
