<script setup lang="ts">
definePageMeta({
  layout: 'app-layout'
})
const links = [
  [
    {
      label: 'General',
      icon: 'i-heroicons-user-circle',
      to: '/app/settings',
      exact: true
    },
    {
      label: 'Team',
      icon: 'i-heroicons-users',
      to: '/app/settings/team'
    }
  ]
]
</script>

<template>
  <UDashboardNavbar title="Settings" />

  <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
    <UHorizontalNavigation :links="links" />
  </UDashboardToolbar>

  <NuxtPage />
</template>
