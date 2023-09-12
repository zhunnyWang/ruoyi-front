/*
 * @Author: Xiaofei Li
 * @Date: 2022-04-21 00:39:00
 * @Description:
 */

export function throttle(
  handle,
  wait,
  options = {},
) {
  if (typeof handle !== 'function')
    throw new Error('handle is not Function!')

  let { immediate = false } = options
  const { once = false, debounce = false } = options
  let timeoutId
  let cancelled = false

  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
  }
  /** cancel exec */
  function cancel() {
    clearTimer()
    cancelled = true
  }
  // If once is true, only execute once
  function cancelExec() {
    once && cancel()
  }

  function fn(e, ...args) {
    // If it has been cancelled, it will not be executed
    if (cancelled)
      return

    const exec = () => {
      !debounce && clearTimer()
      handle.apply(e, args)
      cancelExec()
    }
    if (immediate) {
      immediate = false
      const callNow = !timeoutId
      if (callNow) {
        exec()
        timeoutId = null
      }
    }
    else {
      debounce && clearTimer()
      if (!timeoutId || debounce)
        timeoutId = setTimeout(exec, wait)
    }
  }
  return [fn, cancel]
}

export function useThrottle(
  handle,
  wait,
  options = {},
) {
  return throttle(handle, wait, options)
}
