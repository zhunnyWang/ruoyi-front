<!--
 * @Author: wanglu
 * @Date: 2023-07-24 19:29:18
 * @LastEditors: wanglu
 * @LastEditTime: 2023-07-25 10:23:24
 * @Description: 
-->
<template>
  <el-card class="box-card">
    <div class="box-card__img pa-1">
      <el-image
        class="box-card__img--image" 
        :src="props.card.productImg ? card.productImg : '/images/no-data.jpg'"
      />
    </div>
    <p class="box-card__title py-1">
      {{ card.title }}
    </p>
    <div class="box-card__text">
      <p class="box-card__text--description" :title="card.describe">
        {{ card.describe }}
      </p>

      <span class="box-card__text--label p-1">
        {{ card.label }}
      </span>

      <p class="box-card__text--provider mt-2 mb-1">
        {{ card.address }}
      </p>
    </div>
    <div class="box-card__operator flex justify-between  items-center mt-4">
      <div class="box-card__operator--icon">
          <el-tooltip
            class="box-item"
            effect="light"
            content="订阅次数"
            placement="top"
          >
          <img class="box-card__operator--iconNum-icon"  :src="card.subscribeStatus === 1 ? '/images/lh/orderLightIcon.svg' :'/images/lh/orderIcon.svg'">
          </el-tooltip>
          <div class="box-card__operator--iconNum-num">
            {{ card.subscribeNumber }}
          </div>
        </div>
        <div class="box-card__operator--icon">
          <el-tooltip
            class="box-item"
            effect="light"
            content="收藏次数"
            placement="top"
          >
          <img class="box-card__operator--iconNum-icon"  :src="card.collectStatus === 1 ? '/images/lh/starLightIcon.svg' :'/images/lh/starIcon.svg'">
          </el-tooltip>
          <div class="box-card__operator--iconNum-num">
            {{ card.collectNumber }}
          </div>
        </div>
        <div class="box-card__operator--icon">
          <el-tooltip
            class="box-item"
            effect="light"
            content="上架时间"
            placement="top"
          >
            <el-icon class="box-card__operator--iconNum-icon">
              <Clock />
            </el-icon>
          </el-tooltip>
          <div class="box-card__operator--iconNum-num">
            {{ card.publishDate }}
          </div>
        </div>

    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface CardItem {
  id: number
  productImg:string
  title:string
  describe:string
  label:string
  address:string
  subscribeNumber:number
  collectNumber:number
  publishDate:string
  subscribeStatus:number
  collectStatus:number
}

const props = defineProps<{
  card: CardItem
}>()

// const prefix = computed(() => {
//   // return `${import.meta.env.MODE === 'development' ? import.meta.env.VITE_APP_API_BASE_URL : (window as any).config.VITE_APP_API_BASE_URL}/ocp/users/downloadAvatar?fileName=`
// })
</script>

<style lang="scss" scoped>
.box-card {
  box-shadow: 0px 1px 10px 0px rgba(30, 45, 88, 0.12);

  &__img {
    overflow: hidden;
    height: 130px;

    &--image {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
    }

    &:hover>&--image {
      transform: scale(1.1);
      filter: contrast(120%);
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    color: #182859;
    line-height: 27px;
    white-space: nowrap;
    overflow-x: auto;
  }

  &__text {
    &--description {
      font-size: 14px;
      font-weight: 400;
      color: #7b89b7;
      line-height: 22px;
      min-height: 66px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      -webkit-line-clamp: 3; //这个属性需要同上面两个属性一起使用，表示显示的行数。
    }

    &--label{
      background-color: #e8e8ea;
      font-size: 12px;
      color: #02091f;
    }

    &--provider {
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #46568f;
      line-height: 21px;
    }
  }
  &__operator{
    font-size: 16px;
    color: #7b89b7;
    &--icon{
      display: flex;
      justify-content: left;
      align-items: center
    }
    &--iconNum-icon{
      width: 16px;
      height: 16px
    }
    &--iconNum-num{
      margin-left: 4px;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      opacity: 0.66
    }

  }
}
</style>

