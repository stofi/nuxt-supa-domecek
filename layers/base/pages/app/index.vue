<script lang="ts" setup>
import { Calendar } from 'v-calendar'
import { format, startOfMonth, endOfMonth } from 'date-fns'

type DayContent = {
  day: {
    year: string
    month: string
    day: string
    date: Date
  }
}

format(new Date(2020, 1, 10), 'EEEE')

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const { locale, t } = useI18n()
const today = new Date()
const startDate = ref(startOfMonth(today).toISOString().split('T')[0])
const endDate = ref(endOfMonth(today).toISOString().split('T')[0])

const { data, status, refresh } = await useFetch(
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
  title: t('page.dashboard.label')
})

const getTimeslotsPerDay = ({ day, month, year }: DayContent['day']) => {
  month = `${month}`.padStart(2, '0')
  day = `${day}`.padStart(2, '0')
  const date = new Date(`${year}-${month}-${day}`)
  const dateString = date.toISOString().split('T')[0]
  return {
    timeslots: data.value?.data.filter(slot => slot.date === dateString)
  }
}

const handleUpdate = (pages) => {
  startDate.value = new Date(pages[0].days.at(0).date)?.toISOString().split('T')[0]
  endDate.value = new Date(pages[0].days.at(-1).date)?.toISOString().split('T')[0]
}
</script>

<template>
  <UDashboardNavbar :title="$t('page.dashboard.label')">
    <template #right>
      <UButton
        :label="$t('buttons.refresh')"
        icon="i-heroicons-arrow-path"
        color="gray"
        :loading="status === 'pending'"
        @click="refresh()"
      />
      <UButton
        :label="$t('buttons.print')"
        trailing-icon="i-heroicons-printer"
        color="gray"
        to="/app"
      />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <ClientOnly>
      <Calendar
        disable-page-swipe
        expanded
        :is-dark="isDark"
        show-weeknumbers
        :locale="locale"
        @update:pages="handleUpdate"
      >
        <template #day-content="{ day } : DayContent">
          <div
            class="h-full p-0.5 group"
            role="button"
            tabindex="0"
            @click="navigateTo(`/app/shift/${day.year}/${day.month}/${day.day}`)"
          >
            <TimeslotDashboardCard
              :date="day.date"
              :timeslots="getTimeslotsPerDay(day)?.timeslots ?? []"
            />
          </div>
        </template>
      </Calendar>
    </ClientOnly>
  </UDashboardPanelContent>
</template>
