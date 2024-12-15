<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { format, getMonth, getYear, startOfMonth, endOfMonth, eachDayOfInterval, getISOWeek, getDay } from 'date-fns'
import type { TimeslotWithData, Employee } from '~/types'

type WeekDayTimeslot = {
  date: string
  day: string
  role: string
  start: string
  end: string
  total?: string
}
type WeekDayMainTimeslot = WeekDayTimeslot & {
  rest?: WeekDayTimeslot[]
}
type WeekDay = { title: string, children: WeekDayMainTimeslot[] }

// Props
const props = defineProps<{
  timeslots: TimeslotWithData[]
  title: string
}>()

// ---- Helper Functions ----
const DEFAULT_TIME_OPTIONS = buildHalfHourSlots()

function buildHalfHourSlots() {
  // Builds a list of times "HH:mm" from 00:00 to 23:30
  const slots: string[] = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      slots.push(`${hh}:${mm}`)
    }
  }
  return slots
}

function readableHours(hours: number, hSuffix = 'h', mSuffix = 'm'): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (m > 0) {
    return `${h}${hSuffix} ${m}${mSuffix}`
  }
  return `${h}${hSuffix}`
}

function getWorkTime(days: Date[], subHolidays = false): number {
  const holidays = [
    '1 1',
    '10 4',
    '13 4',
    '1 5',
    '8 5',
    '5 7',
    '6 7',
    '28 9',
    '28 10',
    '17 11',
    '24 12',
    '25 12',
    '26 12'
  ]
  const weekdays = days.filter(day => !(day.getDay() == 0 || day.getDay() == 6))
  const workingdays = weekdays.filter((day) => {
    const date = day.getDate()
    const month = day.getMonth() + 1
    return holidays.indexOf(`${date} ${month}`) == -1
  })
  const workdays = subHolidays ? weekdays : workingdays

  return workdays.length * 8
}

// Given timeslots, find the month and year
const monthYear = computed(() => {
  if (!props.timeslots.length) {
    // If empty, just fallback to current month
    const now = new Date()
    return { month: getMonth(now), year: getYear(now) }
  }
  // Take the first timeslot's date as reference
  const refDate = new Date(props.timeslots[0]!.date)
  return { month: getMonth(refDate), year: getYear(refDate) }
})

// Get all days in the reference month
const daysInMonth = computed<Date[]>(() => {
  const start = startOfMonth(new Date(monthYear.value.year, monthYear.value.month, 1))
  const end = endOfMonth(start)
  return eachDayOfInterval({ start, end })
})

// Helper: format date
function localeDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

function localeDay(date: Date): string {
  return format(date, 'EEEE') // Full weekday name
}

// Filter timeslots to the given month
const monthTimeslots = computed(() => {
  return props.timeslots.filter((ts) => {
    const d = new Date(ts.date)
    return getMonth(d) === monthYear.value.month && getYear(d) === monthYear.value.year
  })
})

// Group timeslots by date
const timeslotsByDate = computed(() => {
  const map = new Map<string, TimeslotWithData[]>()
  for (const ts of monthTimeslots.value) {
    const dStr = localeDate(new Date(ts.date))
    if (!map.has(dStr)) {
      map.set(dStr, [])
    }
    map.get(dStr)?.push(ts)
  }
  return map
})

// Calculate hours totals per role
const hoursByRole = computed(() => {
  // structure { [roleName: string]: totalHours }
  const acc: Record<string, number> = {}
  for (const ts of monthTimeslots.value) {
    const startIndex = DEFAULT_TIME_OPTIONS.indexOf(formatTime(ts.start_time))
    const endIndex = DEFAULT_TIME_OPTIONS.indexOf(formatTime(ts.end_time))
    if (startIndex >= 0 && endIndex > startIndex) {
      let time = (endIndex - startIndex) / 2 // half-hour steps
      if (ts.break) time -= 0.5
      if (time < 0) time = 0
      const roleName = ts.role?.name || 'x'
      acc[roleName] = (acc[roleName] || 0) + time
    }
  }
  return Object.entries(acc).map(([name, total]) => ({ name, total }))
})

// Total hours
const totalHours = computed(() => hoursByRole.value.reduce((p, c) => p + c.total, 0))

// worktimefund
const worktimefund = computed(() => getWorkTime(daysInMonth.value))

// Determine an employee object (if available)
// Assume all timeslots are for the same employee
const employeeObj = computed<Employee | null>(() =>
  monthTimeslots.value[0]?.employee ?? null
)

