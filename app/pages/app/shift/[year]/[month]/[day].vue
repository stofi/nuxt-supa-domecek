<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const { t, locale } = useI18n()
const route = useRoute()

const date = computed(() => new Date(`${route.params.year}-${route.params.month}-${route.params.day}`))

const title = computed(() => `${t('page.shift.label')} - ${date.value ? formatDate(date.value, locale.value) : ''}`)

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
        :title="$t('page.shift.addTimeslot')"
      >
        <TimeslotForm :key="`timeslot-${data?.count ?? 0}`" :date="date" @submit="refresh" />
      </UDashboardCard>
    </div>
  </UDashboardPanelContent>
</template>
