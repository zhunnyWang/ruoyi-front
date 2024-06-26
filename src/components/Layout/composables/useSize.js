/*
 * @Author: Xueying Wang
 * @Date: 2023-09-12 11:15:05
 * @LastEditors: Xueying Wang
 * @Description: description
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

/**
 * @description: 获取当前组件的宽高等信息
 * @param {*}
 * @return {*} root 当前组件的 root 元素
 * @return {*} width 当前组件的宽度
 * @return {*} height  当前组件的高度
 */
export default function useSize(observeCB = () => {}) {
  const root = ref(document.createElement('div'))
  const width = ref(0)
  const height = ref(0)

  const [debounceReCompute] = useDebounce(() => {
    if (root.value) {
      width.value = root.value.offsetWidth
      height.value = root.value.offsetHeight
      observeCB()
    }
  }, 200)

  const mutation = new MutationObserver(() => {
    debounceReCompute()
  })

  watch(
    () => root.value,
    () => {
      if (root.value)
        mutation.observe(root.value, { childList: true, subtree: true, attributes: true })
    },
  )

  onBeforeUnmount(() => {
    mutation.disconnect()
  })

  return {
    root,
    width,
    height,
  }
}
