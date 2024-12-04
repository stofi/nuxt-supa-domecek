<script lang="ts" setup>
import type { Database } from '~~/types/supabase'

type Employee = Database['public']['Tables']['employee']['Row']

defineExpose({
  refresh: () => refresh()
})

const { data, status, error, refresh } = await useFetch(
  '/api/employee', {
    headers: useRequestHeaders(['cookie']),
    key: 'employeeSelect'
  }
)

const employee = defineModel<number>('employee')

const selectedEmployee = computed<Employee | undefined>(() =>
  data.value?.data.find((r: Employee) => r.id === employee.value)
)

</script>

<template>
  <USelectMenu
    v-model="employee"
    searchable
    :loading="status === 'pending'"
    :options="data?.data"
    :value-attribute="'id'"
  >
    <template #option="{ option }">
      <span class="truncate">{{ option.name }}</span>
    </template>
    <template #label>
      <div class="flex items-center h-6 gap-2">
        <template v-if="error">
          {{ error.statusMessage }}
        </template>
        <template v-else-if="selectedEmployee">
          <span class="truncate">{{ selectedEmployee.name }}</span>
        </template>
        <template v-else>
          <span class="truncate">{{ $t('form.employee.selectEmployee') }}</span>
        </template>
      </div>
    </template>
  </USelectMenu>
</template>
