import { useThrottle } from '@/composables/useThrottle'

/**
 * @description: Applicable in components
 */
export function useDebounce(
  handle,
  wait,
  options = {},
) {
  return useThrottle(
    handle,
    wait,
    Object.assign(options, {
      debounce: true,
    }),
  )
}
