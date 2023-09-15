<!--
 * @Author: Xueying Wang
 * @Date: 2023-09-14 16:03:28
 * @LastEditors: Xueying Wang
 * @Description: description
-->
<template>
  <div class="flex">
    <el-input v-model="modelValue" clearable :placeholder="placeholder" class="mr-2" @clear="handleClear" />
    <el-button icon="Search" type="primary" @click="setFilterText">
      搜索
    </el-button>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  inputText: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入关键字',
  },
})

const emit = defineEmits(['update:modelValue', 'update:inputText'])

const modelValue = useVModel(props, 'modelValue', emit)
const inputText = useVModel(props, 'inputText', emit)

const setFilterText = () => {
  inputText.value = modelValue.value
}

function handleClear() {
  inputText.value = ''
}
</script>
