<template>
    <div>
        <div class="row mb-2">
            <div class="col">
                <InputSelector v-model="newItem.facet" v-model:idValue="newItem.facetId" />
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
                    <FormModalButton :modelValue="item.facet" />
                    {{ item.facet?.title ?? '' }}
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-outline-danger" @click="handleRemove(item)">
                        <Icon name="delete" />
                    </button>
                </div>
            </div>
        </template>

        <Debug :modelValue="{
            items: items.map(x => `${x.id} - ${(x.facet?.title ?? '')}`),
        }" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import type Article from "../data/Entity";
import ArticleFacet from "./Entity"
import InputSelector from "@/entities/facets/selecting/InputSelector.vue";
import { Debug } from "@/regira_modules/vue/debug";
import FormModalButton from "@/entities/facets/details/FormModalButton.vue";

const props = defineProps<{
    article: Article
}>()

const items = defineModel<ArticleFacet[]>({ default: () => [] })
function handleRemove(item: ArticleFacet) {
    item._deleted = !item._deleted;
}

const newItem = ref<ArticleFacet>(ArticleFacet.create({ articleId: props.article.id }))
function handleAdd(item: ArticleFacet) {
    items.value.push(ArticleFacet.create({ ...item }));
    newItem.value = ArticleFacet.create({ articleId: props.article.id });
}
</script>