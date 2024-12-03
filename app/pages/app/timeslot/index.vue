<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Timeslots'
})

const { data, status, error, refresh } = await useFetch(
  '/api/timeslot', {
    headers: useRequestHeaders(['cookie'])
  }
)
type Row = NonNullable<typeof data['value']>['data'][number]

const columns: TableColumn[] = [
  {
    key: 'date',
    label: 'Date',
    class: 'w-28'
  },
  {
    key: 'role',
    label: 'Role',
    class: 'w-12',
    rowClass: 'text-center'
  },
  {
    key: 'employee',
    label: 'Employee'
  },
  {
    key: 'end_time',
    label: 'End Time',
    class: 'w-28 text-right',
    rowClass: 'text-right'
  },

  {
    key: 'start_time',
    label: 'Start Time',
    class: 'w-28 text-right',
    rowClass: 'text-right'
  },

  {
    key: 'break',
    label: 'Break',
    class: 'w-12 text-right',
    rowClass: 'text-right'
  }
]

</script>

<template>
  <UDashboardNavbar title="Timeslots" :badge="data?.count ?? 0">
    <template #right>
      <UButton
        label="Refresh"
        icon="i-heroicons-arrow-path"
        color="gray"
        :loading="status === 'pending'"
        @click="refresh"/>
      <UButton
        label="New Timeslot"
        trailing-icon="i-heroicons-plus"
        color="gray"
        to="/app/timeslot/new"
        />
    </template>
  </UDashboardNavbar>

  <UTable
    :columns="columns"
    :rows="data?.data"
    :loading="status === 'pending'"
    sort-mode="manual"
    class="w-full"
  >
    <template #break-data="{row}: {row: Row}">
      <template v-if="row.break">
        <UIcon name="i-heroicons-check-circle-solid" class="w-4 h-4 text-green-500" />
      </template>
      <template v-else>
        <UIcon name="i-heroicons-x-mark" class="w-4 h-4 text-red-500" />
      </template>
    </template>
    <template #role-data="{ row }: { row: Row }">
      <ColorDot :color="row.role?.color" />
    </template>
    <template #date-data="{ row }: { row: Row }">
      {{ new Date(row.date).toLocaleDateString('cs') }}
    </template>
    <template #employee-data="{ row }: { row: Row }">
      {{ row.employee?.name }}
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.statusMessage" />
  </UDashboardPanelContent>

</template>
