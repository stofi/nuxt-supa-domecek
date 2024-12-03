<script lang="ts" setup>
import { format } from 'date-fns'
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateVacationInput, createVacationSchema } from '~~/types/schemas/vacation'

type Schema = Partial<CreateVacationInput>

const props = defineProps<{
  initialState?: Schema
  id?: string | number
}>()

const emits = defineEmits<{
  submit: []
  error: []
}>()

const state = reactive<Schema>({
  employee_id: undefined,
  date: undefined
})

const form = ref<Form<Schema>>()
const loading = ref(false)

watchEffect(() => {
  if (props.initialState) {
    Object.assign(state, props.initialState)
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  loading.value = true
  try {
    const formattedDate = event.data.date
      ? format(new Date(event.data.date), 'yyyy-MM-dd')
      : undefined

    const body = {
      ...event.data,
      date: formattedDate
    }

    if (props.id) {
      // PUT request to update existing vacation
      await $fetch(`/api/vacation/${props.id}`, {
        method: 'PUT',
        body
      })
    } else {
      // POST request to create new vacation
      await $fetch('/api/vacation', {
        method: 'POST',
        body
      })
    }
    emits('submit')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'employee_id')
    emits('error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    ref="form"
    :schema="createVacationSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Employee" name="employee_id">
       <EmployeeSelect v-model="state.employee_id" />
    </UFormGroup>

    <UFormGroup label="Date" name="date">
      <DatePickerPopover v-model:date="state.date" />
    </UFormGroup>

    <UButton type="submit" :loading="loading">
      Submit
    </UButton>
  </UForm>
</template>
