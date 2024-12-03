<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const route = useRoute()

const date = computed(() => new Date(`${route.params.year}-${route.params.month}-${route.params.day}`))

const title = computed(() => `Shift - ${formatDate(date.value)}`)

useHead({
  title
})

const { data, status, error, refresh } = await useFetch(
  '/api/timeslot', {
    query: {
      date: date.value.toISOString().split('T')[0]
    },
    headers: useRequestHeaders(['cookie'])
  }
)

</script>

<template>
  <UDashboardNavbar :title="title">
    <template #right>
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <!-- <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <pre v-else>{{ JSON.stringify(data?.data, null, 2) }}</pre>

    <button @click="refresh()">Refresh</button> -->

    <div class="grid grid-cols-1 gap-6">
      <UDashboardCard
      v-for="slot in data?.data" :key="`timeslot-id-${slot.id}`">
        <TimeslotForm
:id="slot.id" :initial-state="{
          end_time: slot.end_time,
          start_time: slot.start_time,
          employee_id: slot.employee_id ?? undefined,
          role_id: slot.role_id ?? undefined,
          break: slot.break
        }" :date="date" @submit="refresh" />
      </UDashboardCard>
      <UDashboardCard
        title="Create Timeslot"
      >
        <TimeslotForm :key="`timeslot-${data?.count ?? 0}`" :date="date" @submit="refresh" />
      </UDashboardCard>
    </div>
  </UDashboardPanelContent>
</template>
