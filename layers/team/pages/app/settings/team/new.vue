<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.settings.team.new.label')
})

</script>

<template>
  <UDashboardNavbar :title="$t('page.settings.team.new.label')">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent :title="$t('page.settings.team.new.teamDetails')">
    <p class="mb-4 text-sm text-gray-500">
      {{ $t('page.settings.team.new.fillTeamDetails') }}
    </p>
    <TeamForm @submit="navigateTo('/app/settings/team')"/>
  </UDashboardPanelContent>
</template>
