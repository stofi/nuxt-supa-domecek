<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateTimeslot, createTimeslotSchema } from '~~/types/schemas/timeslot'

definePageMeta({
  layout: 'app-layout'
})

type Schema = Partial<CreateTimeslot>

const state = reactive<Schema>({
  shift_id: undefined,
  role_id: undefined,
  employee_id: undefined,
  start_time: undefined,
  end_time: undefined,
  break: false
})
const form = ref<Form<Schema>>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  try {
    await $fetch('/api/timeslot', {
      method: 'POST',
      body: event.data
    })
    navigateTo('/app/timeslot')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'shift_id')
  }
}

</script>

<template>
  <UDashboardNavbar title="New timeslot">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Timeslot details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new timeslot
    </p>

    <UForm ref="form" :schema="createTimeslotSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Shift ID" name="shift_id">
        <UInput v-model.number="state.shift_id" type="numeric" />
      </UFormGroup>

      <UFormGroup label="Role ID" name="role_id">
        <UInput v-model.number="state.role_id" type="numeric" />
      </UFormGroup>

      <UFormGroup label="Employee ID" name="employee_id">
        <UInput v-model.number="state.employee_id" type="numeric" />
      </UFormGroup>

      <UFormGroup label="Start time" name="start_time">
        <UInput v-model="state.start_time" type="time" />
      </UFormGroup>

      <UFormGroup label="End time" name="end_time">
        <UInput v-model="state.end_time" type="time" />
      </UFormGroup>

      <UFormGroup label="Break" name="break">
        <UCheckbox v-model="state.break" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UDashboardPanelContent>
</template>
