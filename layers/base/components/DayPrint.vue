<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { DEFAULT_END, DEFAULT_START, DEFAULT_STEP } from '~/consts'
import type { TimeslotWithData, Employee, Role } from '~/types'

// ---- Types ----
interface GroupedEmployee {
  employee: Employee
  role: Role | null
  timeslots: TimeslotWithData[]
  shiftStart: string
  priority: boolean
  better_hours?: HourIncrement[]
}

interface HourIncrement {
  name: string
  span: number
}

// ---- Props ----
const props = defineProps<{
  timeslots: TimeslotWithData[]
  title: string
}>()

function groupTimeslotsByEmployee(timeslots: TimeslotWithData[]): Record<number, Omit<GroupedEmployee, 'priority' | 'better_hours'>> {
  return timeslots.reduce((acc, ts) => {
    const employee = ts.employee
    if (!employee) return acc

    const eId = employee.id
    if (!acc[eId]) {
      acc[eId] = {
        employee,
        role: ts.role || null,
        timeslots: [ts],
        shiftStart: ts.start_time
      }
    } else {
      acc[eId].timeslots.push(ts)
      // Update earliest shift start
      if (ts.start_time < acc[eId].shiftStart) {
        acc[eId].shiftStart = ts.start_time
      }
      // Update role if needed
      if (ts.role && (!acc[eId].role || ts.role.name < acc[eId].role.name)) {
        acc[eId].role = ts.role
      }
    }
    return acc
  }, {} as Record<number, Omit<GroupedEmployee, 'priority' | 'better_hours'>>)
}

function sortByRoleAndShiftStart(employees: Omit<GroupedEmployee, 'priority' | 'better_hours'>[]): Omit<GroupedEmployee, 'priority' | 'better_hours'>[] {
  const getStart = (obj: typeof employees[0]) => Number(obj.shiftStart.replace(':', ''))
  return employees.sort((a, b) => {
    if (!a.role || !a.role.name || a.timeslots.length === 0) return -1
    if (!b.role || !b.role.name || b.timeslots.length === 0) return 1

    const aStart = getStart(a)
    const bStart = getStart(b)

    if (a.role.name === b.role.name) {
      return aStart - bStart
    }

    return a.role.name > b.role.name ? 1 : -1
  })
}

function addPriority(employees: Omit<GroupedEmployee, 'priority' | 'better_hours'>[]): Omit<GroupedEmployee, 'better_hours'>[] {
  return employees.map(e => ({
    ...e,
    priority: e.role ? e.role.priority : false
  }))
}

function sortByPriority(employees: Omit<GroupedEmployee, 'better_hours'>[]): Omit<GroupedEmployee, 'better_hours'>[] {
  return employees.sort(({ priority: a }, { priority: b }) => (a === b ? 0 : a ? -1 : 1))
}

function buildBetterHours(e: GroupedEmployee, timeOptions: string[]): HourIncrement[] {
  const increments = createIncrements(timeOptions)
  fillIncrements(increments, e.timeslots, timeOptions)
  return mergeConsecutiveIncrements(increments)
}

function createIncrements(timeOptions: string[]): HourIncrement[] {
  // increments represent intervals between timeOptions[i] and timeOptions[i+1]
  return timeOptions.slice(0, -1).map(() => ({ name: '', span: 1 }))
}

function fillIncrements(increments: HourIncrement[], timeslots: TimeslotWithData[], timeOptions: string[]) {
  timeslots.forEach((ts) => {
    const startIndex = timeOptions.indexOf(formatTime(ts.start_time))
    const endIndex = timeOptions.indexOf(formatTime(ts.end_time))
    if (startIndex >= 0 && endIndex > startIndex) {
      const slotName = ts.role?.shortname || ts.role?.name || ''
      for (let i = startIndex; i < endIndex && i < increments.length; i++) {
        increments[i]!.name = slotName
      }
    }
  })
}

