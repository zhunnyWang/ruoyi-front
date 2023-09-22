<!--
 * @Author: wanglu
 * @Date: 2023-07-24 09:34:51
 * @LastEditors: Xueying Wang
 * @LastEditTime: 2023-09-22 15:46:07
 * @Description:
-->
<template>
  <layout-h class="p-2">
    <layout-h-item class="w-16rem">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="数据中心" name="1">
          <FileTree v-loading="dataCenterLoading" :data="dataCenter" />
        </el-collapse-item>
        <el-collapse-item title="共享数据" name="2">
          <FileTree v-loading="dataChangeLoading" :data="dataChange" />
        </el-collapse-item>
        <el-collapse-item title="个人数据" name="3">
          <FileTree
            ref="personalTree" v-loading="dataPersonalLoading" node-key="id" lazy :load="loadDataPersonal"
            :expand-on-click-node="false" @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <el-button link type="primary" @click="removePersonal(node, data)">
                删除
              </el-button>
            </template>
          </FileTree>
        </el-collapse-item>
      </el-collapse>
      <Dialog>
        <template #activator="{ on }">
          <el-button text type="primary" icon="Plus" class="w-full my-2" @click="on">
            新增类别
          </el-button>
        </template>
        <template #header>
          <span>新增类别</span>
          <el-divider class="mt-2 mb-0" />
        </template>
        <template #default>
          <el-form :model="queryParams">
            <el-form-item label="选择父类" prop="parentId">
              <el-cascader v-model="queryParams.parentId" :props="categoryProps" class="w-full" collapse-tags />
            </el-form-item>
            <el-form-item label="类别名称" prop="categoryName">
              <el-input v-model="queryParams.categoryName" placeholder="请输入类别名称" clearable />
            </el-form-item>
          </el-form>
        </template>
        <template #footer="{ hide }">
          <el-button @click="hide">
            取消
          </el-button>
          <el-button
            type="primary" :disabled="!(queryParams.categoryName.length && queryParams.parentId)"
            :loading="typeLoading" @click="() => handleAddType(hide)"
          >
            确定
          </el-button>
        </template>
      </Dialog>
      <Dialog>
        <template #activator="{ on }">
          <el-button type="primary" icon="Upload" class="w-full ml-0!" @click="on">
            上传个人数据
          </el-button>
        </template>
        <template #header>
          <span>上传个人数据</span>
          <el-divider class="mt-2 mb-0" />
        </template>
        <template #default>
          <Upload ref="upload" :active="active" />
        </template>
        <template #footer="{ hide }">
          <el-button @click="() => resetUploadData(hide)">
            取消
          </el-button>
          <el-button v-if="active !== 0" @click="() => updateActive(active - 1)">
            上一步
          </el-button>
          <el-button v-if="active !== 2" type="primary" @click="() => updateActive(active + 1)">
            下一步
          </el-button>
          <el-button type="primary" @click="() => saveUploadData(hide)">
            确定
          </el-button>
        </template>
      </Dialog>
    </layout-h-item>
    <layout-h-item class="data-table !block">
      <el-radio-group v-model="query.dataType" class="mb-4">
        <el-radio-button label="1">
          测试数据
        </el-radio-button>
        <el-radio-button label="2">
          正式数据
        </el-radio-button>
      </el-radio-group>
      <Dialog width="1000" append-to-body>
        <template #activator="{ on }">
          <el-button link type="primary" icon="Share" @click="on">
            共享测试
          </el-button>
        </template>
        <template #header>
          <span>共享设置</span>
          <el-divider class="mt-2 mb-0" />
        </template>
        <template #default>
          <OrgUserSelect />
        </template>
      </Dialog>
      <div class="flex justify-end">
        <Search v-model="inputText" v-model:input-text="query.searchText" class="mb-4 w-300px" />
      </div>
      <el-table v-loading="loading" :data="dataSource">
        <el-table-column type="index" width="50" />
        <el-table-column label="数据名称" align="center" prop="name" />
        <el-table-column label="数据来源" align="center" prop="from" />
        <el-table-column label="主题" align="center" prop="title" />
        <el-table-column label="创建人" align="center" prop="creator" />
        <el-table-column label="创建时间" align="center" prop="creatorTime" />
        <el-table-column label="更新时间" align="center" prop="updateTime" />
        <el-table-column label="操作" width="300" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" icon="View">
              查看
            </el-button>
            <el-button link type="primary" icon="Edit">
              编辑
            </el-button>
            <el-button link type="primary" icon="Delete">
              删除
            </el-button>
            <Dialog append-to-body>
              <template #activator="{ on }">
                <el-button link type="primary" icon="Share" @click="on">
                  共享
                </el-button>
              </template>
              <template #header>
                <span>共享设置</span>
                <el-divider class="mt-2 mb-0" />
              </template>
              <template #default>
                <el-form :model="shareParams">
                  <el-form-item label="共享范围" prop="shareRange">
                    <el-cascader
                      v-model="shareParams.shareRange" v-cascader="popupScrollByUser" :props="deptProps"
                      class="w-full" collapse-tags
                    />
                  </el-form-item>
                  <el-form-item label="共享期限" prop="shareTimeRange">
                    <el-input v-model="shareParams.shareTimeRange" clearable />
                  </el-form-item>
                </el-form>
              </template>
              <template #footer="{ hide }">
                <el-button @click="hide">
                  取消
                </el-button>
                <el-button type="primary">
                  确定
                </el-button>
              </template>
            </Dialog>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="paginationParams.total > 0" v-model:page="paginationParams.current"
        v-model:limit="paginationParams.pageSize" :total="paginationParams.total"
      />
    </layout-h-item>
  </layout-h>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import FileTree from './components/FileTree'
