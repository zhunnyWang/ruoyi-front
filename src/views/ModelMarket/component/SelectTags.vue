<template>
  <div class="select-tags">
    <section class="title">
      <span :title="conditionData.title">{{ conditionData.title }}</span>
    </section>
    <section :class="`w-full ${arrowDown ? 'h-39px overflow-hidden' : ''}`">
      <!-- 实际选项 -->
      <el-row class="zlc-tag-row">
        <el-col
          v-for="(tag, index) in [defaultOption, ...tagList]" :key="index" class="zlc-tag mr-2 mb-2"
          :class="{ 'zlc-tag__checked': tag.checked }" :title="tag.label" :xs="12" :sm="6" :md="4" :lg="2" :xl="1"
          @click.stop="index === 0 ? handleSelectDefault() : handleSelect(tag)"
        >
          <span class="flex justify-center ">{{ tag.label }}</span>
        </el-col>
      </el-row>
    </section>
    <el-icon :class="`${arrowDown ? 'rotate-fade-reverse' : 'rotate-fade'} cursor-pointer block`">
      <ArrowDownBold @click="arrowDown = !arrowDown" />
    </el-icon>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  filters: {
    filterTitle(str) {
      if (!str)
        return '--'

      else if (str.length > 6)
        return `${str.slice(0, 2)}...${str.slice(-3)}`

      else
        return str
    },
  },
  props: {
    conditionData: {
      type: Object,
      default: () => { },
    },
    default: {
      type: Object,
      default: () => { },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultOption: {},
      tagList: [],
      modelValue: [],
      changeValue: [],
      arrowDown: true,
    }
  },
  computed: {
    query() {
      return this.$route.query
    },
  },
  watch: {
    '$route.params': function () {
      this.init()
    },
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
          this.tagList = tags.map((v) => {
            v.checked = selectedValue.includes(v.value)
            return v
          })
        }
        else {
          this.defaultOption.checked = true
          this.tagList = tags.map((v) => {
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
          this.tagList = tags.map((v) => {
            v.checked = v.value === selectedValue
            return v
          })
        }
        else {
          this.defaultOption.checked = true
          this.tagList = tags.map((v) => {
            v.checked = false
            return v
          })
        }
      }
    },

    handleSelectDefault() {
      if (!this.defaultOption.checked) {
        this.defaultOption.checked = true
        this.tagList = this.tagList.map((u) => {
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
      }
      else if (!tag.checked) {
        this.tagList = this.tagList.map((u) => {
          u.checked = u.value === tag.value
          return u
        })
        this.updateValue()
      }
    },

    updateValue() {
      const _checked = this.tagList.filter((v) => {
        return !!v.checked
      })

      this.modelValue = _checked.map(v => v.value)
      this.changeValue = _checked.map((v) => {
        return {
          label: v.label,
          value: v.value,
        }
      })

      this.defaultOption.checked = this.modelValue.length === 0
      this.$router.push({
        query: {
          ...this.query,
          [this.conditionData.name]: this.modelValue.length === 0 ? undefined : this.modelValue.join(','),
        },
      }).catch(() => { })
      // this.$emit('input', this.modelValue)
      // this.$emit('change', this.modelValue)
      this.$emit('change')
    },
  },
}
</script>

<style lang="scss" scoped>
.select-tags {
  display: flex;
  align-items: baseline;
  position: relative;
  padding: 8px 0;

  .title {
    min-width: 100px;
    font-weight: 600;
    color: #999;
  }

  .zlc-tag {
    min-width: 120px;
    padding: 5px 10px;
    background-color: #f1f2f3;
    cursor: pointer;
    font-size: 15px;

    &.zlc-tag__checked {
      color: #fff;
      background-color: #7ab9e5;
    }
  }
}

.rotate-fade {
  transform: rotate(180deg);
  transition: transform .25s linear;
}

.rotate-fade-reverse {
  transform: rotate(0deg);
  transition: transform .25s linear;
}
</style>
