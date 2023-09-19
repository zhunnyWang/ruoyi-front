<template>
  <div class="box">
    <div class="box-img">
      <img src="/images/modelMarket-1.png" class="img">
    </div>
    <div class="box-des">
      <div class="box-des-title">
        {{ data.title }}
      </div>
      <div class="box-des-text">
        {{ data.text }}
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
    background: #f7f5f5;
    border:1px solid rgb(216, 215, 215);
    width:100%;
    height: auto;
    display: flex;
    height:74px;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
  .box-img{
    width: 64px;
    height: 64px;
    background: #FFFFFF;
    box-shadow: 0 1px 10px rgba(0,40,94,0.16);
    border-radius: 3px;
    margin-left: 10px;
    .img {
      height: 64px;
      width: 64px;
    }
  }
  .box-des{
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    .box-des-title{
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .box-des-text{
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      height: 16px;
      line-height: 15px;
      margin-top: 12px;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
}
</style>
