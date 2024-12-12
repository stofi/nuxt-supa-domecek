<script lang="ts" setup>
import type { ComponentInstance } from 'vue'

import ShiftTimeline from '~base/components/ShiftTimeline.vue'
import { css } from '~base/printCss'

definePageMeta({
  layout: 'app-layout'
})

const { t, locale } = useI18n()
const route = useRoute()
const shiftRef = ref<ComponentInstance<typeof ShiftTimeline>>()

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
      date: date.value?.toISOString().split('T')[0]
    },
    headers: useRequestHeaders(['cookie'])
  }
)

const handleUpdate = async () => {
  await refresh()
}

const scrollToTimeslot = (timeslotId: number) => {
  const id = `timeslot-id-${timeslotId}`
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const dayPage = ref<HTMLElement | null>(null)

let Printd: typeof import('printd').Printd | null = null

if (window) {
  Printd = await import('printd').then(module => module.Printd)
}
const printer = Printd ? new Printd() : null

const printDay = async () => {
  if (!printer) return
  const $target = dayPage.value
  if (!$target) return
  printer.print($target, [css,
    `@page{size: A4 landscape;margin:0;orientation: landscape}`
  ])
  console.log($target, printer)
}
</script>

<template>
  <UDashboardNavbar :title="title">
    <template #right>
      <UButton
        :label="$t('buttons.print')"
        trailing-icon="i-heroicons-printer"
        color="gray"
        @click="printDay"
      />
    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <UDashboardSection
      v-if="data?.count"
      :title="$t('page.shift.timelineLabel')"
    >
      <ShiftTimeline
        ref="shiftRef"
        :timeslots="data?.data"
        @click="scrollToTimeslot"
      />
    </UDashboardSection>
    <UDashboardSection
      v-if="data?.count"
      :title="$t('page.shift.timeslotsLabel')"
    >
      <div class="flex flex-col gap-6">
        <UDashboardCard
          v-for="slot in data?.data"
          :id="`timeslot-id-${slot.id}`"
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
            :date="date ?? undefined"
            autosave
            deleteable
            @submit="handleUpdate"
          />
        </UDashboardCard>
      </div>
    </UDashboardSection>
    <UDashboardSection :title="$t('page.shift.addTimeslot')">
      <UDashboardCard>
        <TimeslotForm
          :key="`timeslot-${changeKey}`"
          :date="date ?? undefined"
          @submit="handleUpdate"
        />
      </UDashboardCard>
    </UDashboardSection>
  </UDashboardPanelContent>
  <div
    v-show="false"
    class="absolute top-0"
  >
    <div
      ref="dayPage"
    >
      <DayPrint
        v-if="data?.data"
        :timeslots="data.data"
        :title="title"
      />
    </div>
  </div>
</template>
