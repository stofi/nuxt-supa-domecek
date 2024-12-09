<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const { t, locale } = useI18n()
const route = useRoute()

const changeKey = ref(0)

const date = computed(() => {
  const year = route.params.year
  let { month, day } = route.params
  month = `${month}`.padStart(2, '0')
  day = `${day}`.padStart(2, '0')
  const date = new Date(`${year}-${month}-${day}`)
  return isNaN(date.getTime()) ? null : date
})

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

const handleUpdate = async () => {
  await refresh()
  changeKey.value++
}
</script>

<template>
  <UDashboardNavbar :title="title">
    <template #right>
      <UButton
        :label="$t('buttons.print')"
        trailing-icon="i-heroicons-printer"
        color="gray"
        to="/app"
      />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <UDashboardSection :title="$t('page.shift.timelineLabel')">
      <ShiftTimeline
        :key="changeKey"
        :timeslots="data?.data"
      />
    </UDashboardSection>
    <UDashboardSection :title="$t('page.shift.timeslotsLabel')">
      <div class="flex flex-col gap-6">
        <UDashboardCard
          v-for="slot in data?.data"
          :key="`timeslot-id-${slot.id}`"
        >
          <TimeslotForm
            :id="slot.id"
            :initial-state="{
              end_time: slot.end_time,
              start_time: slot.start_time,
              employee_id: slot.employee_id ?? undefined,
              role_id: slot.role_id ?? undefined,
              break: slot.break
            }"
            :date="date"
            @submit="handleUpdate"
          />
        </UDashboardCard>
      </div>
    </UDashboardSection>
    <UDashboardSection :title="$t('page.shift.addTimeslot')">
      <UDashboardCard>
        <TimeslotForm
          :key="`timeslot-${changeKey}`"
          :date="date"
          @submit="handleUpdate"
        />
      </UDashboardCard>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
