<template>
    <FormSection @collapse="$emit('collapse')">
        <template #title>
            <div class="row g-0">
                <div class="col">
                    <h3 class="pt-2 ps-2">Hierarchy</h3>
                </div>
                <div class="col-auto py-1">
                    <div class="form-check my-0 float-end">
                        <IconButton v-if="!areAllExpanded" icon="expand" class="btn-info mx-1" @click="expandAll" />
                        <IconButton v-else icon="collapse" class="btn-info mx-1" @click="collapseAll" />
                    </div>
                </div>
            </div>
        </template>
        <LoadingContainer :is-loading="isLoading">
            <template v-if="tree != null">
                <div v-if="hasNoItems" class="italic-muted my-2">No items</div>
                <TreeView v-else :nodes="tree.roots" :selected="selectedNodes!" @toggle-node="toggleNode" class="tree" />
            </template>
        </LoadingContainer>
        <Debug
            :modelValue="{
                treeRoots: tree?.getRoots().map((r) => (r.value.item as any)?.title),
            }"
        />
    </FormSection>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue"
import { distinctBy } from "@/regira_modules/utilities/array-utility"
import { LoadingContainer } from "@/regira_modules/vue/ui"
import { get } from "@/regira_modules/vue/ioc"
import { TreeList, TreeNode } from "@/regira_modules/treelist"
import { Entity as FacetEntity, type EntityService, useEntityStore as useFacetStore } from "../../facets"
import { Entity as FacetGroupEntity, useEntityStore as useFacetGroupStore } from "../../facet-groups"
import { toTree } from "./functions"
import { FamilyItem } from "."
import TreeItem from "./TreeItem"
import TreeView from "./TreeView.vue"

const props = defineProps<{
    item: FacetEntity
}>()

const isLoading = ref(false)
const hasNoItems = ref<boolean>()

const tree = ref<TreeList<TreeItem>>()
const entityService = get<EntityService>(FacetEntity.name)!
const family = ref<Array<FamilyItem>>()
const selectedNodes = computed(() => tree.value?.filter((n) => n.value?.id == props.item?.id && n.value.type === FacetEntity.name))

const areAllExpanded = computed(() => tree.value?.getOffspring(tree.value.roots).every((n) => n.value.isExpanded))
function expandAll() {
    tree.value?.getOffspring(tree.value.roots).forEach((n) => (n.value.isExpanded = true))
}
function collapseAll() {
    tree.value?.getOffspring(tree.value.roots).forEach((n) => (n.value.isExpanded = false))
}
function expandDefault() {
    tree.value?.forEach(
        (r) =>
            (r.value.isExpanded =
                selectedNodes.value!.some((n) => n.value?.id == r.value?.id) ||
                selectedNodes.value!.some((n) => n.getAncestors().some((o) => o.value?.id == r.value?.id)))
    )
}

function toggleNode(node: TreeNode<TreeItem>) {
    node.value.isExpanded = !node.value.isExpanded
}

async function load() {
    isLoading.value = true
    const familyItems = await entityService.getFamily([props.item.id])
    family.value = distinctBy(familyItems, (x: FamilyItem) => `${x.childId}_${x.parentId || 0}`)
    isLoading.value = false
}

watchEffect(load)
watchEffect(async () => {
    if (family.value) {
        const skinnyTree = toTree(props.item.id, family.value)

        const facetIds = skinnyTree.getValues().filter((x) => x.type === FacetEntity.name).map((x) => x.id)
        const facetGroupIds = skinnyTree.getValues().filter((x) => x.type === FacetGroupEntity.name).map((x) => x.id)

        if (facetIds.length > 0 || facetGroupIds.length > 0) {
            isLoading.value = true
            const { service: facetService } = useFacetStore()
            const { service: facetGroupService } = useFacetGroupStore()

            const [facets, facetGroups] = await Promise.all([
                facetIds.length > 0 ? facetService.list({ ids: facetIds, pageSize: 0 }) : Promise.resolve([]),
                facetGroupIds.length > 0 ? facetGroupService.list({ ids: facetGroupIds, pageSize: 0 }) : Promise.resolve([]),
            ])

            skinnyTree.forEach((node) => {
                if (node.value.type === FacetEntity.name) {
                    node.value.item = facets.find((x) => x.id == node.value.id)
                } else {
                    node.value.item = facetGroups.find((x) => x.id == node.value.id)
                }
            })
            tree.value = skinnyTree
            expandDefault()
            isLoading.value = false
        } else {
            hasNoItems.value = true
            tree.value = skinnyTree
        }
    }
})
</script>
