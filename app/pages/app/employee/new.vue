<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New employee'
})

</script>

<template>
  <UDashboardNavbar title="New employee">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Employee details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new employee
    </p>

    <EmployeeForm @submit="navigateTo('/app/employee')" />
  </UDashboardPanelContent>

</template>