import Upload from './components/Upload'
import Dialog from '@/components/Dialog'
import Search from '@/components/Search'
import useTable from '@/composables/useTable'
import useButton from '@/composables/useButton'
import OrgUserSelect from '@/components/OrgUserSelect'
import { deptTreeSelect, listUser } from '@/api/system/user'
import { addCatalogy, delCatalogy, listCatalogy } from '@/api/system/catalogy'
import { listData } from '@/api/system/data'

// 折叠面板
const activeNames = ref(['1', '2', '3'])

// fileTree相关
const dataCenterLoading = ref(true)
const dataChangeLoading = ref(true)
const dataPersonalLoading = ref(true)
const dataCenter = ref([])
const dataChange = ref([])
const dataPersonal = ref([])

onMounted(async () => {
  [dataCenter.value, dataChange.value] = await Promise.all([new Promise((res) => {
    setTimeout(() => {
      res(
        [{
          label: '检察数据',
          children: [
            {
              label: '数据1',
            },
          ],
        }, {
          label: '政法数据',
          children: [
            {
              label: '数据1',
            },
          ],
        }, {
          label: '行政执法机关数据',
          children: [
            {
              label: '数据1',
            },
          ],
        }, {
          label: '社会数据',
          children: [
            {
              label: '数据1',
            },
          ],
        }],
      )
    }, 1000)
  }), new Promise((res) => {
    setTimeout(() => {
      res(
        [
          {
            label: '所有共享数据',
          },
        ],
      )
    }, 1000)
  }),
  ])
  dataCenterLoading.value = false
  dataChangeLoading.value = false
})

const resolvePersonal = ref()
const nodePersonal = ref([])
const personalTree = ref()

