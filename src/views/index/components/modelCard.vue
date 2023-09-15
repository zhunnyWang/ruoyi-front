<!--
 * @Author: wanglu
 * @Date: 2023-09-14 13:59:11
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-14 16:22:12
 * @Description:
-->
<template>
  <div class="box">
    <div class="flex justify-between mb-2">
      <div>
        <i class="iconfont  icon-biaoshimoxing" style="color:blue" />
        <span class="font-550 pl-2">{{ data.title }}</span>
      </div>
      <div>
        <span class="items-end  color-blue">编辑</span>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div class="text-4 font-200 pb-2">
        <span class="font-500">创建人</span>
        <span class="pl-3">{{ data.createPeople }}</span>
      </div>
      <div class="text-4 font-200 pb-2">
        <span class="font-500">创建时间</span>
        <span class="pl-3">{{ data.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {},
})
</script>

<style lang='scss' scoped>
.box{
  border:1px #999 solid ;
  padding: 2px 5px;
  &-des{
    display: flex;
    flex-direction: column;
    color:red
  }
}
</style>
