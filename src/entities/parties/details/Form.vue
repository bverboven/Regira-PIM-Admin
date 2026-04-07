<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row form-buttons">
            <div class="col col-md-auto order-1">
                <FormButtonsRow :item="item" :readonly="readonly" :feedback="feedback" :show-delete="item?.id > 0"
                    @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-auto order-2 order-md-3">
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }"
                    class="btn btn-default py-1" target="_blank" :title="$t('popOut')">
                    <Icon name="popOut" />
                </RouterLink>
                <RouterLink v-else-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1">
                    <Icon name="list" /> <span class="d-none d-md-inline ms-1">{{ $t("overview") }}</span>
                </RouterLink>
            </div>
            <div class="col-md order-3 order-md-2">
                <Feedback :feedback="feedback" />
            </div>
        </div>

        <FormSection :title="$t(config.detailsTitle || '')" :readonly="readonly">
            <div class="row">
                <!-- partyType -->
                <div class="col-sm-auto mb-2">
                    <select v-model="item.partyType" :disabled="readonly || item.id > 0" class="form-select">
                        <option :value="PartyTypes.Person">{{ $t("person") }}</option>
                        <option :value="PartyTypes.Organization">{{ $t("organization") }}</option>
                    </select>
                    <FormLabel :label="$t('type')" />
                </div>
                <!-- code -->
                <div class="col-sm mb-2">
                    <div class="input-group">
                        <div class="input-group-text">
                            <Icon name="code" />
                        </div>
                        <input v-model="item.code" maxlength="32" :readonly="readonly" class="form-control" />
                    </div>
                    <FormLabel :label="$t('code')" />
                </div>
            </div>

            <!-- Person fields -->
            <template v-if="item.partyType === PartyTypes.Person">
                <div class="row">
                    <div class="col-sm-auto mb-2">
                        <input v-model="(item as Person).salutation" maxlength="16" :readonly="readonly"
                            class="form-control" :placeholder="$t('salutation')" />
                        <FormLabel :label="$t('salutation')" />
                    </div>
                    <div class="col-sm mb-2">
                        <input v-model="(item as Person).givenName" maxlength="64" :readonly="readonly"
                            class="form-control" :placeholder="$t('givenName')" />
                        <FormLabel :label="$t('givenName')" />
                    </div>
                    <div class="col-sm mb-2">
                        <input v-model="(item as Person).middleName" maxlength="64" :readonly="readonly"
                            class="form-control" :placeholder="$t('middleName')" />
                        <FormLabel :label="$t('middleName')" />
                    </div>
                    <div class="col-sm mb-2">
                        <input v-model="(item as Person).familyName" maxlength="64" :readonly="readonly"
                            class="form-control" :placeholder="$t('familyName')" />
                        <FormLabel :label="$t('familyName')" />
                    </div>
                </div>
            </template>

            <!-- Organization fields -->
            <template v-if="item.partyType === PartyTypes.Organization">
                <div class="row">
                    <div class="col mb-2">
                        <div class="input-group">
                            <div class="input-group-text">
                                <Icon name="title" />
                            </div>
                            <input v-model="(item as Organization).name" maxlength="128" :readonly="readonly"
                                class="form-control" />
                        </div>
                        <FormLabel :label="$t('name')" />
                    </div>
                    <div class="col-sm mb-2">
                        <input v-model="(item as Organization).legalEntity" maxlength="64" :readonly="readonly"
                            class="form-control" :placeholder="$t('legalEntity')" />
                        <FormLabel :label="$t('legalEntity')" />
                    </div>
                </div>
            </template>

            <div class="row">
                <div class="col mb-2">
                    <DescriptionInput v-model="item.description" :label="$t('description')" :readonly="readonly" />
                </div>
            </div>
        </FormSection>

        <Debug :modelValue="{
            item,
        }" />
    </form>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router"
import { Feedback } from "@/regira_modules/vue/ui"
import { FormButtonsRow } from "@/components/input"
import { useForm, type FormEmits, formDefaults } from "@/regira_modules/vue/entities"
import config from "../config/config"
import Entity, { Person, Organization, PartyTypes } from "../data/Entity"
import useEntityStore from "../data/store"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> { }
const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: Entity
        readonly?: boolean
        overviewUrl?: string | RouteRecordRaw
        isPopup?: boolean
        initialTab?: string
    }>(),
    { ...formDefaults }
)

const { service: entityService } = useEntityStore()

const { item, feedback, handleCancel, handleSubmit, handleRemove, handleRestore } = useForm<Entity>({ entityService, props, emit })
</script>
