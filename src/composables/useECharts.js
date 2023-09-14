/*
 * @Author: yangming
 * @LastEditTime: 2023-09-12 14:55:48
 * @Description:
 */
import { tryOnUnmounted } from '@vueuse/core'
import { Ref } from 'vue'
import { nextTick, shallowRef, unref, watchEffect } from 'vue'
import { echarts } from '@statistics/components'
import { useTimeoutFn } from './core/useTimeout'
import { useDebounce } from './core/useDebounce'
import { useEventListener } from './event/useEventListener'
import { useBreakpoint } from './event/useBreakpoint'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light',
) {
  const chartInstance = shallowRef<echarts.ECharts | null>(null)
  let resizeFn: Fn = resize
  let removeResizeFn: Fn = () => {}

  const [debounceResize] = useDebounce(resize, 200)
  resizeFn = debounceResize

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el))
      return

    chartInstance.value = echarts.init(el, theme)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options, clear = true) {
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(options)
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance.value) {
          initCharts()

          if (!chartInstance.value) return
        }
        clear && chartInstance.value?.clear()

        chartInstance.value?.setOption(options)
      }, 30)
    })
  }

  function resize() {
    useTimeoutFn(() => {
      chartInstance.value?.resize()
    }, 30)
  }

  tryOnUnmounted(() => {
    if (!chartInstance.value) return
    removeResizeFn()
    chartInstance.value.dispose()
    chartInstance.value = null
  })

  // 元素变化时 resize
  const resizeObserve = new ResizeObserver(() => {
    useTimeoutFn(() => {
      chartInstance.value?.resize()
    }, 30)
  })
  watchEffect(() => {
    if (elRef.value && elRef.value.parentElement)
      resizeObserve.observe(elRef.value.parentElement)
  })

  return {
    setOptions,
    resize: resizeFn,
    echarts,
    chartInstance,
  }
}
