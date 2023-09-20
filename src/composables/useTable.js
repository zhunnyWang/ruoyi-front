/*
 * @Author: Xueying Wang
 * @Date: 2023-09-08 15:03:39
 * @LastEditors: wanglu
 * @Description:
 */
import { reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default function useTable(factoryFetch, options) {
  const dataSource = ref([])
  const current = ref(1)
  const pageSize = ref(options?.pageSize || 10)
  const total = ref(0)
  const filtersObj = ref({})
  const loading = ref(true)

  const fetchData = () => {
    loading.value = true
    const params = {
      page: current.value,
      pageSize: pageSize.value,
      ...filtersObj.value,
    }
    return factoryFetch(params).then((res) => {
      dataSource.value = res.rows
      total.value = res.total
      return res
    }).finally(() => {
      loading.value = false
    })
  }

  const handleChange = (pagination, filters) => {
    current.value = pagination.current
    pageSize.value = pagination.pageSize
    filtersObj.value = filters
  }

  const handleDelete = (options && options.deleteFunc)
    ? (id) => {
        ElMessageBox.confirm(
          '确认删除吗？',
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {
          options.deleteFunc(id).then(() => {
            ElMessage({
              message: '删除成功',
              type: 'success',
            })
            fetchData()
          })
        })
      }
    : () => null

  watch([pageSize, current, filtersObj], () => {
    fetchData()
  })

  return {
    pagination: reactive({
      current,
      pageSize,
      total,
    }),
    dataSource,
    loading,
    fetchData,
    handleChange,
    handleDelete,
  }
}

