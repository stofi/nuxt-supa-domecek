<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Teams'
})

const { data, status, error, refresh } = await useFetch(
  '/api/team', {
    headers: useRequestHeaders(['cookie'])
  }
)

type Row = NonNullable<typeof data['value']>['data'][number]

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

const expand = ref({
  openedRows: [],
  row: {}
})
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

  <UTable
v-model:expand="expand" :ui="{ td: { base: 'first-of-type:w-0' } }" :columns="columns" :rows="data?.data"
    :loading="status === 'pending'" sort-mode="manual" class="w-full">
    <template #owner-data="{ row }: { row: Row }">
      {{ row.owner?.full_name }}
    </template>
    <template #expand="{ row }: { row: Row }">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Team Members</h3>
        <ProfileTable :data="row.users" />
      </div>
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.statusMessage" />
  </UDashboardPanelContent>
</template>