function mergeConsecutiveIncrements(increments: HourIncrement[]): HourIncrement[] {
  const merged: HourIncrement[] = []
  let current: HourIncrement | null = null
  for (const inc of increments) {
    if (!current) {
      current = { ...inc }
    } else {
      if (inc.name === current.name) {
        current.span += 1
      } else {
        merged.push(current)
        current = { ...inc }
      }
    }
  }
  if (current) merged.push(current)
  return merged
}

// ---- Computed Properties ----
const FULL_TIME_OPTIONS = buildTimeArray(DEFAULT_START, DEFAULT_END, DEFAULT_STEP)

// timeslices similar to original code (exclude last)
const timeslices = computed<string[]>(() => FULL_TIME_OPTIONS.slice(0, -1))

// Step 1: Group timeslots by employee
const byEmployee = computed<Record<number, Omit<GroupedEmployee, 'priority' | 'better_hours'>>>(() =>
  groupTimeslotsByEmployee(props.timeslots)
)

// Step 2: Convert to array
const employeesBase = computed(() =>
  Object.values(byEmployee.value)
)

// Step 3: Sort by role and shift start
const employeesRoleShiftSorted = computed(() =>
  sortByRoleAndShiftStart(employeesBase.value)
)

// Step 4: Add priority flag
const employeesWithPriority = computed(() =>
  addPriority(employeesRoleShiftSorted.value)
)

// Step 5: Sort by priority
const employeesPrioritySorted = computed(() =>
  sortByPriority(employeesWithPriority.value)
)

// Step 6: Add better_hours to each employee
const employeesWithBetterHours = computed<GroupedEmployee[]>(() =>
  employeesPrioritySorted.value.map((e) => {
    const completeEmployee: GroupedEmployee = {
      ...e,
      better_hours: buildBetterHours(e as GroupedEmployee, FULL_TIME_OPTIONS)
    }
    return completeEmployee
  })
)

// Final employees array
const employeesSorted = computed(() => employeesWithBetterHours.value)

// Padding rows
const padded = computed(() => new Array(Math.max(28 - employeesSorted.value.length, 0)))
</script>

<!-- style="width:294mm;height: 210mm;" -->
<template>
  <article
    class="leading-snug"
    :style="{
      width: '297mm',
      height: '210mm',
      margin: '0',
      position: 'absolute',
      top: '0'
    }"
  >
    <header class="leading-tight">
      <div class="pb-2">
        <h1 class="text-xl font-bold">
          {{ title }}
        </h1>
      </div>
    </header>
    <div class="pt-4 mx-auto">
      <table class="table-fixed w-full text-sm">
        <tr>
          <th colspan="6" />
          <th
            v-for="(_, hour) in timeslices"
            :key="hour"
          >
            <span v-if="(hour + 1) & 1">
              {{ _ }}
            </span>
          </th>
        </tr>
        <tr
          v-for="(employee, index) in employeesSorted"
          :key="index"
        >
          <td
            style="white-space:nowrap"
            colspan="2"
          >
            <template v-if="employee.role">
              <span
                v-if="employee.role.name"
                :class="{ 'font-bold': employee.priority }"
              >
                {{ employee.role.name }}
              </span>
              <span v-if="employee.role.shortname">
                ({{ employee.role.shortname }})
              </span>
            </template>
          </td>
          <td
            colspan="4"
            class="w-10"
            :class="{ 'font-bold': employee.priority }"
          >
            {{ employee.employee.name }}
          </td>
          <td
            v-for="(hour, hIndex) in employee.better_hours"
            :key="hIndex"
            :colspan="hour.span"
            :class="hour.name ? 'bg-gray-300' : ''"
          >
            <span v-if="hour">
              {{ hour.name }}
            </span>
          </td>
        </tr>
        <tr
          v-for="(_, pIndex) in padded"
          :key="`padded-${pIndex}`"
        >
          <td
            colspan="2"
            class="w-10"
          >
            <div class="hidden">
              blank
            </div>
          </td>
          <td
            colspan="4"
            class="w-10"
          >
            <div class="hidden">
              blank
            </div>
          </td>
          <td
            v-for="(_, hour) in timeslices"
            :key="hour"
          >
            <div class="hidden">
              blank
            </div>
          </td>
        </tr>
      </table>
    </div>
  </article>
</template>
