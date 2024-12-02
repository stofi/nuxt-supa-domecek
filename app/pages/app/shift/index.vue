<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
const { data, status, error, refresh } = await useFetch(
  '/api/shift', {
    headers: useRequestHeaders(['cookie'])
  }
)
</script>

<template>
  <UDashboardNavbar title="Shifts" :badge="data?.count ?? 0">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh" />
      <UButton label="New Shift" trailing-icon="i-heroicons-plus" color="gray" to="/app/shift/new" />
    </template>
  </UDashboardNavbar>

  <UTable :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
  </UTable>

  <UDashboardPanelContent>
    <UDashboardSection v-if="error" title="Error" :description="error.message" />
  </UDashboardPanelContent>
</template>
