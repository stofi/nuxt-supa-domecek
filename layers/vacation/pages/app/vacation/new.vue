<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.vacation.new.label')
})
</script>

<template>
  <UDashboardNavbar :title="$t('page.vacation.new.label')">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent :title="$t('page.vacation.new.vacationDetails')">
    <p class="mb-4 text-sm text-gray-500">
        {{ $t('page.vacation.new.fillVacationDetails') }}
    </p>

    <VacationForm @submit="navigateTo('/app/vacation')" />
  </UDashboardPanelContent>
</template>
