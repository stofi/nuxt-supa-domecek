<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New vacation'
})
</script>

<template>
  <UDashboardNavbar title="New vacation">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Vacation details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new vacation
    </p>

    <VactionForm @submit="navigateTo('/app/vacation')" />
  </UDashboardPanelContent>
</template>
