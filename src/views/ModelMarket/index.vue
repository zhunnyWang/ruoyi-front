<!--
 * @Author: wanglu
 * @Date: 2023-07-24 18:58:26
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-19 14:59:12
 * @Description:
-->
<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-19 14:31:48
 * @Description:
-->
<template>
  <div class="app-container mb-5">
    <div class="flex justify-end">
      <Search v-model="inputText" v-model:input-text="query.searchText" class="mb-4 w-300px" />
    </div>

    <div class="h-50px bg-#f1f2f3 flex justify-start items-center pl-5 font-500 text-5">
      共{{ cardlist.length }}个模型
    </div>
    <el-card>
      <!-- 注册地域 -->
      <SelectTags v-if="registerAreaData.list.length" :condition-data="registerAreaData" :default="defaultOption" multiple />
      <!-- 业务类型 -->
      <SelectTags v-if="businessTypeData.list.length" :condition-data="businessTypeData" :default="defaultOption" multiple />
      <!-- 监督类型 -->
      <SelectTags v-if="superviseTypeData.list.length" :condition-data="superviseTypeData" :default="defaultOption" multiple />
      <!-- 排序 -->
      <span class="title mr-18">排序</span>
      <el-radio-group v-model="currentSortType">
        <el-radio v-for="(i, index) in SortType" :key="index" :label="i.label" :index="i.label" @click="checkOrder(i.label)">
          {{ i.labelname }}
        </el-radio>
      </el-radio-group>
    </el-card>

    <el-row :gutter="10">
      <el-col v-for="(card, index) in cardlist" :key="index" :sm="10" :md="8" :lg="6" class="mt-10">
        <Card :card="card" />
      </el-col>
    </el-row>
    <div class="shopping " @click="toShopping">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="查看购物车详情"
        placement="right"
      >
        <i class="iconfont icon-maijiagouwuche color-blue" />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from './component/Card.vue'
import SelectTags from './component/SelectTags.vue'
import Search from '@/components/Search'

const router = useRouter()

const { proxy } = getCurrentInstance()
const { register_porvinces } = proxy.useDict('register_porvinces')
const { business_type } = proxy.useDict('business_type')
const { supervise_type } = proxy.useDict('supervise_type')

const currentSortType = ref(1)
const registerAreaDataList = reactive(register_porvinces)
const businessTypeDataList = reactive(business_type)
const superviseTypeDataList = reactive(supervise_type)

// table相关
const query = reactive({
  searchText: '',
})

const inputText = ref('')

const registerAreaData = reactive({
  title: '注册地域',
  name: 'registerArea',
  list: registerAreaDataList,
})

const businessTypeData = reactive({
  title: '业务类型',
  name: 'businessType',
  list: businessTypeDataList,
})
const superviseTypeData = reactive({
  title: '监督类型',
  name: 'superviseType',
  list: superviseTypeDataList,
})
const SortType = [
  {
    labelname: '综合排序',
    label: 1,
  },
  {
    labelname: '评分最高',
    label: 2,
  },
  {
    labelname: '最新发布',
    label: 3,
  },
]
const defaultOption = {
  value: '',
  label: '不限',
}
const cardlist = reactive([
  {
    id: 1,
    productImg: '/images/modelMarket-1.png',
    title: '网约车虚增车费诈骗监督模型',
    describe: '网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label: '刑事检察',
    address: '杭州市人民检察院',
    subscribeNumber: 2,
    collectNumber: 3,
    publishDate: '2023-7-25',
    subscribeStatus: 1,
    collectStatus: 0,
  },
  {
    id: 2,
    productImg: '/images/modelMarket-2.png',
    title: '网约车虚增车费诈骗监督模型',
    describe: '网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label: '刑事检察',
    address: '杭州市人民检察院',
    subscribeNumber: 2,
    collectNumber: 3,
    publishDate: '2023-7-25',
    subscribeStatus: 1,
    collectStatus: 0,
  },
  {
    id: 3,
    productImg: '/images/modelMarket-3.png',
    title: '网约车虚增车费诈骗监督模型',
    describe: '网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label: '刑事检察',
    address: '杭州市人民检察院',
    subscribeNumber: 2,
    collectNumber: 3,
    publishDate: '2023-7-25',
    subscribeStatus: 0,
    collectStatus: 0,
  },
  {
    id: 4,
    productImg: '/images/modelMarket-4.png',
    title: '网约车虚增车费诈骗监督模型',
    describe: '网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label: '刑事检察',
    address: '杭州市人民检察院',
    subscribeNumber: 2,
    collectNumber: 3,
    publishDate: '2023-7-25',
    subscribeStatus: 1,
    collectStatus: 1,
  },
])

function checkOrder(label) {
  currentSortType.value = label
}
function toShopping() {
  router.push('/ModelMarket/list')
}
</script>

<style lang='scss' scoped>
  .title{
    font-weight: 600;
    color: #999;
  }
  .shopping{
    width: 30px;
    height:30px;
    margin: 15px;
    font-size:30px;
    background: #e6e1e1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(3);
    cursor: pointer;
    :hover{
      transform: scale(1.5);
    }
  }
</style>

