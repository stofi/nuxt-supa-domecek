<script lang="ts" setup>
const { t } = useI18n()
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.employee.new.label')
})
</script>

<template>
  <UDashboardNavbar :title="$t('page.employee.new.label')">
    <template #right />
  </UDashboardNavbar>
  <UDashboardPanelContent :title="$t('page.employee.new.employeeDetails')">
    <p class="mb-4 text-sm text-gray-500">
      {{ $t('page.employee.new.fillEmployeeDetails') }}
    </p>

    <EmployeeForm @submit="navigateTo('/app/employee')" />
  </UDashboardPanelContent>
</template>
