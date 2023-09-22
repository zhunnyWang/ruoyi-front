<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Ruixia Lv
 * @LastEditTime: 2023-09-22 16:21:15
 * @Description:线索分配
-->
<template>
  <div class="app-container">
    <div class="flex justify-end">
      <Search v-model="inputText" v-model:input-text="query.searchText" class="mb-4 w-300px" />
    </div>

    <el-table v-loading="loading" :data="dataSource">
      <el-table-column type="index" width="50" />
      <el-table-column label="线索编号" align="center" prop="id" width="100" />
      <el-table-column label="线索名称" align="center" prop="name" />
      <el-table-column label="线索来源" align="center" prop="source" />
      <el-table-column label="产生时间" align="center" prop="creatorTime" />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="distribute_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <Dialog>
            <template #activator="{ on }">
              <el-button link type="primary" icon="View" @click="on">
                查看
              </el-button>
            </template>
            <template #header>
              <span>线索详情</span>
              <el-divider class="mt-2 mb-0" />
            </template>
            <template #default>
              <el-form :model="scope.row" class="detail-form">
                <el-form-item label="线索名称" prop="name">
                  <el-input v-model="scope.row.name" disabled />
                </el-form-item>
                <el-form-item label="线索来源" prop="source">
                  <el-input v-model="scope.row.source" disabled />
                </el-form-item>
                <el-form-item label="产生时间" prop="creatorTime">
                  <el-input v-model="scope.row.creatorTime" disabled />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-input v-model="scope.row.status" disabled />
                </el-form-item>
              </el-form>
            </template>
            <template #footer="{ hide }">
              <el-button @click="hide">
                取消
              </el-button>
              <el-button type="primary" @click="handleAddType">
                确定
              </el-button>
            </template>
          </Dialog>
          <Dialog>
            <template #activator="{ on }">
              <el-button link type="primary" @click="on">
                分配
              </el-button>
            </template>
            <template #default>
              <div class="flex">
                <FileTree v-loading="regionDataLoading" :data="regionData" class="w-300px border-gray-900 mr-10" @node-click="handleNodeClick" />
                <el-checkbox-group v-model="checkList">
                  <el-checkbox v-for="(item, index) in checkData" :key="index" :label="item" />
                </el-checkbox-group>
              </div>
            </template>
            <template #footer="{ hide }">
              <el-button @click="hide">
                取消
              </el-button>
              <el-button type="primary" @click="handleAddType">
                确定
              </el-button>
            </template>
          </Dialog>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="paginationParams.total > 0" v-model:page="paginationParams.current"
      v-model:limit="paginationParams.pageSize" :total="paginationParams.total"
      @pagination="paginationChange"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import FileTree from '@/views/dataManagement/components/FileTree'
import useTable from '@/composables/useTable'
import Search from '@/components/Search'
import Dialog from '@/components/Dialog'

const { proxy } = getCurrentInstance()
const { distribute_status } = proxy.useDict('distribute_status')

const regionDataLoading = ref(true)
const regionData = ref([])

const checkList = ref(['全部'])
const checkData = ref(['全部', '李检察官', '王检察官', '张检察官', '1检察官', '2检察官'])

const inputText = ref('')
// table相关
const { loading, dataSource, pagination: paginationParams, handleChange } = useTable((params) => {
  return Promise.resolve({
    rows: [
      {
        id: '1',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督',
        status: 0,
        creatorTime: '2022-05-05',

      },
    ],
    total: 1,
  })
})

onMounted(() => {
  Promise.resolve([{
    label: '北京市人民检察院',
    children: [
      {
        label: '北京市朝阳区人民检察院',
      },
      {
        label: '北京市海淀区人民检察院',
      },
    ],
  }, {
    label: '民事检查部',
    children: [
      {
        label: '民事检查部1',
      },
    ],
  }, {
    label: '刑事检察部',
    children: [
      {
        label: '刑事检察部1',
      },
    ],
  }, {
    label: '行政检查部',
    children: [
      {
        label: '行政检查部1',
      },
    ],
  },
  {
    label: '公益诉讼',
    children: [
      {
        label: '公益诉讼1',
      },
    ],
  },
  ]).then((val) => {
    regionData.value = val
    regionDataLoading.value = false
  })
})

const query = reactive({
  searchText: '',
})

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

const handleNodeClick = (data) => {
  console.log(data)
}
</script>

<style lang="scss" scoped>
.el-table{
  --el-table-border-color:transparent;
}
.el-checkbox-group{
  display: flex;
  flex-direction: column;
}
</style>

<style>
 .el-form-item__label{
    width: 80px !important;
  }
</style>

