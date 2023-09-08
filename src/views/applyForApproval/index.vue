<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Xueying Wang
 * @LastEditTime: 2023-09-08 14:46:56
 * @Description: 申请审批
-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="审批状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="" clearable style="width: 200px">
          <el-option v-for="dict in approve_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批事项" prop="stepType">
        <el-select v-model="queryParams.stepType" placeholder="" clearable style="width: 200px">
          <el-option v-for="dict in approve_items" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="auditList">
      <el-table-column type="index" width="50" />
      <el-table-column label="审批事项" align="center" prop="stepType" />
      <el-table-column label="审批状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="approve_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" icon="Edit" @click="handleView(scope.row)"
            v-hasPermi="['system:audit:edit']">查看</el-button>
          <el-button type="text" icon="DocumentChecked" @click="handleAudit(scope.row)"
            v-hasPermi="['system:audit:remove']">审批</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script setup name="Audit">
import { listAudit, getAudit, delAudit, addAudit, updateAudit } from "@/api/system/audit"

const { proxy } = getCurrentInstance();
const { approve_status } = proxy.useDict("approve_status");
const { approve_items } = proxy.useDict("approve_items");

const loading = ref(true);
// 显示搜索条件
const showSearch = ref(true);
// 总条数
const total = ref(0);
// 审批表格
const auditList = ref([]);
// 弹出层
const open = ref(false)
// 查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
})
// 表单参数
const form = ref({})
// 表单校验
const rules = ref({})

/** 查询审批列表 */
function getList() {
  loading.value = true;
  listAudit(queryParams.value).then(response => {
    auditList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

/** 表单重置 */
function reset() {
  form.value = {
    id: null,
    businessId: null,
    stepType: null,
    status: null,
    auditor: null,
    auditTime: null,
    suggestion: null,
    remark: null
  };
  proxy.resetForm("queryRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

function handleView(row) {
  console.log(row)
}

function handleAudit(row) {
  console.log(row)
}

onMounted(async () => {
  await getList()
})
</script>
