<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})

const { data, status, error, refresh } = await useFetch(
  '/api/team', {
    headers: useRequestHeaders(['cookie'])
  }
)

// HACK: Bug in supabase types
type RowX = NonNullable<typeof data['value']>['data'][number]
type Row = Omit<RowX, 'owner'> & {
  owner: RowX['owner'][number]
}

const columns: TableColumn[] = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'owner',
    label: 'Owner',
    class: 'w-32 text-right',
    rowClass: 'text-right'
  }
]
</script>

<template>
  <UDashboardNavbar title="Teams" :badge="data?.count ?? 0">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton label="New Team" trailing-icon="i-heroicons-plus" color="gray" to="/app/settings/team/new" />
    </template>
  </UDashboardNavbar>

  <UTable :columns="columns" :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
    <template #owner-data="{ row }: {row: Row}">
      {{ row.owner.full_name }}
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.statusMessage" />
  </UDashboardPanelContent>
</template>