// Build weeks data
// We will group days by ISOWeek and create the structure similar to original code
const weeks = computed(() => {
  const weeksMap: Record<number, WeekDay> = {}
  for (const day of daysInMonth.value) {
    const dStr = localeDate(day)
    const isoW = getISOWeek(day)
    const weekDay = (getDay(day) + 6) % 7 // shift so Monday=0, Sunday=6
    if (!weeksMap[isoW]) {
      weeksMap[isoW] = {
        title: `Týden ${isoW}`,
        children: Array(7).fill(null)
      }
    }
    const slots = timeslotsByDate.value.get(dStr) || []
    // First slot considered main, others considered rest
    const mainSlot = slots[0]
    const restSlots = slots.slice(1)
    if (!mainSlot) {
      // empty day
      weeksMap[isoW].children[weekDay] = {
        date: dStr,
        day: localeDay(day),
        role: '',
        start: '',
        end: ''
      }
    } else {
      const time = calcSlotHours(mainSlot)
      const formattedTotal = time > 0 ? readableHours(time) : ''
      weeksMap[isoW].children[weekDay] = {
        // ...mainSlot,
        date: dStr,
        day: localeDay(day),
        role: mainSlot.role?.name || '',
        start: formatTime(mainSlot.start_time),
        end: formatTime(mainSlot.end_time),
        total: formattedTotal,
        rest: restSlots.map(r => ({
          // ...r,
          date: dStr,
          day: localeDay(day),
          role: r.role?.name || '',
          start: formatTime(r.start_time),
          end: formatTime(r.end_time),
          total: calcSlotHours(r) > 0 ? readableHours(calcSlotHours(r)) : ''
        }))
      }
    }
  }

  // Flatten rest slots similar to original code
  const finalWeeks = Object.values(weeksMap).map((week) => {
    // Flatten children so that rest are displayed as separate rows
    const flattened: WeekDayTimeslot[] = []
    week.children.forEach((item) => {
      if (!item) return
      flattened.push(item)
      if (item.rest) {
        item.rest.forEach(r => flattened.push(r))
      }
    })
    return {
      ...week,
      children: flattened
    }
  })
  return finalWeeks
})

function calcSlotHours(slot: TimeslotWithData): number {
  const startIndex = DEFAULT_TIME_OPTIONS.indexOf(formatTime(slot.start_time))
  const endIndex = DEFAULT_TIME_OPTIONS.indexOf(formatTime(slot.end_time))
  if (startIndex < 0 || endIndex <= startIndex) return 0
  let time = (endIndex - startIndex) / 2
  if (slot.break) time -= 0.5
  return Math.max(time, 0)
}

function formatTime(time?: string): string {
  if (!time) return ''
  const parts = time.split(':')
  if (parts.length === 3) {
    return parts.slice(0, 2).join(':')
  }
  return time
}

const meta = computed(() => ({
  title: props.title,
  date: `${format(startOfMonth(new Date(monthYear.value.year, monthYear.value.month, 1)), 'dd.MM.yyyy')} - ${format(endOfMonth(new Date(monthYear.value.year, monthYear.value.month, 1)), 'dd.MM.yyyy')}`,
  employee: employeeObj.value,
  hours: {
    fund: worktimefund.value,
    total: readableHours(totalHours.value, ' ' + 'hod', ' ' + 'min'),
    children: hoursByRole.value.map(hour => ({
      ...hour,
      total: readableHours(hour.total, ' ' + 'hod', ' ' + 'min')
    }))
  },
  specials: [] as { name: string, date: string }[]
}))
</script>

<template>
  <article
    class="leading-snug w-4/5"
    style="width:210mm"
  >
    <header class="leading-tight">
      <div class="pb-2">
        <h1 class="text-center text-xl font-bold">
          {{ meta.title }}
        </h1>
        <h2 class="text-center font-bold">
          Rozpis Směn
        </h2>
        <h2 class="text-center">
          {{ meta.date }}
        </h2>
      </div>
      <div class="flex justify-between">
        <div class="font-bold">
          <div>
            {{ meta.employee?.name ?? 'n/a' }}
          </div>
        </div>
        <div v-if="meta.employee?.contract">
          Úvazek: {{ (meta.employee.contract * meta.hours.fund) / 100 }}
          ({{ meta.hours.fund }} &times; {{ meta.employee.contract / 100 }})
        </div>
        <div v-else>
          Fond pracovní doby: {{ meta.hours.fund }}
        </div>
        <div class="text-right">
          <div class="font-bold">
            <span>{{ meta.hours.total }}</span>
          </div>
          <div
            v-for="group in meta.hours.children"
            :key="group.name"
          >
            {{ group.total }} {{ group.name }}
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="special in meta.specials"
          :key="special.name"
        >
          <span class="font-bold"> {{ special.name }}: </span>
          {{ special.date }}
        </div>
      </div>
    </header>
    <div class="pt-4 mx-auto">
      <div
        v-for="week in weeks"
        :key="week.title"
        class="pb-2"
      >
        <h3>{{ week.title }}</h3>
        <table class="table-fixed w-full text-sm">
          <tr
            v-for="(item, index) in week.children.filter(Boolean)"
            :key="index"
            :class="{ 'bg-gray-200': index > 4 }"
          >
            <template v-if="item">
              <td>
                <span v-if="item.day">{{ item.day }}</span>
              </td>
              <td>
                <span v-if="item.date">{{ item.date }}</span>
              </td>
              <td class="text-center">
                {{ item.start }} - {{ item.end }}
              </td>
              <td class="text-right">
                <span>{{ item.role }}</span>
              </td>
              <td class="text-right">
                <span v-if="item.total">{{ item.total }}</span>
              </td>
            </template>
            <td
              v-else
              colspan="4"
              class="pt-4"
            />
          </tr>
        </table>
      </div>
    </div>
  </article>
</template>
