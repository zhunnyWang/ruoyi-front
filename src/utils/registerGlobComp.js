/*
 * @Author: Xueying Wang
 * @Date: 2023-04-03 10:52:21
 * @LastEditors: Xueying Wang
 * @Description: description
 */
import {
  AutoFormRender,
  AutoFormRight,
  AutoFormTreeNodeDialog,
  AutoFormView,
  CodeTypeDialog,
  DraggableItem
} from '@/components/AutoForm'
import {
  LayoutH,
  LayoutHItem,
  LayoutV,
  LayoutVItem,
} from '@/components/Layout'
// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect'
// 字典标签组件
import DictTag from '@/components/DictTag'


const compList = [
  AutoFormRender,
  AutoFormRight,
  AutoFormTreeNodeDialog,
  AutoFormView,
  CodeTypeDialog,
  DraggableItem,
  LayoutH,
  LayoutHItem,
  LayoutV,
  LayoutVItem,
  Pagination,
  RightToolbar,
  Editor,
  FileUpload,
  ImageUpload,
  ImagePreview,
  TreeSelect,
  DictTag
]

export function registerGlobComp(app) {
  compList.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
