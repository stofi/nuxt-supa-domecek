<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New timeslot'
})

</script>

<template>
  <UDashboardNavbar title="New timeslot">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Timeslot details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new timeslot
    </p>

    <TimeslotForm @submit="navigateTo('/app/timeslot')"/>
  </UDashboardPanelContent>
</template>
