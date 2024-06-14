<!--
 * @Author: Ruixia Lv
 * @Date: 2023-09-21 16:25:36
 * @LastEditTime: 2024-06-14 09:37:32
 * @LastEditors: Ruixia Lv
 * @Description: description
-->
<template>
  <div>
    <div class="container">
      <div class="title">
        1.网约车驾驶员签约信息。
      </div>
      <el-table v-loading="infoLoading" :data="infoData" height="200" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column label="司机姓名" align="center" prop="name" />
        <el-table-column label="性别" align="center" prop="sex" />
        <el-table-column label="身份证号" align="center" prop="idCard" />
        <el-table-column label="家庭住址" align="center" prop="address" />
        <el-table-column label="签约时间" align="center" prop="signTime" />
        <el-table-column label="驾驶证类型" align="center" prop="licenseType" />
        <el-table-column label="驾驶证获证时间" align="center" prop="driverTime" />
      </el-table>
      <el-divider class="mt-5 mb-2" />
      <div class="title">
        2、统一业务应用系统交通肇事罪、危险驾驶罪犯罪记录。
      </div>
      <el-table v-loading="recordLoading" :data="recordData" height="150" border class="mb-6">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column label="嫌疑人姓名" align="center" prop="name" />
        <el-table-column label="性别" align="center" prop="sex" />
        <el-table-column label="身份证号" align="center" prop="idCard" />
        <el-table-column label="案由" align="center" prop="reason" />
        <el-table-column label="犯罪记录时间" align="center" prop="recordTime" />
        <el-table-column label="案号" align="center" prop="reference" />
        <el-table-column label="文书" align="center" prop="document">
          <template #default="scope">
            <el-button type="primary" text @click="handleCheck(scope.row.document)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="conclusion">
      <span>研判结论</span>
      <el-radio-group v-model="radioValue" class="ml-4">
        <el-radio label="无效线索" size="large">
          无效线索
        </el-radio>
        <el-radio label="有效线索" size="large">
          无效线索
        </el-radio>
      </el-radio-group>
      <el-input
        v-model="textValue"
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
      <div class="flex justify-center">
        <el-button type="primary" @click="staging">
          暂存
        </el-button>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
const infoLoading = ref(false)
const infoData = [
  {
    name: '张某某',
    sex: '男',
    idCard: '110123197701122110',
    address: '北京市海淀区XX街道XX小区一单元',
    signTime: '2022-05-05',
    licenseType: 'C1',
    driverTime: '2022-05-05',
  },
  {
    name: '张某某',
    sex: '男',
    idCard: '110123197701122110',
    address: '北京市海淀区XX街道XX小区一单元',
    signTime: '2022-05-05',
    licenseType: 'C1',
    driverTime: '2022-05-05',
  },
  {
    name: '张某某',
    sex: '男',
    idCard: '110123197701122110',
    address: '北京市海淀区XX街道XX小区一单元',
    signTime: '2022-05-05',
    licenseType: 'C1',
    driverTime: '2022-05-05',
  },
]

const recordData = [
  {
    name: '张某某',
    sex: '男',
    idCard: '110123197701122110',
    reason: '危险驾驶罪',
    recordTime: '2022-05-05',
    reference: 'BJHDXSJX202200013',
    document: '',
  },
  {
    name: '张某某',
    sex: '男',
    idCard: '110123197701122110',
    reason: '危险驾驶罪',
    recordTime: '2022-05-05',
    reference: 'BJHDXSJX202200013',
    document: '',
  },
  {
    name: '张某某',
    sex: '男',
    idCard: '110123197701122110',
    reason: '危险驾驶罪',
    recordTime: '2022-05-05',
    reference: 'BJHDXSJX202200013',
    document: '',
  },
]
const recordLoading = ref(false)

const radioValue = ref('')

const textValue = ref('')

function staging() {
  proxy.$modal.confirm('点击了暂存按钮').then(() => {
    console.log('点击了确定按钮')
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}

function submit() {
  proxy.$modal.confirm('点击了提交按钮').then(() => {
    console.log('点击了确定按钮')
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}

function handleCheck(params) {
  window.open(`https://${params}`)
}
</script>

<style lang="scss" scoped>
.container{
  padding-left: 60px;
  padding-right: 20px;
  height: 450px;
  overflow-y: auto;
  .title{
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    color: #0281b6;
  }
}
.conclusion{
  padding: 10px 50px;
  height: 180px;
  border: 1px solid #797979;
  background-color: #f2f2f2;
  .el-textarea{
    margin: 10px 30px;
  }
}
</style>
