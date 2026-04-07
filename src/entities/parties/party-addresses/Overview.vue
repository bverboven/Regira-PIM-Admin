<template>
    <div>
        <div class="row mb-2">
            <div class="col mb-2">
                <input v-model="newItem.street" class="form-control" :placeholder="$t('party.address.street')" />
            </div>
            <div class="col-sm-auto mb-2">
                <input v-model="newItem.houseNumber" class="form-control" :placeholder="$t('party.address.houseNumber')" />
            </div>
            <div class="col-sm-auto mb-2">
                <input v-model="newItem.postalCode" class="form-control" :placeholder="$t('party.address.postalCode')" />
            </div>
            <div class="col mb-2">
                <input v-model="newItem.city" class="form-control" :placeholder="$t('party.address.city')" />
            </div>
            <div class="col-sm-auto mb-2">
                <input v-model="newItem.countryCode" maxlength="2" class="form-control" :placeholder="$t('country')" />
            </div>
            <div class="col-auto mb-2">
                <button type="button" class="btn btn-success" @click="handleAdd(newItem)">
                    <Icon name="new" />
                </button>
            </div>
        </div>

        <template v-for="item in items" :key="item.$id">
            <div class="row mb-2" :class="{ 'is-deleted': item._deleted }">
                <div class="col mb-2">
                    <input v-model="item.street" class="form-control" :placeholder="$t('party.address.street')" />
                </div>
                <div class="col-sm-auto mb-2">
                    <input v-model="item.houseNumber" class="form-control" :placeholder="$t('party.address.houseNumber')" />
                </div>
                <div class="col-sm-auto mb-2">
                    <input v-model="item.postalCode" class="form-control" :placeholder="$t('party.address.postalCode')" />
                </div>
                <div class="col mb-2">
                    <input v-model="item.city" class="form-control" :placeholder="$t('party.address.city')" />
                </div>
                <div class="col-sm-auto mb-2">
                    <input v-model="item.countryCode" maxlength="2" class="form-control" :placeholder="$t('country')" />
                </div>
                <div class="col-auto mb-2">
                    <button type="button" class="btn btn-outline-danger" @click="handleRemove(item)">
                        <Icon name="delete" />
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Party from '../data/Entity'
import PartyAddress from './Entity'

const model = defineModel<Party>({ required: true })
const items = computed(() => model.value.addresses ?? [])

function handleRemove(item: PartyAddress) {
    item._deleted = !item._deleted
}

const newItem = ref<PartyAddress>(new PartyAddress())
function handleAdd(item: PartyAddress) {
    if (!item.street && !item.city)
        return
    model.value.addresses ??= []
    model.value.addresses.push(Object.assign(new PartyAddress(), { ...item }))
    newItem.value = new PartyAddress()
}
</script>
