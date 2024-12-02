<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})

const { data, status, error, refresh } = await useFetch(
  '/api/vacation', {
    headers: useRequestHeaders(['cookie'])
  }
)

type Row = NonNullable<typeof data['value']>['data'][number]

const columns: TableColumn[] = [
  {
    key: 'date',
    label: 'Date',
    class: 'w-32'
  },
  {
    key: 'employee',
    label: 'Employee'
  }
]

</script>

<template>
  <UDashboardNavbar title="Vacations" :badge="data?.count ?? 0">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton label="New Vacation" trailing-icon="i-heroicons-plus" color="gray" to="/app/vacation/new" />
    </template>
  </UDashboardNavbar>

  <UTable :columns="columns" :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">

    <template #employee-data="{ row }: { row: Row }">
      {{ row.employee?.name }}
    </template>
    <template #date-data="{ row }: { row: Row }">
      {{ new Date(row.date).toLocaleDateString('cs') }}
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.statusMessage" />
  </UDashboardPanelContent>

</template>
