<script lang="ts" setup>
import type { TableColumn } from '#ui/types'

const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.settings.teams.label')
})

const { data, status, error, refresh } = await useFetch(
  '/api/team', {
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
    key: 'owner',
    label: t('form.team.ownerLabel'),
    class: 'w-32 text-right',
    rowClass: 'text-right'
  }
])

const expand = ref({
  openedRows: [],
  row: {}
})
</script>

<template>
  <UDashboardNavbar :title="$t('page.settings.teams.label')" :badge="data?.count ?? 0">
    <template #right>
      <UButton
:label="$t('buttons.refresh')" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton :label="$t('buttons.newTeam')" trailing-icon="i-heroicons-plus" color="gray" to="/app/settings/team/new" />
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
    <UDashboardSection v-if="error" :title="$t('errors.error')" :description="error.statusMessage" />
  </UDashboardPanelContent>
</template>
