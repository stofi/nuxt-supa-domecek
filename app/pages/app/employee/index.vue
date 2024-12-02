<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const { data, status, error, refresh } = await useFetch(
  '/api/employee', {
    headers: useRequestHeaders(['cookie'])
  }
)
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

  <UTable :rows="data?.data" :loading="status === 'pending'" sort-mode="manual" class="w-full">
  </UTable>

  <UDashboardSection v-if="error" title="Error" :description="error.message" />
</template>
