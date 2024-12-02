<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
</script>

<template>
  <UDashboardNavbar title="Dashboard">
    <template #right>
      <UButton label="Refresh" icon="i-heroicons-arrow-path" color="gray" />
      <UButton label="Print" trailing-icon="i-heroicons-printer" color="gray" to="/app/shift/new" />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
  </UDashboardPanelContent>
</template>
