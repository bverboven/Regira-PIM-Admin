<template>
    <div class="row">
        <div class="col-lg-6">
            <FormSection :title="$t('facet.parentEntities')">
                <OverviewParentEntities v-model="item.parentEntities" :facet="item" />
            </FormSection>
        </div>
        <div class="col-lg-6">
            <FormSection :title="$t('facet.childEntities')">
                <OverviewChildEntities v-model="item.childEntities" :facet="item" />
            </FormSection>
        </div>
    </div>
</template>

<script setup lang="ts">
import type Facet from "../data/Entity"
import OverviewParentEntities from "./OverviewParentEntities.vue"
import OverviewChildEntities from "./OverviewChildEntities.vue"

const item = defineModel<Facet>({ required: true })
</script>
