/*
 * @Author: Xueying Wang
 * @Date: 2023-09-12 11:15:05
 * @LastEditors: Xueying Wang
 * @Description: description
 */
import { inject, provide, readonly, ref } from 'vue'

/**
 * @description: 提供给子组件的 provide
 * @param {Ref} gap 子元素的间隔
 * @return {*}
 */
export function useGapProvide(gap) {
  provide('gap', readonly(gap))
}

/**
 * @description: inject，获取父组件的间距
 * @param {*}
 * @return {*} gap 父类提供的间隔距离，只读响应式
 */
export function useGapInject() {
  return {
    gap: inject('gap', readonly(ref(10))),
  }
}
