<!--
 * @Author: Xueying Wang
 * @Date: 2023-09-12 14:52:46
 * @LastEditors: Xueying Wang
 * @Description: description
-->
<template>
  <el-tree ref="tree" :props="defaultProps">
    <template #default="scope">
      <div class="flex flex-items-center w-full">
        <div v-if="!scope.node.isLeaf && !scope.node.expanded" class="i-mdi-folder-outline w-4 h-4 mr-2" />
        <div v-if="!scope.node.isLeaf && scope.node.expanded" class="i-mdi-folder-open-outline w-4 h-4 mr-2" />
        <div v-else-if="scope.node.isLeaf" class="i-mdi-file-document-outline w-4 h-4 mr-2" />
        <p class="tree-node">
          <span>{{ scope.node.label }}</span>
          <slot v-bind="scope" />
        </p>
      </div>
    </template>
  </el-tree>
</template>

<script setup>
const defaultProps = {
  children: 'children',
  label: 'label',
}

const tree = ref()

defineExpose({ tree })
</script>

<style lang="scss" scoped>
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
