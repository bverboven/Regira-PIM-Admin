<template>
    <div>
        <div class="row mb-2">
            <div class="col">
                <InputSelector v-model="newItem.component" v-model:idValue="newItem.componentId"
                    :filterDefaults="{ isComponent: true }" />
            </div>
            <div class="col-4">
                <div class="input-group">
                    <input type="number" v-model="newItem.quantity" class="form-control" />
                    <div class="input-group-text">
                        <span class="text-muted">{{ getUnitType(newItem.component?.unitType)?.code }}</span>
                    </div>
                </div>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" @click="handleAdd(newItem)">
                    <Icon name="new" />
                </button>
            </div>
        </div>

        <template v-for="item in items" :key="item.id">
            <div class="row mb-2" :class="{ 'is-deleted': item._deleted }">
                <div class="col">
                    <InputSelector v-model="item.component" v-model:idValue="item.componentId" />
                </div>
                <div class="col-4">
                    <div class="input-group">
                        <input type="number" v-model="item.quantity" class="form-control" />
                        <div class="input-group-text">
                            <span class="text-muted">{{ getUnitType(item.component?.unitType)?.code }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-outline-danger" @click="handleRemove(item)">
                        <Icon name="delete" />
                    </button>
                </div>
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEntityStore as useUnitTypeStore } from '@/entities/unit-types';
import type Article from '../data/Entity';
import InputSelector from '../selecting/InputSelector.vue';
import ArticleComponent from './Entity';

const props = defineProps<{
    assembly: Article
}>()

const items = defineModel<Array<ArticleComponent>>({ default: () => [] });

function handleRemove(item: ArticleComponent) {
    item._deleted = !item._deleted;
}

const newItem = ref<ArticleComponent>(ArticleComponent.create({ assemblyId: props.assembly.id }));
function handleAdd(item: ArticleComponent) {
    items.value.push(ArticleComponent.create({ ...item }));
    newItem.value = ArticleComponent.create({ assemblyId: props.assembly.id });
}

const { fromPool: getUnitType } = useUnitTypeStore()
</script>