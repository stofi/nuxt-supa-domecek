<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateShiftInput, createShiftSchema } from '~~/types/schemas/shift'

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'New shift'
})

type Schema = Partial<CreateShiftInput>

const state = reactive<Schema>({
  date: undefined,
  valid: false
})
const form = ref<Form<Schema>>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  try {
    await $fetch('/api/shift', {
      method: 'POST',
      body: event.data
    })
    navigateTo('/app/shift')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'date')
  }
}

</script>

<template>
  <UDashboardNavbar title="New shift">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Shift details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new shift
    </p>

    <UForm
      ref="form"
      :schema="createShiftSchema"
      :state="state" class="space-y-4"
      @submit="onSubmit">
      <UFormGroup label="Date" name="date">
        <DatePicker v-model="state.date" />
      </UFormGroup>

      <UFormGroup label="Valid" name="valid">
        <UCheckbox v-model="state.valid" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UDashboardPanelContent>
</template>
