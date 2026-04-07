<template>
    <div>
        <div class="row mb-2">
            <div class="col-auto">
                <select v-model="newItem.dataType" class="form-select">
                    <option v-for="type in ContactDataTypes" :key="type" :value="type">{{ $t(`party.contactData.${type.toLowerCase()}`) }}</option>
                </select>
            </div>
            <div class="col">
                <input v-model="newItem.value" class="form-control" :placeholder="$t('party.contactData.value')" />
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" @click="handleAdd(newItem)">
                    <Icon name="new" />
                </button>
            </div>
        </div>

        <template v-for="item in items" :key="item.$id">
            <div class="row mb-2" :class="{ 'is-deleted': item._deleted }">
                <div class="col-auto">
                    <select v-model="item.dataType" class="form-select">
                        <option v-for="type in ContactDataTypes" :key="type" :value="type">{{ $t(`party.contactData.${type.toLowerCase()}`) }}</option>
                    </select>
                </div>
                <div class="col">
                    <input v-model="item.value" class="form-control" />
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
import { ref, computed } from 'vue'
import Party from '../data/Entity'
import PartyContactData, { ContactDataTypes } from './Entity'

const model = defineModel<Party>({ required: true })
const items = computed(() => model.value.contactData ?? [])

function handleRemove(item: PartyContactData) {
    item._deleted = !item._deleted
}

const newItem = ref<PartyContactData>(new PartyContactData())
function handleAdd(item: PartyContactData) {
    if (!item.value)
        return
    model.value.contactData ??= []
    model.value.contactData.push(Object.assign(new PartyContactData(), { ...item }))
    newItem.value = new PartyContactData()
}
</script>