const loadDataPersonal = (node, resolve) => {
  if (node.level === 0) {
    nodePersonal.value = node
    resolvePersonal.value = resolve
    dataPersonalLoading.value = true
    listCatalogy({ parentId: 6 }).then((res) => {
      resolve(res.rows.map(item => ({ ...item, label: item.categoryName, children: [] })))
      dataPersonalLoading.value = false
    })
  }
  else {
    listCatalogy({ parentId: node.data.id }).then((res) => {
      resolve(res.rows.map(item => (node.level === 1 ? { ...item, label: item.categoryName, children: [] } : { ...item, label: item.categoryName })))
      if (!res.rows.length) {
        node.isLeaf = false
        node.loaded = false
      }
    })
  }
}

// 新增类别
const queryParams = ref({
  parentId: '',
  categoryName: '',
})

const categoryProps = {
  value: 'id',
  lazy: true,
  checkStrictly: true,
  lazyLoad: (node, resolve) => {
    if (node.level === 0) {
      listCatalogy({ parentId: 0 }).then((res) => {
        resolve(res.rows.filter(item => item.id === 6).map(item => ({
          ...item,
          label: item.categoryName,
          leaf: false,
        })))
      })
    }
    else {
      listCatalogy({ parentId: node.data.id }).then((res) => {
        resolve(res.rows.map(item => ({
          ...item,
          leaf: node.level > 0 && true,
          label: item.categoryName,
        })))
      })
    }
  },
}

const { onClick: handleAddType, typeLoading } = useButton((hide) => {
  return addCatalogy({
    categoryName: queryParams.value.categoryName,
    parentId: queryParams.value.parentId.length === 2 ? queryParams.value.parentId[1] : queryParams.value.parentId[0],
  }).then((res) => {
    hide()
    nodePersonal.value.childNodes = []
    loadDataPersonal(nodePersonal.value, resolvePersonal.value)
    ElMessage({
      message: '新增成功',
      type: 'success',
    })
  })
})

const removePersonal = (node, data) => {
  delCatalogy(data.id).then((res) => {
    nodePersonal.value.childNodes = []
    loadDataPersonal(nodePersonal.value, resolvePersonal.value)
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
  })
}

const handleNodeClick = () => {

}

// 上传个人数据
const active = ref(0)
const upload = ref()

const updateActive = (activeNumber) => {
  active.value = activeNumber
}

const resetUploadData = (hide) => {
  active.value = 0
  hide()
  upload.value.resetUploadData()
}

const saveUploadData = (hide) => {
  hide()
}

// table相关
const query = reactive({
  categoryId: 16,
  dataType: 1,
})

const inputText = ref('')

const { loading, dataSource, pagination: paginationParams, handleChange } = useTable((params) => {
  return listData(params)
})

watch(query, (val) => {
  handleChange(paginationParams, {
    ...val,
  })
})

// 共享设置
const shareParams = ref({
  shareRange: '',
  shareTimeRange: '',
})

const deptOptions = ref([])
const deptProps = {
  value: 'id',
  multiple: true,
  lazy: true,
  lazyLoad: (node, resolve) => {
    if (node.level === 0) {
      resolve(deptOptions.value)
    }
    else {
      listUser({
        pageNum: 1,
        pageSize: 10,
        depId: node.id,
      }).then((res) => {
        resolve(res.rows.map(item => ({
          ...item,
          leaf: true,
          id: item.userId + item.userName,
          label: item.nickName,
        })))
      })
    }
  },
}

const popupScrollByUser = (e) => {
  const { scrollTop, offsetHeight, scrollHeight } = e.target

  if (scrollTop + offsetHeight === scrollHeight)
    console.log('hi')
}

function getDeptTree() {
  deptTreeSelect().then((response) => {
    deptOptions.value = response.data
  })
}

onMounted(() => {
  handleChange(paginationParams, query)
  getDeptTree()
})
</script>

<style lang="scss" scoped>
.data-title {
  background-color: var(--el-color-primary);

}

.data-table {
  width: calc(100% - 16rem);
}

::v-deep {
  .el-tree-node__content:hover {
    button {
      display: block;
    }
  }

  .el-tree-node__content {
    button {
      display: none;
    }
  }
}
</style>
