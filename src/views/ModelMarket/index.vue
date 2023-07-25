<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: wanglu
 * @LastEditTime: 2023-07-25 15:38:22
 * @Description: 
-->
<template>
  <div class="app-container">
    <el-card>
      <!-- 注册地域 -->
      <SelectTags  v-if="registerAreaData.list.length" :condition-data="registerAreaData" :default="defaultOption" multiple  />
      <!-- 业务类型 -->
      <SelectTags  v-if="businessTypeData.list.length" :condition-data="businessTypeData" :default="defaultOption" multiple />
      <!-- 监督类型 -->
      <SelectTags  v-if="superviseTypeData.list.length" :condition-data="superviseTypeData" :default="defaultOption" multiple />
      <!-- 排序 -->
      <span class="title mr-18">排序</span>
      <el-radio-group v-model="currentSortType">
        <el-radio v-for="i in SortType" :label="i.label" :index='i.label' @click="checkOrder(i.label)">
        {{ i.labelname }}</el-radio>
      </el-radio-group>

    </el-card>
    

    <el-row :gutter="10">
      <el-col v-for="card in cardlist" :sm="10" :md="8" :lg="6"  class="mt-10">
        <Card :card="card"></Card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script setup lang='ts'>
import {reactive, ref} from 'vue'
import Card from "./component/Card.vue"
import SelectTags from './component/SelectTags.vue'
interface CardItem {
  id: number
  productImg:string
  title:string
  describe:string
  label:string
  address:string
  subscribeNumber:number
  collectNumber:number
  publishDate:string
  subscribeStatus:number
  collectStatus:number
}
const currentSortType = ref(1)

const SortType = [
  {
    labelname:'综合排序',
    label:1
  },
  {
    labelname:'评分最高',
    label:2
  },
  {
    labelname:'最新发布',
    label:3
  }
]

const  registerAreaData ={
  title: '注册地域',
  name: 'registerArea',
  list: [
    {
      value:'1',
      label:'北京'
    },
    {
      value:'2',
      label:'天津'
    },
    {
      value:'3',
      label:'河北'
    },
    {
      value:'4',
      label:'山西'
    },
    {
      value:'5',
      label:'内蒙古'
    },
    {
      value:'6',
      label:'辽宁'
    },
    {
      value:'7',
      label:'吉林'
    }
  ]
}

const  businessTypeData ={
  title: '业务类型',
  name: 'businessType',
  list: [
    {
      value:'1',
      label:'刑事检察'
    },
    {
      value:'2',
      label:'民事检察'
    },
    {
      value:'3',
      label:'行政检察'
    },
    {
      value:'4',
      label:'公益诉讼检察'
    },
    {
      value:'5',
      label:'刑事执行检察'
    },
    {
      value:'6',
      label:'未成年人检察'
    },
    {
      value:'7',
      label:'知识产权检察'
    }
  ]
}
const superviseTypeData = {
  title: '监督类型',
  name: 'superviseType',
  list: [
    {
      value:'1',
      label:'社会治理'
    },
    {
      value:'2',
      label:'立案监督'
    },
    {
      value:'3',
      label:'侦查监督'
    },
    {
      value:'4',
      label:'裁判结果监督'
    },
    {
      value:'5',
      label:'执行监督'
    }
  ]

}
const  defaultOption = {
  value: '',
  label: '不限'
}
const cardlist = reactive<Array<CardItem>>([
  {
    id: 1,
    productImg:'/images/modelMarket-1.png',
    title:'网约车虚增车费诈骗监督模型',
    describe:'网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label:'刑事检察',
    address:'杭州市人民检察院',
    subscribeNumber:2,
    collectNumber:3,
    publishDate:'2023-7-25',
    subscribeStatus:1,
    collectStatus:0
  },
    {
    id: 2,
    productImg:'/images/modelMarket-2.png',
    title:'网约车虚增车费诈骗监督模型',
    describe:'网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label:'刑事检察',
    address:'杭州市人民检察院',
    subscribeNumber:2,
    collectNumber:3,
    publishDate:'2023-7-25',
    subscribeStatus:1,
    collectStatus:0
  },
    {
    id: 3,
    productImg:'/images/modelMarket-3.png',
    title:'网约车虚增车费诈骗监督模型',
    describe:'网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label:'刑事检察',
    address:'杭州市人民检察院',
    subscribeNumber:2,
    collectNumber:3,
    publishDate:'2023-7-25',
    subscribeStatus:0,
    collectStatus:0
  },
    {
    id: 4,
    productImg:'/images/modelMarket-4.png',
    title:'网约车虚增车费诈骗监督模型',
    describe:'网约车平台接收投诉多，网约车平台报案，公安立案后通知检察院提前介入，检察院通过法律文书检察院通过法律文书检察院通过法律文书检察院通过法律文书',
    label:'刑事检察',
    address:'杭州市人民检察院',
    subscribeNumber:2,
    collectNumber:3,
    publishDate:'2023-7-25',
    subscribeStatus:1,
    collectStatus:1
  }
])

function checkOrder(label:number) {
  currentSortType.value = label
}

</script>

<style lang='scss' scoped>
  .title{
    font-weight: 600;
    color: #999;
  }

</style>

