<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})

const route = useRoute()
const toast = useToast()

const { data, status, error, refresh } = await useFetch(
  `/api/employee/${route.params.id}`, {
    headers: useRequestHeaders(['cookie'])
  })

useHead({
  title: `${t('page.employee.label')} - ${data.value?.name}`
})

const archiving = ref(false)
const archiveEmployee = async () => {
  try {
    archiving.value = true
    await $fetch(`/api/employee/${route.params.id}/archive`, {
      method: 'PATCH'
    })
    navigateTo('/app/employee')
    toast.add({
      id: 'employee-archive-success',
      title: t('page.employee.archive.success')
    })
  } catch (error) {
    console.error(error)
    toast.add({
      id: 'employee-archive-error',
      title: t('page.employee.archive.error'),
      description: error.message
    })
  } finally {
    archiving.value = false
  }
}

const deleting = ref(false)
const deleteEmployee = async () => {
  try {
    deleting.value = true
    await $fetch(`/api/employee/${route.params.id}`, {
      method: 'DELETE'
    })
    navigateTo('/app/employee')
    toast.add({
      id: 'employee-delete-success',
      title: t('page.employee.delete.success')
    })
  } catch (error) {
    console.error(error)
    toast.add({
      id: 'employee-delete-error',
      title: t('page.employee.delete.error'),
      description: error?.data?.message || error?.message || 'Unknown error',
      color: 'red'
    })
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <UDashboardNavbar :title="`${$t('page.employee.label')} - ${data?.name}`">
    <template #right />
  </UDashboardNavbar>
  <UDashboardPanelContent>
    <UDashboardSection :title="$t('page.employee.new.employeeDetails')">
      <p class="mb-4 text-sm text-gray-500">
        {{ $t('page.employee.new.fillEmployeeDetails') }}
      </p>

      <EmployeeForm
        :id="data?.id"
        :initial-state="data"
        @submit="refresh"
      />
    </UDashboardSection>
    <UDashboardSection>
      <div class="flex gap-2">
        <ButtonArchive @click="archiveEmployee" />
        <ButtonDelete
          :title="$t('page.employee.delete.title')"
          :description="$t('page.employee.delete.description')"
          @click="deleteEmployee"
          @delete="deleteEmployee"
        />
      </div>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
