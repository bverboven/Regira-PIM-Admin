<template>
    <div class="entity-list">
        <div class="row pb-2 border-bottom border-bottom-1">
            <div class="col-auto fw-bold">
                <Icon name="edit" class="m-1" />
            </div>
            <div class="col fw-bold">{{ $t("name") }}</div>
            <div class="col fw-bold">{{ $t("components") }}</div>
            <div v-if="!readonly" class="col-auto d-none d-md-block fw-bold">
                <Icon name="delete" class="text-muted m-1" />
            </div>
        </div>
        <template v-for="(item, i) in items" :key="item.$id">
            <div class="row border-bottom border-bottom-1 py-2">
                <div class="col-auto">
                    <FormModalButton :modelValue="item" />
                </div>
                <div class="col text-truncate">
                    {{ item.$title }}
                </div>
                <div class="col text-truncate">
                    <ul class="list-inline mb-0">
                        <li v-for="component in item.components" :key="component.id" class="list-inline-item">
                            <span :class="{ 'fw-bold': component.componentId == article.id }">
                                {{ component.component?.title }} ({{ component.quantity }} {{
                                    getUnitType(component.component?.unitType)?.code }})
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { OverviewEmits } from "@/regira_modules/vue/entities"
import { useEntityStore as useUnitTypeStore } from "@/entities/unit-types"
import useEntityStore from "../data/store"
import Entity from "../data/Entity"
import FormModalButton from "../details/FormModalButton.vue"

interface Emits extends /* @vue-ignore */ OverviewEmits<Entity> { }
const emit = defineEmits<Emits>()

const props = defineProps<{
    article: Entity,
    modelValue?: Array<Entity>
    readonly?: boolean
}>()

const { fromPool: getUnitType } = useUnitTypeStore()
const { fromPool } = useEntityStore()

const items = computed<Array<Entity>>({
    get: () => fromPool(props.modelValue || []),
    set: (value) => emit("update:modelValue", value),
})
</script>
