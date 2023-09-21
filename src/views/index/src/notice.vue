<!--
 * @Author: wanglu
 * @Date: 2023-09-20 13:40:55
 * @LastEditors: wanglu
 * @LastEditTime: 2023-09-21 09:24:43
 * @Description:
-->
<template>
  <el-card class="notice">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-800">消息通知</span>
        <!-- <div class="font-500 color-blue flex items-center  cursor-pointer">
          更多通知<el-icon><DArrowRight /></el-icon>
        </div> -->
        <!-- <Dialog title="消息通知">
          <template #activator="{ on }">
            <div class="font-500 color-blue flex items-center  cursor-pointer" @click="on">
              更多通知<el-icon><DArrowRight /></el-icon>
            </div>
          </template>
          <template #default>
            <div v-for="(item, index) in data" :key="index" class="noticeBox">
              <span class="noticeItem">
                {{ index + 1 }} {{ item }}
              </span>
            </div>
          </template>
          <template #footer="{ hide }">
            <el-button @click="hide">
              关闭
            </el-button>
          </template>
        </Dialog> -->
      </div>
    </template>
    <div>
      <div v-for="(item, index) in data" :key="index" class="noticeBox">
        <span class="noticeItem">
          {{ index + 1 }}: {{ item.noticeTitle }}
        </span>
      </div>
      <div class="font-500 color-blue flex justify-end items-center  cursor-pointer">
        更多通知<el-icon><ArrowDown /></el-icon>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { listNotice } from '@/api/system/notice.js'

// import Dialog from '@/components/Dialog'

const data = ref([])
onMounted(() => {
  listNotice().then((res) => {
    data.value = res.rows
  })
})
</script>

<style lang='scss' scoped>
.notice{
  overflow-y: auto;

}
.noticeBox{
  width: 100%;
  .noticeItem{
    font-weight: 400;
    padding: 1px 0;
    cursor: pointer;
  }
}
</style>
