<!--
 * @Author: Xueying Wang
 * @Date: 2022-11-23 14:51:24
 * @LastEditTime: 2023-09-13 17:28:48
 * @LastEditors: Xueying Wang
 * @Description: 可远程请求的Dialog封装
-->
<template>
  <slot name="activator" :on="on" />
  <el-dialog v-model="isActive" v-bind="attrs">
    <el-skeleton :loading="isLoading" :row="5" animated />
    <template v-if="!isLoading" #default>
      <slot :loading="isLoading" :hide="hide" :info="info" />
    </template>
    <template #header>
      <slot name="header" :loading="isLoading" :hide="hide" :info="info" />
    </template>
    <template #footer>
      <slot name="footer" :loading="isLoading" :hide="hide" :info="info" />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import useDialogModel from '../../composables/useDialogModel'

const props = defineProps({
  factory: {
    type: Function,
    default: () => Promise.resolve([]),
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const isLoading = ref<boolean>(true)
const info: Record<string, any> = ref({})
const { isActive } = useDialogModel(props, emit)

async function on() {
  isActive.value = true
  isLoading.value = true
  try {
    info.value = await props.factory()
    isLoading.value = false
  }
  catch (error) {
    return Promise.reject(error)
  }
}

function hide() {
  isActive.value = false
}

defineExpose({
  hide,
})
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>
