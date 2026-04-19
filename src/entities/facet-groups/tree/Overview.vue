<template>
    <FacetTreeOverview :item="itemAsFacet" :selected-type="Entity.name" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import FacetEntity from "@/entities/facets/data/Entity"
import FacetTreeOverview from "@/entities/facets/tree/Overview.vue"
import Entity from "../data/Entity"

const props = defineProps<{
    item: Entity
}>()

const itemAsFacet = computed(() =>
    Object.assign(new FacetEntity(), {
        id: props.item.id,
        title: props.item.title,
    })
)
</script>
