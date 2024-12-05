<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.settings.label')
})
const links = computed(() => [
  [
    {
      label: t('page.settings.general.label'),
      icon: 'i-heroicons-user-circle',
      to: '/app/settings',
      exact: true
    },
    {
      label: t('page.settings.teams.label'),
      icon: 'i-heroicons-users',
      to: '/app/settings/team'
    }
  ]
])
</script>

<template>
  <UDashboardNavbar :title="$t('page.settings.label')" />

  <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
    <UHorizontalNavigation :links="links" />
  </UDashboardToolbar>

  <NuxtPage />
</template>
