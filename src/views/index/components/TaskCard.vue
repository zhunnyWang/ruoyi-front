<!--
 * @Author: wanglu
 * @Date: 2023-09-14 16:28:56
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-15 11:12:31
 * @Description:
-->
<template>
  <div class="box">
    <div class="box-title h-/3" :style="{ backgroundColor: data.color }">
      {{ data.title }}
    </div>
    <div class="flex items-center justify-center h-2/3">
      <div class="flex-1  flex flex-col items-center justify-center">
        <span>数量</span>
        <span class="text-10">{{ data.num }}</span>
      </div>
      <div class="flex-1 flex items-center justify-center p-3">
        <div class="row rel">
          <div class="left">
            <div id="left" ref="left" class="leftCon" :style="{ backgroundColor: data.color }" />
          </div>
          <div class="right">
            <div id="right" ref="right" class="rightCon" :style="{ backgroundColor: data.color }" />
          </div>
          <div class="circle" />
          <div class="centerCircle">
            {{ data.num }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  data: {},
})
const left = ref(null)
const right = ref(null)
onMounted(() => {
  const count = props.data.num
  const totalcount = 100
  left.value.style.transform = `rotate(${getLeftPercent(count, totalcount)}deg)`
  right.value.style.transform = `rotate(${getRightPercent(count, totalcount)}deg)`
})

function getLeftPercent(count, totalcount) {
  if (totalcount === 0 || count === 0 || count / totalcount <= 0.5)
    return -180

  else
    return 180 * (((count / totalcount - 0.5) * 2) - 1)
}
function getRightPercent(count, totalcount) {
  if (totalcount === 0 || count === 0)
    return -180

  else if (count / totalcount >= 0.5)
    return 0

  else
    return 180 * (((count / totalcount) * 2) - 1)
}
</script>

<style lang='scss' scoped>
.box{
  border:1px solid rgb(188, 189, 188);
  &-title{
    font-size: 20px;
    color:white;
    padding: 5px;
  }
}
.left,.right {
    width: 50px;
    height: 100px;
    background: rgb(204, 204, 192);
    overflow: hidden;
}

.left {
    border-radius: 50px 0 0 50px;
}

.right {
    border-radius: 0 50px 50px 0;
}

.rightCon {
    width: 50px;
    height: 100px;
    border-radius: 0 100px 100px 0;
    transform: rotate(-120deg);
    transform-origin: left center;
}

.leftCon {
    width: 50px;
    height: 100px;
    border-radius: 50px 0px 0px 50px;
    transform: rotate(20deg);
    transform-origin: right center;
}

.circle {
    width: 90px;
    height: 90px;
    position: absolute;
    left: 5px;
    top: 5px;
    border-radius: 50%;
    background: rgb(251, 252, 251);
}
.rel {
    position: relative;
}
.row {
    display: flex;
    flex-direction: row;
}
.centerCircle {
  position     : absolute;
  border-radius: 50%;
  width        : 80px;
  height       : 80px;
  transform    : translate(10px, 10px);
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
