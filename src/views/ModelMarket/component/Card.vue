<!--
 * @Author: wanglu
 * @Date: 2023-07-24 19:29:18
 * @LastEditors: Wang Lu
 * @LastEditTime: 2024-06-03 15:45:55
 * @Description:
-->
<template>
  <el-card class="box-card">
    <div class="box-card__img pa-1">
      <el-image
        class="box-card__img--image"
        :src="`${baseUrl}${card.picture}`"
      />
    </div>
    <p class="box-card__title py-1" :title="card.name">
      {{ card.name }}
    </p>
    <div class="box-card__text">
      <p class="box-card__text--description" :title="str">
        {{ str }}
      </p>

      <span class="box-card__text--label p-1">
        {{ card.businessType }}
      </span>

      <p class="box-card__text--provider mt-2 mb-1">
        {{ card.address || "XXX检察院" }}
      </p>
    </div>
    <div class="box-card__operator flex justify-between items-center mt-4">
      <div class="box-card__operator--icon">
        <el-tooltip
          class="box-item"
          effect="light"
          content="订阅次数"
          placement="top"
        >
          <img
            class="box-card__operator--iconNum-icon"
            :src="
              card.subscribeStatus === 1
                ? '/images/lh/orderLightIcon.svg'
                : '/images/lh/orderIcon.svg'
            "
          />
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
          <img
            class="box-card__operator--iconNum-icon"
            :src="
              card.collectStatus === 1
                ? '/images/lh/starLightIcon.svg'
                : '/images/lh/starIcon.svg'
            "
          />
        </el-tooltip>
        <div class="box-card__operator--iconNum-num">
          {{ card.collectNumber }}
        </div>
      </div>
      <div class="box-card__operator--icon">
        <el-tooltip
          class="box-item"
          effect="light"
          content="添加购物车"
          placement="top"
        >
          <i
            class="iconfont icon-maijiagouwuche color-blue font-size-3"
            style="transform: scale(1.5)"
            @click="addShopping"
          />
        </el-tooltip>
        <!-- <div v class="box-card__operator--iconNum-num">
          {{ card.publishDate }}
        </div> -->
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ElMessage } from "element-plus";

interface CardItem {
  id: number;
  productImg: string;
  title: string;
  describe: string;
  label: string;
  address: string;
  subscribeNumber: number;
  collectNumber: number;
  publishDate: string;
  subscribeStatus: number;
  collectStatus: number;
}
const props = defineProps<{
  card: CardItem;
}>();
const baseUrl = import.meta.env.VITE_APP_BASE_API;
function addShopping() {
  ElMessage({
    message: "购物车添加成功",
    type: "success",
  });
}
const str =
  "梳理本院受理的未成年人涉黄类案件发现，未成年人涉黄类案件中大多存在未成年人在宾馆、日租房内进行卖淫嫖娼活动或在KTV内进行有偿陪侍的情形。经审查发现，上述日租房、宾馆均存在未按规定落实未成年人入住询问、登记等制度，KTV等场所也未落实不允许未成年人进入的相关规定，严重侵害了未成年人的合法权益，同时也暴露出相关行政主管机关存在怠于履行监管职责的情形。\n通过筛查全国检察业务应用系统2.0涉黄类案件数据以及北京市公安局丰台分局治安违法案件数据发现宾馆、日租房、酒店等住宿经营者可能存在未落实未成年人入住询问、登记制度问题的违法线索。";

const introducesData = computed(() => {
  return props.card.introduces;
});
</script>

<style lang="scss" scoped>
.box-card {
  box-shadow: 0px 1px 10px 0px rgba(30, 45, 88, 0.12);

  &__img {
    overflow: hidden;
    height: 180px;

    &--image {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
    }

    &:hover > &--image {
      transform: scale(1.1);
      filter: contrast(120%);
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    color: #182859;
    line-height: 27px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

    &--label {
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
  &__operator {
    font-size: 16px;
    color: #7b89b7;
    &--icon {
      display: flex;
      justify-content: left;
      align-items: center;
    }
    &--iconNum-icon {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    &--iconNum-num {
      margin-left: 4px;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      opacity: 0.66;
    }
  }
}
</style>

