<template>
  <div ref="root" class="layout-h-item overflow-auto" :class="[flexClass, { 'flex-1': rest }]" :style="style">
    <slot :width="width" :height="height" />
  </div>
</template>

<script>
import { computed, defineComponent, inject, ref } from 'vue'
import { useGapInject } from '../../composables/useGap'
import useSize from '../../composables/useSize'

export default defineComponent({
  name: 'LayoutHItem',
  provide() {
    return {
      setFlex: this.setFlex,
    }
  },
  props: {
    rest: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { gap } = useGapInject()
    const { root, width, height } = useSize()

    const firstEl = inject('firstEl', ref(null))
    const isFirst = computed(() => firstEl.value === root.value || !root.value.previousElementSibling)

    return {
      gap,
      root,
      width,
      height,
      isFirst,
    }
  },
  data() {
    return {
      flexClass: '',
    }
  },
  computed: {
    style() {
      const obj = {}
      if (!this.isFirst)
        obj.marginLeft = `${this.gap}px`

      return obj
    },
  },
  methods: {
    setFlex() {
      this.flexClass = 'flex'
    },
  },
})
</script>
