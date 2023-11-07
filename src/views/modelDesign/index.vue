<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Xueying Wang
 * @LastEditTime: 2023-11-07 15:37:33
 * @Description:
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
        <Search v-model="query.name" class="w-300px" placeholder="输入模型名称" />

        <Dialog>
          <template #activator="{ on }">
            <el-button icon="Plus" type="primary" class="ml-5" @click="on">
              新建
            </el-button>
          </template>
          <template #header>
            <span>新建模型设计</span>
            <el-divider class="mt-2 mb-0" />
          </template>
          <template #default>
            <el-form ref="queryRef" :model="form" label-width="120px">
              <el-row>
                <el-col :span="12" class="pb-3">
                  <el-form-item label="模型名称" prop="status">
                    <el-input v-model="form.name" placeholder="输入模型名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="pb-3">
                  <el-form-item label="业务类型" prop="status">
                    <el-select v-model="form.businessType" placeholder="" clearable style="width: 200px">
                      <el-option v-for="dict in business_type" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="pb-3">
                  <el-form-item label="监督类型" prop="status">
                    <el-select v-model="form.supervisionType" placeholder="" clearable style="width: 200px">
                      <el-option v-for="dict in supervise_type" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="pb-3">
                  <el-form-item label="模型状态" prop="status">
                    <el-input v-model="form.modelStatus" placeholder="输入模型状态" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
          <template #footer="{ hide }">
            <el-button @click="hide">
              取消
            </el-button>
            <el-button type="primary" @click="() => submit(hide)">
              确定
            </el-button>
          </template>
        </Dialog>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="dataSource">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column label="模型名称" show-overflow-tooltip align="center" prop="name" />
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
      <el-table-column label="设计人" align="center" prop="createBy" />
      <el-table-column label="设计时间" show-overflow-tooltip align="center" prop="createTime" />
      <el-table-column label="注册时间" align="center" prop="postSort" />
      <el-table-column label="模型状态" align="center" prop="modelStatus">
        <template #default="scope">
          {{ scope.row.modelStatus }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            v-hasPermi="['system:post:edit']" link type="primary" icon="View"
            @click="handleView(scope.row.id)"
          >
            查看
          </el-button>
          <el-button
            v-hasPermi="['system:post:edit']" link type="primary" icon="Edit"
            @click="handleEdit(scope.row.id)"
          >
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
import { ElMessage } from 'element-plus'
import useTable from '@/composables/useTable'
import { addList, deleteList, getList, getListById } from '@/api/modelDesign/modelDesign.js'
import Dialog from '@/components/Dialog'
import Search from '@/components/Search'

const { proxy } = getCurrentInstance()
const { business_type } = proxy.useDict('business_type')
const { supervise_type } = proxy.useDict('supervise_type')

// table相关
const query = reactive({
  businessType: '',
  supervisionType: '',
  name: '',
})
const { loading, dataSource, pagination: paginationParams, handleChange, refresh } = useTable((query) => {
  return getList(query)
})

watch(query, (val) => {
  handleChange(paginationParams, {
    ...val,
  })
})

onMounted(() => {
  handleChange(paginationParams, query)
})
// 新建-提交表单
const form = reactive({
  name: '',
  businessType: '',
  supervisionType: '',
  modelStatus: null,
})
function submit(hide) {
  addList(form).then((res) => {
    const { code, msg } = res
    if (code === 200) {
      ElMessage({
        type: 'success',
        message: msg,
      })
      hide()
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
// 查看
function handleView(id) {
  getListById(id).then(() => {
    console.log(id)
  })
}
// 编辑
function handleEdit(id) {
  getListById(id).then(() => {
    console.log(id)
  })
}
// 删除
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
