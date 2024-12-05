<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

const { t, locale } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.vacations.label')
})

const { data, status, error, refresh } = await useFetch(
  '/api/vacation', {
    headers: useRequestHeaders(['cookie'])
  }
)

type Row = NonNullable<typeof data['value']>['data'][number]

const columns = computed<TableColumn[]>(() => [
  {
    key: 'date',
    label: t('form.vacation.dateLabel'),
    class: 'w-32'
  },
  {
    key: 'employee',
    label: t('form.vacation.employeeLabel')
  }
])

</script>

<template>
  <UDashboardNavbar :title="$t('page.vacations.label')" :badge="data?.count ?? 0">
    <template #right>
      <UButton
:label="$t('buttons.refresh')" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton :label="$t('buttons.newVacation')" trailing-icon="i-heroicons-plus" color="gray" to="/app/vacation/new" />
    </template>
  </UDashboardNavbar>

  <UTable :columns="columns" :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">

    <template #employee-data="{ row }: { row: Row }">
      {{ row.employee?.name }}
    </template>
    <template #date-data="{ row }: { row: Row }">
      {{ formatDate(row.date, locale) }}
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" :title="$t('errors.error')" :description="error.statusMessage" />
  </UDashboardPanelContent>

</template>
