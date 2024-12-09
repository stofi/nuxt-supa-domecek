<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

const { t, locale } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.timeslot.label')
})

const { data, status, error, refresh } = await useFetch(
  '/api/timeslot', {
    headers: useRequestHeaders(['cookie'])
  }
)
type Row = NonNullable<typeof data['value']>['data'][number]

const columns = computed<TableColumn[]>(() => [
  {
    key: 'date',
    label: t('form.timeslot.dateLabel'),
    class: 'w-28'
  },
  {
    key: 'role',
    label: t('form.timeslot.roleLabel'),
    class: 'w-12',
    rowClass: 'text-center'
  },
  {
    key: 'employee',
    label: t('form.timeslot.employeeLabel')
  },
  {
    key: 'end_time',
    label: t('form.timeslot.endTimeLabel'),
    class: 'w-28 text-right',
    rowClass: 'text-right'
  },

  {
    key: 'start_time',
    label: t('form.timeslot.startTimeLabel'),
    class: 'w-28 text-right',
    rowClass: 'text-right'
  },

  {
    key: 'break',
    label: t('form.timeslot.breakLabel'),
    class: 'w-12 text-right',
    rowClass: 'text-right'
  }
])
</script>

<template>
  <UDashboardNavbar
    :title="$t('page.timeslots.label')"
    :badge="data?.count ?? 0"
  >
    <template #right>
      <UButton
        :label="$t('buttons.refresh')"
        icon="i-heroicons-arrow-path"
        color="gray"
        :loading="status === 'pending'"
        @click="refresh"
      />
      <UButton
        :label="$t('buttons.newTimeslot')"
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
    <template #break-data="{ row }: { row: Row }">
      <template v-if="row.break">
        <UIcon
          name="i-heroicons-check-circle-solid"
          class="w-4 h-4 text-green-500"
        />
      </template>
      <template v-else>
        <UIcon
          name="i-heroicons-x-mark"
          class="w-4 h-4 text-red-500"
        />
      </template>
    </template>
    <template #role-data="{ row }: { row: Row }">
      <ColorDot :color="row.role?.color" />
    </template>
    <template #date-data="{ row }: { row: Row }">
      {{ formatDate(row.date, locale) }}
    </template>
    <template #employee-data="{ row }: { row: Row }">
      {{ row.employee?.name }}
    </template>
    <template #start_time-data="{ row }: { row: Row }">
      {{ formatTime(row.start_time) }}
    </template>
    <template #end_time-data="{ row }: { row: Row }">
      {{ formatTime(row.end_time) }}
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection
      v-if="error"
      :title="$t('errors.error')"
      :description="error.statusMessage"
    />
  </UDashboardPanelContent>
</template>
