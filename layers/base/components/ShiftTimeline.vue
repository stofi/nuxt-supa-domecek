<script lang="ts" setup>
import { computed } from 'vue'
import {
  DEFAULT_START,
  DEFAULT_END,
  DEFAULT_STEP
} from '~~/consts'
import type { Database } from '~~/types/supabase'

type Timeslot = Database['public']['Tables']['timeslot']['Row']
type Employee = Database['public']['Tables']['employee']['Row']
type Role = Database['public']['Tables']['role']['Row']

type TimeslotWithData = Timeslot & {
  employee?: Employee | null
  role?: Role | null
}

const props = defineProps<{
  timeslots?: TimeslotWithData[]
}>()

const timeslots = props.timeslots || []

const TIME_OPTIONS = buildTimeArray(DEFAULT_START, DEFAULT_END, DEFAULT_STEP)

const timeToSize = (start: string, end: string) => {
  const startIndex = TIME_OPTIONS.indexOf(formatTime(start))
  const endIndex = TIME_OPTIONS.indexOf(formatTime(end))
  const size = endIndex - startIndex
  return size / 24 * 100
}

const getWidthStyle = (startTime: string, endTime: string) =>
  ({ width: `${timeToSize(startTime, endTime)}%` })

const getStart = (item: TimeslotWithData) =>
  getWidthStyle(DEFAULT_START, item.start_time)

const getEnd = (item: TimeslotWithData) =>
  getWidthStyle(item.end_time, DEFAULT_END)

const getColor = (item: TimeslotWithData) =>
  (!item.role?.color) ? 'bg-gray-400' : `bg-${item.role.color}-500`

const getPriority = (item: TimeslotWithData) =>
  !!item.role?.priority

const getEmployeeName = (item: TimeslotWithData) =>
  item.employee?.name || ''

const validSlots = computed(() => {
  return timeslots.filter(item => item.start_time && item.end_time)
})

const invalidSlots = computed(() =>
  timeslots.filter(item => !(item.start_time && item.end_time))
)

const populatedSlots = computed(() =>
  validSlots.value.map(slot => ({
    ...slot,
    color: getColor(slot),
    priority: getPriority(slot)
  }))
)

const sortedSlots = computed(() =>
  populatedSlots.value.slice().sort((a, b) => {
    const A = a.priority
    const B = b.priority
    return A === B ? 0 : A ? -1 : 1
  })
)

function timeslotString(item: TimeslotWithData) {
  const roleName = item.role?.name || ''
  const employeeName = getEmployeeName(item)
  return `${roleName}${employeeName}${item.start_time}${item.end_time}`
}
</script>

<template>
  <ul>
    <li v-for="item in sortedSlots" :key="timeslotString(item)" class="flex">
      <div class="flex-initial" :style="getStart(item)"></div>
      <button
class="mb-1 h-6 rounded-sm whitespace-nowrap px-1 flex items-center gap-1 flex-auto" :class="item.color"
        @click="$emit('click', timeslotString(item))">
        <span class="text-gray-50 text-xs">
          {{ formatTime(item.start_time) }}
        </span>
        <span class="px-2 leading-none text-gray-900">
          {{ getEmployeeName(item) }}
        </span>
        <span class="ml-auto text-gray-50 text-xs">
          {{ formatTime(item.end_time) }}
        </span>
      </button>
      <div class="flex-initial" :style="getEnd(item)"></div>
    </li>
  </ul>
</template>
