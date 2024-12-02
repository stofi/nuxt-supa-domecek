<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})
const { data, status, error, refresh } = await useFetch(
  '/api/shift', {
    headers: useRequestHeaders(['cookie'])
  }
)
type Row = NonNullable<typeof data['value']>['data'][number]
// date valid
const columns: TableColumn[] = [{
  key: 'date',
  label: 'Date'
},
{
  key: 'valid',
  label: 'Valid',
  class: 'w-12 text-right',
  rowClass: 'text-right'
}
]
</script>

<template>
  <UDashboardNavbar title="Shifts" :badge="data?.count ?? 0">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton label="New Shift" trailing-icon="i-heroicons-plus" color="gray" to="/app/shift/new" />
    </template>
  </UDashboardNavbar>

  <UTable :columns="columns" :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
    <template #date-data="{ row }: { row: Row }">
      {{ new Date(row.date).toLocaleDateString('cs') }}
    </template>
    <template #valid-data="{ row }: { row: Row }">
      <UIcon v-if="row.valid" name="i-heroicons-check-circle-solid" class="w-4 h-4 text-green-500" />
      <UIcon
      v-else name="i-heroicons-x-circle-solid"
        class="w-4 h-4 text-red-500" />

    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.statusMessage" />
  </UDashboardPanelContent>
</template>
