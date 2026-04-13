<template>
    <ul class="list-unstyled">
        <li v-for="node in nodes" :key="`${node.value.type}_${node.value.id}`">
            <TreeViewItem v-if="node.value?.item" :selected="selected" :node="node" @toggle-node="$emit('toggle-node', $event)" />
        </li>
    </ul>
</template>

<script lang="ts">
import type { TreeNode } from "@/regira_modules/treelist"
import type TreeItem from "./TreeItem"
import TreeViewItem from "./TreeViewItem.vue"

export default {
    name: "TreeView",
    components: { TreeViewItem },
}
</script>

<script setup lang="ts">
defineEmits<{
    (e: "toggle-node", node: TreeNode<TreeItem>): void
}>()

defineProps<{
    selected: Array<TreeNode<TreeItem>>
    nodes: Array<TreeNode<TreeItem>>
}>()
</script>
