<template>
  <div class="px-10">
    <p class="font-bold mb-0">
      模型基本信息
    </p>
    <el-divider />
    <el-form ref="form" :model="formData" :rules="rules" size="default" label-width="150px" label-position="left">
      <layout-h>
        <layout-h-item class="w-1/3">
          <el-form-item label="模型编号" prop="id">
            <el-input v-model="formData.id" placeholder="请输入模型编号" clearable />
          </el-form-item>
        </layout-h-item>
        <layout-h-item class="w-1/3">
          <el-form-item label="业务类型" prop="businessType">
            <el-select v-model="formData.businessType" placeholder="请选择业务类型" clearable class="w-full">
              <el-option
                v-for="(item, index) in businessTypeOptions" :key="index" :label="item.label" :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </layout-h-item>
        <layout-h-item class="w-1/3">
          <el-form-item label="监督类型" prop="supervisionType">
            <el-select v-model="formData.supervisionType" placeholder="请选择监督类型" clearable class="w-full">
              <el-option
                v-for="(item, index) in supervisionTypeOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </layout-h-item>
      </layout-h>
      <layout-h>
        <layout-h-item class="w-1/3">
          <el-form-item label="模型名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入模型名称" clearable />
          </el-form-item>
        </layout-h-item>
        <layout-h-item class="w-1/3">
          <el-form-item label="设计单位" prop="register">
            <el-input v-model="formData.register" placeholder="请输入设计单位" clearable />
          </el-form-item>
        </layout-h-item>
        <layout-h-item class="w-1/3">
          <el-form-item label="日期选择" prop="time">
            <el-date-picker
              v-model="formData.time" class="w-full" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              placeholder="请选择日期选择" clearable
            />
          </el-form-item>
        </layout-h-item>
      </layout-h>
      <layout-h>
        <layout-h-item class="w-1/3">
          <el-form-item label="是否为迭代模型" prop="isModel">
            <el-radio-group v-model="formData.isModel" size="default">
              <el-radio
                v-for="(item, index) in isModelOptions" :key="index" :label="item.value"
                :disabled="item.disabled"
              >
                {{
                  item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </layout-h-item>
        <layout-h-item class="w-1/3">
          <el-form-item label="模型版本" prop="version">
            <el-input v-model="formData.version" placeholder="请输入模型版本" clearable />
          </el-form-item>
        </layout-h-item>
      </layout-h>

      <el-form-item label="业务场景" prop="businessScene">
        <el-input
          v-model="formData.businessScene" type="textarea" placeholder="请输入业务场景"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item label="类案办理和监督效果" prop="effect">
        <el-input
          v-model="formData.effect" type="textarea" placeholder="请输入类案办理和监督效果"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item label="社会治理成效" prop="effectiveness">
        <el-input
          v-model="formData.effectiveness" type="textarea" placeholder="请输入社会治理成效"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
      <p class="font-bold mb-0">
        模型详细信息
      </p>
      <el-divider />
      <el-form-item label="监督依据" prop="accordance">
        <el-input
          v-model="formData.accordance" type="textarea" placeholder="请输入监督依据"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-input
          v-model="formData.dataSource" type="textarea" placeholder="请输入数据来源"
          :autosize="{ minRows: 4, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item label="监督规则" prop="rule">
        <el-input v-model="formData.rule" type="textarea" placeholder="请输入监督规则" :autosize="{ minRows: 4, maxRows: 4 }" />
      </el-form-item>
    </el-form>
    <div :class="`conclusion ${isCollapse ? 'conclusion-active-width' : 'conclusion-width'}`">
      <el-button type="primary" @click="submitForm">
        保存
      </el-button>
      <el-button type="primary" @click="resetForm">
        提交
      </el-button>
    </div>
  </div>
</template>

<script setup>
import useAppStore from '@/store/modules/app'

const form = ref(null)
const formData = reactive({
  id: undefined,
  businessType: '',
  supervisionType: '',
  name: undefined,
  register: undefined,
  time: null,
  isModel: undefined,
  version: undefined,
  businessScene: undefined,
  effect: undefined,
  effectiveness: undefined,
  accordance: undefined,
  dataSource: undefined,
  rule: undefined,
})
const rules = reactive({
  id: [{
    required: true,
    message: '请输入模型编号',
    trigger: 'blur',
  }],
  businessType: [{
    required: true,
    message: '请选择业务类型',
    trigger: 'change',
  }],
  supervisionType: [{
    required: true,
    message: '请选择监督类型',
    trigger: 'change',
  }],
  name: [{
    required: true,
    message: '请输入模型名称',
    trigger: 'blur',
  }],
  time: [{
    required: true,
    message: '请选择日期选择',
    trigger: 'change',
  }],
  register: [{
    required: true,
    message: '请输入设计单位',
    trigger: 'blur',
  }],
  isModel: [{
    required: true,
    message: '是否为迭代模型不能为空',
    trigger: 'change',
  }],
  version: [{
    required: true,
    message: '请输入模型版本',
    trigger: 'blur',
  }],
  businessScene: [{
    required: true,
    message: '请输入业务场景',
    trigger: 'blur',
  }],
  effect: [{
    required: true,
    message: '请输入类案办理和监督效果',
    trigger: 'blur',
  }],
  effectiveness: [{
    required: true,
    message: '请输入社会治理成效',
    trigger: 'blur',
  }],
  accordance: [{
    required: true,
    message: '请输入监督依据',
    trigger: 'blur',
  }],
  dataSource: [{
    required: true,
    message: '请输入数据来源',
    trigger: 'blur',
  }],
  rule: [{
    required: true,
    message: '请输入监督规则',
    trigger: 'blur',
  }],
})
const businessTypeOptions = ref([{
  label: '选项一',
  value: 1,
}, {
  label: '选项二',
  value: 2,
}])
const supervisionTypeOptions = ref([{
  label: '选项一',
  value: 1,
}, {
  label: '选项二',
  value: 2,
}])
const isModelOptions = ref([{
  label: '是',
  value: 'true',
}, {
  label: '否',
  value: 'false',
}])

function submitForm() {
  form.value.validate((valid) => {
    if (!valid) return
    // TODO 提交表单
  })
}

function resetForm() {
  form.value.resetFields()
}

const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened)
</script>

<style lang="scss" scoped>
.conclusion {
  padding: 10px 0;
  border: 1px solid #797979;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 4;
  transition: 0.2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}

.conclusion-width {
  width: calc(100% - 200px);
}

.conclusion-active-width {
  width: calc(100% - 54px);
}
</style>
