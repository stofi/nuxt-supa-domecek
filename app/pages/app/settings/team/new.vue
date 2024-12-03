<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New team'
})

</script>

<template>
  <UDashboardNavbar title="New team">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Vacation details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new team
    </p>
    <TeamForm @submit="navigateTo('/app/settings/team')"/>
  </UDashboardPanelContent>
</template>
