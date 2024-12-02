<script lang="ts" setup>
import { format } from 'date-fns'
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateVacationInput, createVacationSchema } from '~~/types/schemas/vacation'

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New vacation'
})

type Schema = Partial<CreateVacationInput>

const state = reactive<Schema>({
  employee_id: undefined,
  date: undefined
})
const form = ref<Form<Schema>>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  try {
    await $fetch('/api/vacation', {
      method: 'POST',
      body: {
        ...event.data,
        date: event.data.date ? format(new Date(event.data.date), 'yyyy-MM-dd') : undefined
      }
    })
    navigateTo('/app/vacation')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'employee_id')
  }
}

</script>

<template>
  <UDashboardNavbar title="New vacation">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Vacation details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new vacation
    </p>

    <UForm ref="form" :schema="createVacationSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Employee ID" name="employee_id">
        <UInput v-model.number="state.employee_id" type="numeric" />
      </UFormGroup>

      <UFormGroup label="Date" name="date">
        <DatePicker v-model="state.date" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UDashboardPanelContent>
</template>
