<template>
  <div class="select-tags">
    <section class="title">
      <span :title="conditionData.title">{{ conditionData.title }}</span> 
    </section>
    <section class="content">
      <!-- 默认选项 -->
      <div v-if="defaultOption.label" class="zlc-tag-wrap">
        <span
          class="zlc-tag flex-row"
          :class="{'zlc-tag__checked': defaultOption.checked}"
          @click.stop="handleSelectDefault"
        >
          <span class="text-ellipsis">{{ defaultOption.label }}</span>
        </span>
      </div>
      <!-- 实际选项 -->
      <div v-for="(tag, index) in tagList" :key="index" class="zlc-tag-wrap">
        <span
          class="zlc-tag flex-row"
          :class="{'zlc-tag__checked': tag.checked}"
          :title="tag.label"
          @click.stop="handleSelect(tag)"
        >
          <span class="text-ellipsis">{{ tag.label }}</span>
        </span>
      </div>
    </section>
  </div>
</template>

<script >
import { cloneDeep } from 'lodash'

export default {
  filters: {
    filterTitle(str) {
      if (!str) {
        return '--'
      } else if (str.length > 6) {
        return str.slice(0, 2) + '...' + str.slice(-3)
      } else {
        return str
      }
    }
  },
  props: {
    conditionData: {
      type: Object,
      default: () => {}
    },
    default: {
      type: Object,
      default: () => {}
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultOption: {},
      tagList: [],
      modelValue: [],
      changeValue: []
    }
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  watch: {
    '$route.params'() {
      this.init()
    }
  },
  created() {
    this.defaultOption = cloneDeep(this.default)
    this.init()
  },
  methods: {
    init() {
      const queryValue = this.query[this.conditionData.name]
      const tags = cloneDeep(this.conditionData.list)
      let selectedValue
      // 多选时
      if (this.multiple) {
        if (queryValue) {
          selectedValue = queryValue.split(',')
          this.defaultOption.checked = false
          this.tagList = tags.map(v => {
            v.checked = selectedValue.some(u => u === v.value)
            return v
          })
        } else {
          this.defaultOption.checked = true
          this.tagList = tags.map(v => {
            v.checked = false
            return v
          })
        }
      }
      // 仅单选
      else {
        if (queryValue) {
          selectedValue = queryValue
          this.defaultOption.checked = false
          this.tagList = tags.map(v => {
            v.checked = v.value === selectedValue
            return v
          })
        } else {
          this.defaultOption.checked = true
          this.tagList = tags.map(v => {
            v.checked = false
            return v
          })
        }
      }
    },

    handleSelectDefault() {
      if (!this.defaultOption.checked) {
        this.defaultOption.checked = true
        this.tagList = this.tagList.map(u => {
          u.checked = false
          return u
        })
        this.updateValue()
      }
    },

    handleSelect(tag) {
      if (this.multiple) {
        tag.checked = !tag.checked
        this.updateValue()
      } else if (!tag.checked) {
        this.tagList = this.tagList.map(u => {
          u.checked = u.value === tag.value
          return u
        })
        this.updateValue()
      }
    },

    updateValue() {
      const _checked = this.tagList.filter(v => {
        return !!v.checked
      })
      
      this.modelValue = _checked.map(v => v.value)
      this.changeValue = _checked.map(v => {
        return {
          label: v.label,
          value: v.value
        }
      })
      
      this.defaultOption.checked = this.modelValue.length === 0
      this.$router.push({
        query: {
          ...this.query,
          [this.conditionData.name]: this.modelValue.length === 0 ? undefined : this.modelValue.join(',')
        }
      }).catch(() => {})
      // this.$emit('input', this.modelValue)
      // this.$emit('change', this.modelValue)
      this.$emit('change')
    }
  }
}
</script>
<style lang="scss" scoped>
.select-tags {
  display: flex;
  align-items: baseline;
  position: relative;
  padding: 8px 0;
  .title{
    width: 100px; 
    font-weight: 600;
    color: #999;
  }
  .zlc-tag-wrap {
    width: 140px;
    display: inline-block;
    .zlc-tag {
      max-width: 220px;
      margin: 10px;
      padding: 5px 10px;
      // border-radius: 10px;
      background-color:#f1f2f3;
      cursor: pointer;
      font-size: 15px;
      &.zlc-tag__checked {
        color: #fff;
        background-color:#7ab9e5 ;
      }
    }
  }
}

</style>

<!-- <style lang="stylus" scoped>
@import '../../@styles/_vars.styl'

.select-tags {
  display flex
  align-items baseline
  position relative
  padding: rem(4) 0
  .title{
    width: rem(100)
    font-weight 600
    color: #999
  }
  .zlc-tag-wrap {
    width: rem(140)
    display: inline-block
    .zlc-tag {
      max-width fit-content
      margin: rem(8) rem(16) rem(8) 0
      padding: rem(2) rem(10)
      border-radius: rem(20)
      cursor: pointer
      font-size: rem(13)
      &.zlc-tag__checked {
        color: #fff
        background-color $primary-theme
      }
    }
  }
}
</style> -->

