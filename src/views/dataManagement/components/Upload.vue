<!--
 * @Author: Xueying Wang
 * @Date: 2023-09-14 10:17:00
 * @LastEditors: Xueying Wang
 * @Description: 上传个人数据
-->
<template>
  <el-steps :space="200" :active="active" align-center>
    <el-step title="导入文件" />
    <el-step title="校验数据" />
    <el-step title="保存" />
  </el-steps>
  <el-form v-if="active === 0" :model="documentParams" class="mt-6">
    <el-form-item label="导入模式">
      <el-radio-group v-model="documentParams.importModel">
        <el-radio label="1">
          导入新表
        </el-radio>
        <el-radio label="2">
          增量导入已有表
        </el-radio>
        <el-radio label="3">
          覆盖导入已有表
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文件类型">
      <el-radio-group v-model="documentParams.documentType">
        <el-radio label="excel">
          Excel文件（.xls/.xlsx）
        </el-radio>
        <el-radio label="txt">
          文本文件（txt）
        </el-radio>
        <el-radio label="csv">
          csv文件
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文件上传">
      <el-upload
        v-model:file-list="documentParams.fileList" multiple
        accept=".csv,.txt,.xls,.xlsx"
        :limit="5"
        :auto-upload="false"
      >
        <el-button type="primary">
          浏览
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            单个文件不超过20M，最多可上传5个，默认识别第一个sheet
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="示例表下载">
      <el-button link type="primary">
        示例表.xlsx
      </el-button>
    </el-form-item>
  </el-form>
  <div v-if="active === 1" />
  <el-form v-if="active === 2" :model="saveParams" class="mt-6">
    <el-form-item label="数据名称">
      <el-input v-model="saveParams.dataName" placeholder="请输入数据名称" clearable />
    </el-form-item>
    <el-form-item label="数据来源">
      <el-input v-model="saveParams.dataSource" placeholder="请输入数据来源" clearable />
    </el-form-item>
    <el-form-item label="业务类型">
      <el-select v-model="saveParams.topic" clearable class="w-full">
        <el-option v-for="topic in business_type" :key="topic.value" :label="topic.label" :value="topic.value" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
})

// step1
const documentParams = ref({
  importModel: '1',
  documentType: 'excel',
  fileList: [],
})

// step2

// step3
const { proxy } = getCurrentInstance()
const { business_type } = proxy.useDict('business_type')

const saveParams = ref({
  dataName: '',
  dataSource: '',
  topic: '1',
})

const resetUploadData = () => { }

defineExpose({
  resetUploadData,
})
</script>

<style lang="scss" scoped>
</style>
