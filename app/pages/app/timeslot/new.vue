<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.timeslot.new.label')
})

</script>

<template>
  <UDashboardNavbar :title="$t('page.timeslot.new.label')">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent :title="$t('page.timeslot.new.details')">
    <p class="mb-4 text-sm text-gray-500">
      {{ $t('page.timeslot.new.fillTimeslotDetails') }}
    </p>

    <TimeslotForm @submit="navigateTo('/app/timeslot')" />
  </UDashboardPanelContent>
</template>
