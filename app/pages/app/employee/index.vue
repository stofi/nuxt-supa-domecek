<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})

const { data, status, error, refresh } = await useFetch(
  '/api/employee', {
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
    key: 'contract',
    label: 'Contract',
    class: 'w-12 text-right',
    rowClass: 'text-right'
  },
  {
    key: 'role',
    label: 'Role',
    class: 'w-32 text-right',
    rowClass: 'text-right'
  }
]
</script>

<template>
  <UDashboardNavbar title="Employees" :badge="data?.count ?? 0">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton label="New Employee" trailing-icon="i-heroicons-plus" color="gray" to="/app/employee/new" />
    </template>
  </UDashboardNavbar>

  <UTable :columns="columns" :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
    <template #role-data="{ row }: { row: Row }">
      <template v-if="row.role.length">
        <ColorDot v-for="role in row.role" :key="role.id" :color="role.color" class="mr-1" />
      </template>
      <template v-else>
        <span class="text-gray-400">No role</span>
      </template>
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.message" />
  </UDashboardPanelContent>
</template>
