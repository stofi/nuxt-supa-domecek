<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Roles'
})

const { t } = useI18n()

const { data, status, error, refresh } = await useFetch(
  '/api/role', {
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
    key: 'color',
    label: t('form.role.colorLabel'),
    class: 'w-12',
    rowClass: 'text-center'
  },
  {
    key: 'shortname',
    label: t('form.role.shortnameLabel'),
    class: 'w-16',
    rowClass: 'text-right'
  },
  {
    key: 'priority',
    label: t('form.role.priorityLabel'),
    class: 'w-12 text-right',
    rowClass: 'text-right'
  }
])
</script>

<template>
  <UDashboardNavbar
    :title="$t('page.roles.label')"
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
        :label="$t('buttons.newRole')"
        trailing-icon="i-heroicons-plus"
        color="gray"
        to="/app/role/new"
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
    <template #color-data="{ row }: { row: Row }">
      <ColorDot :color="row.color" />
    </template>
    <template #priority-data="{ row }: { row: Row }">
      <UIcon
        v-if="row.priority"
        name="i-heroicons-check-circle-solid"
        class="w-4 h-4 text-green-500"
      />
      <UIcon
        v-else
        name="i-heroicons-x-mark"
        class="w-4 h-4 text-red-500"
      />
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
