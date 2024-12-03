<script lang="ts" setup>
import type { Database } from '~~/types/supabase'

type Shift = Database['public']['Tables']['shift']['Row']

const { data, status, error, refresh } = await useFetch(
  '/api/shift', {
    headers: useRequestHeaders(['cookie']),
    key: 'shiftSelect'
  }
)

const shift = defineModel<number>('shift')

const selectedShift = computed<Shift | undefined>(() =>
  data.value?.data.find((r: Shift) => r.id === shift.value)
)

</script>

<template>
  <USelectMenu v-model="shift" :loading="status === 'pending'" :options="data?.data" :value-attribute="'id'">
    <template #option="{ option }: {option: Shift}">
      <span class="truncate">{{ option.date }}</span>
    </template>
    <template #label>
      <template v-if="selectedShift">
        <span class="truncate">{{ selectedShift.date }}</span>
      </template>
      <template v-else>
        <span class="truncate">Select Shift</span>
      </template>
    </template>
  </USelectMenu>
</template>
