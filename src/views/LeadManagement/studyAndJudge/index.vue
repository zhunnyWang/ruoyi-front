<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Ruixia Lv
 * @LastEditTime: 2024-06-13 16:04:30
 * @Description: 线索研判
-->
<template>
  <div class="app-container">
    <div class="flex justify-end">
      <Search v-model="inputText" v-model:input-text="query.searchText" class="mb-4 w-300px" />
    </div>

    <el-table v-loading="loading" :data="dataSource">
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column label="线索编号" align="center" prop="id" width="100" />
      <el-table-column label="线索名称" align="center" prop="name" />
      <el-table-column label="线索来源" align="center" prop="source" />
      <el-table-column label="产生时间" align="center" prop="creatorTime" width="190" />
      <el-table-column label="分配时间" align="center" prop="distributeTime" width="190" />
      <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" @click="judgeLead">
            研判
          </el-button>
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
import { useRouter } from 'vue-router'
import useTable from '@/composables/useTable'
import Search from '@/components/Search'

const router = useRouter()

const inputText = ref('')
// table相关
const { loading, dataSource, pagination: paginationParams, handleChange } = useTable((params) => {
  return Promise.resolve({
    rows: [
      {
        id: '19',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '23',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '38',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '39',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '52',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '56',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '59',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '66',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '67',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
      {
        id: '68',
        name: '张某某疑似网约车虚增车费诈骗线索',
        source: '网约车虚增车费诈骗监督模型产生的线索',
        creatorTime: '2022-05-05',
        distributeTime: '2022-05-05',
      },
    ],
    total: 10,
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

const judgeLead = () => {
  router.push('/LeadManagement/studyAndJudgeDetail')
}
</script>

