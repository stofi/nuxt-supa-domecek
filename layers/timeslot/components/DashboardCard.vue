<script lang="ts" setup>
import { format } from 'date-fns'
import { cs, enUS } from 'date-fns/locale'
import type { TimeslotWithData } from '~/types'

const { locale } = useI18n()

defineProps<{
  date: Date
  timeslots: TimeslotWithData[]
}>()
</script>

<template>
  <UDashboardCard
    :ui="{
      background: 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800',
      ring: 'dark:ring-0 group-focus:ring-2 group-focus:ring-primary-400',
      rounded: 'rounded-sm',
      base: 'h-full min-h-32',
      body: { padding: 'px-2 sm:px-2 sm:py-1 py-1' }
    }"
  >
    <div class="font-bold mb-1 leading-none py-0.5 text-sm">
      {{ format(new Date(date), 'EEEE do', { locale: locale === 'cs' ? cs : enUS }) }}
    </div>

    <div class="grid gap-1">
      <div
        v-for="slot in timeslots"
        :key="slot.id"
        class="px-1 rounded-sm flex items-center h-6 text-md font-semibold"
        :class="getColorClass(slot.role?.color)"
      >
        <div
          v-if="slot.employee?.name"
          :title="slot.employee?.name"
          class="truncate max-w-28 "
        >
          {{ slot.employee?.name }}
        </div>
        <UIcon
          v-else
          name="i-heroicons-question-mark-circle"
        />
      </div>
    </div>
  </UDashboardCard>
</template>
