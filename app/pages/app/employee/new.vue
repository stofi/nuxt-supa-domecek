<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateEmployee, createEmployeeSchema } from '~~/types/schemas/employee'

definePageMeta({
  layout: 'app-layout'
})

const state = reactive<CreateEmployee>({
  name: '',
  contract: 100
})

const form = ref<Form<CreateEmployee>>()

async function onSubmit(event: FormSubmitEvent<CreateEmployee>) {
  form.value!.clear()
  try {
    await $fetch('/api/employee', {
      method: 'POST',
      body: event.data
    })
    navigateTo('/app/employee')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'name')
  }
}
</script>

<template>
  <UDashboardNavbar title="New employee">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Employee details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new employee
    </p>

    <UForm ref="form" :schema="createEmployeeSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Contract" name="contract">
        <UInput v-model="state.contract" type="numeric" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UDashboardPanelContent>

</template>
