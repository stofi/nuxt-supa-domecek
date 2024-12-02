<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const { data, status, error, refresh } = await useFetch(
  '/api/team', {
    headers: useRequestHeaders(['cookie'])
  }
)
</script>

<template>
  <UDashboardNavbar title="Teams" :badge="data?.count ?? 0">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton label="New Team" trailing-icon="i-heroicons-plus" color="gray" to="/app/team/new" />
    </template>
  </UDashboardNavbar>

  <UTable :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.message" />
  </UDashboardPanelContent>
</template>
