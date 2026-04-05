<template>
    <div class="row">
        <div class="col-lg-6">
            <FormSection :title="$t('facetGroup.parentFacets')">
                <OverviewParentEntities v-model="item.parentFacets" :facetGroup="item" />
            </FormSection>
        </div>
        <div class="col-lg-6">
            <FormSection :title="$t('facetGroup.childFacets')">
                <OverviewChildEntities v-model="item.childFacets" :facetGroup="item" />
            </FormSection>
        </div>
    </div>
</template>

<script setup lang="ts">
import type FacetGroup from "../data/Entity"
import OverviewParentEntities from "./OverviewParentEntities.vue"
import OverviewChildEntities from "./OverviewChildEntities.vue"

const item = defineModel<FacetGroup>({ required: true })
</script>
