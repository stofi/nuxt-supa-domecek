<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.employees.label')
})

const { data, status, error, refresh } = await useFetch(
  '/api/employee', {
    headers: useRequestHeaders(['cookie'])
  }
)

type Row = NonNullable<typeof data['value']>['data'][number]

const columns = computed<TableColumn[]>(() => [
  {
    key: 'name',
    label: t('form.common.nameLabel')
  },
  {
    key: 'contract',
    label: t('form.employee.contractLabel'),
    class: 'w-12 text-right',
    rowClass: 'text-right'
  },
  {
    key: 'role',
    label: t('form.employee.roleLabel'),
    class: 'w-32 text-right',
    rowClass: 'text-right'
  }
])
</script>

<template>
  <UDashboardNavbar :title="$t('page.employees.label')" :badge="data?.count ?? 0">
    <template #right>
      <UButton
:label="$t('buttons.refresh')" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton :label="$t('buttons.newEmployee')" trailing-icon="i-heroicons-plus" color="gray" to="/app/employee/new" />
    </template>
  </UDashboardNavbar>

  <UTable :columns="columns" :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
    <template #role-data="{ row }: { row: Row }">
      <template v-if="row.role.length">
        <ColorDot v-for="role in row.role" :key="role.id" :color="role.color" class="mr-1" />
      </template>
      <template v-else>
        <span>
          <!-- There must be something here to prevent showing '[]' -->
        </span>
      </template>
    </template>
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" :title="$t('errors.error')" :description="error.statusMessage" />
  </UDashboardPanelContent>
</template>
