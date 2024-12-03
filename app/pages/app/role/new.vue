<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New role'
})

</script>

<template>
  <UDashboardNavbar title="New role">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Role details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new role
    </p>
    <RoleForm @submit="navigateTo('/app/role')" />
  </UDashboardPanelContent>
</template>
