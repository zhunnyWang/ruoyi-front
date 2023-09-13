/*
 * @Author: Xueying Wang
 * @Date: 2022-12-02 10:00:22
 * @LastEditTime: 2023-09-13 17:23:02
 * @LastEditors: Xueying Wang
 * @Description: dialog类型组件的通用逻辑
 */
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

export default function useDialogModel(props, emit) {
  const modelValue = useVModel(props, 'modelValue', emit)
  const isActive = ref(false)

  watch(isActive, (val) => {
    modelValue.value = val
  })

  return {
    isActive,
  }
}
