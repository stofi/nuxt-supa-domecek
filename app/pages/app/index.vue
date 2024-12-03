<script lang="ts" setup>
import { Calendar } from 'v-calendar'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { cs } from 'date-fns/locale'

format(new Date(2020, 1, 10), 'EEEE')

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const today = new Date()
const startDate = ref(startOfMonth(today).toISOString().split('T')[0])
const endDate = ref(endOfMonth(today).toISOString().split('T')[0])

const { data, status, error, refresh } = await useFetch(
  '/api/timeslot', {
    headers: useRequestHeaders(['cookie']),
    query: {
      from: startDate,
      to: endDate
    },
    immediate: false
  }
)

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Dashboard'
})

const getTimeslotsPerDay = ({ day, month, year }: { day: string, month: string, year: string }) => {
  const date = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0]
  return {
    timeslots: data.value?.data.filter(slot => slot.date === date)
  }
}

const handleUpdate = (pages) => {
  startDate.value = new Date(pages[0].days.at(0).date)?.toISOString().split('T')[0]
  endDate.value = new Date(pages[0].days.at(-1).date)?.toISOString().split('T')[0]
}
</script>

<template>
  <UDashboardNavbar title="Dashboard">
    <template #right>
      <UButton
label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'"
        @click="refresh()" />
      <UButton label="Print" trailing-icon="i-heroicons-printer" color="gray" to="/app" />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <ClientOnly>
      <Calendar trim-weeks expanded :is-dark="isDark" show-weeknumbers locale="cs" @update:pages="handleUpdate">
        <template #day-content="x">
          <div
class="h-full p-0.5 group" role="button"
            tabindex="0"
            @click="navigateTo(`/app/shift/${x.day.year}/${x.day.month}/${x.day.day}`)"
          >
            <UDashboardCard
              :ui="{
                background: 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800',
                ring:'dark:ring-0 group-focus:ring-2 group-focus:ring-primary-400', rounded: 'rounded-sm', base: 'h-full min-h-32', body: { padding: 'px-2 sm:px-2 sm:py-1 py-1' } }"
              >
              <div class="font-semi mb-1">
                {{ format(x.day.date, 'EEEE', { locale: cs }) }} {{ x.day.day }}.
              </div>

              <div v-if="getTimeslotsPerDay(x.day)" class="grid">
                <div v-for="slot in getTimeslotsPerDay(x.day)?.timeslots" :key="slot.id">
                  <ColorDot :color="slot.role?.color" />
                  {{ slot.employee?.name }}
                </div>
              </div>
              <div v-else>
                <div class="text-gray-400 text-sm">No shift</div>
              </div>
            </UDashboardCard>
          </div>
        </template>
      </Calendar>
    </ClientOnly>
  </UDashboardPanelContent>
</template>
