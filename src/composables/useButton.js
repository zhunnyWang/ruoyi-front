/*
 * @Author: Xueying Wang
 * @Date: 2023-09-08 15:06:47
 * @LastEditors: Xueying Wang
 * @Description: description
 */
import { ref } from 'vue'

export function useButton(service) {
  const loading = ref(false)

  const onClick = () => {
    loading.value = true
    return service()
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loading,
    onClick,
  }
}
