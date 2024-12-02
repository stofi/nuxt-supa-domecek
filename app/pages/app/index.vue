<script lang="ts" setup>
import { Calendar } from 'v-calendar'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'

format(new Date(2020, 1, 10), 'EEEE')

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const { data, status, error, refresh } = await useFetch(
  '/api/shift', {
    headers: useRequestHeaders(['cookie'])
  }
)

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Dashboard'
})

const getShift = ({ day, month, year }: { day: string, month: string, year: string }) => {
  const date = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0]
  return data.value?.data.find(shift => shift.date === date)
}

</script>

<template>
  <UDashboardNavbar title="Dashboard">
    <template #right>
      <UButton label="Refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status==='pending'" @click="refresh()" />
      <UButton label="Print" trailing-icon="i-heroicons-printer" color="gray" to="/app/shift/new" />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <ClientOnly>
      <Calendar expanded :is-dark="isDark" show-weeknumbers locale="cs">
        <template #day-content="x">
          <div class="h-full p-1 ">
            <div class="h-full px-2 py-1 border border-gray-200 rounded dark:border-gray-800">
              <div class="font-semi mb-1">
                {{ format(x.day.date, 'EEEE', { locale: cs }) }} {{ x.day.day }}.
              </div>

              <div class="grid">
                <div v-for="slot in getShift(x.day)?.timeslot" :key="slot.id">
                  <ColorDot :color="slot.role?.color ?? null" />
                  {{ slot.employee?.name }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </Calendar>
    </ClientOnly>
  </UDashboardPanelContent>
</template>
