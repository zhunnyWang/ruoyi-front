<!--
 * @Author: Xueying Wang
 * @Date: 2023-09-12 14:52:46
 * @LastEditors: Xueying Wang
 * @Description: description
-->
<template>
  <el-tree :props="defaultProps">
    <template #default="{ node }">
      <div class="flex flex-items-center">
        <div v-if="node.childNodes.length && !node.expanded" class="i-mdi-folder-outline w-4 h-4 mr-2" />
        <div v-if="node.childNodes.length && node.expanded" class="i-mdi-folder-open-outline w-4 h-4 mr-2" />
        <div v-else-if="!node.childNodes.length" class="i-mdi-file-document-outline w-4 h-4 mr-2" />
        <p class="my-0">
          {{ node.label }}
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
</script>
