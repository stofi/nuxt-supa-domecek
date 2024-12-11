<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateTimeslot, createTimeslotSchema } from '~timeslot/schemas'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

type Schema = Partial<CreateTimeslot>

const props = defineProps<{
  initialState?: Schema
  id?: string | number
  date?: Date
  autosave?: boolean
  deleteable?: boolean
}>()

const emits = defineEmits<{
  submit: []
  error: []
}>()

const state = reactive<Schema>({
  role_id: undefined,
  employee_id: undefined,
  start_time: undefined,
  end_time: undefined,
  break: false,
  date: props.date
})
const tmpState = reactive<Schema>({})

const form = ref<Form<Schema>>()
const loading = ref(false)

watch(() => props.initialState, () => {
  if (props.initialState) {
    Object.assign(state, props.initialState)

    state.start_time = formatTime(state.start_time)
    state.end_time = formatTime(state.end_time)

    if (props.autosave) {
      Object.assign(tmpState, state)
    }
  }
}, { immediate: true })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  loading.value = true

  try {
    if (props.id) {
      // PUT request to update existing timeslot
      await $fetch(`/api/timeslot/${props.id}`, {
        method: 'PUT',
        body: event.data
      })
    } else {
      // POST request to create new timeslot
      await $fetch('/api/timeslot', {
        method: 'POST',
        body: event.data
      })
    }
    await delay(1000)
    emits('submit')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'date')
    emits('error')
  } finally {
    loading.value = false
  }
}

async function handleDelete() {
  if (!props.id || !props.deleteable) return
  try {
    await $fetch(`/api/timeslot/${props.id}`, {
      method: 'DELETE'
    })
    emits('submit')
  } catch (err) {
    handleServerError(err, form, 'date')
  }
}

watch(state,
  async () => {
    if (!props.autosave || !form.value) return
    const newState = (JSON.stringify(state))
    const oldState = (JSON.stringify(tmpState))
    Object.assign(tmpState, state)
    if (newState === oldState) return
    await form.value.validate()
    const errors = form.value.getErrors()
    if (errors.length) return
    await form.value.submit()
  },
  { deep: 1 }
)
</script>

<template>
  <UForm
    ref="form"
    :schema="createTimeslotSchema"
    :state="state"
    class="gap-2 md:gap-4 grid md:grid-cols-3"
    :validate-on="['submit', 'change']"
    @submit="onSubmit"
  >
    <UFormGroup
      v-if="!date"
      :label="$t('form.timeslot.dateLabel')"
      name="date"
      class="md:row-start-3 md:col-start-2"
    >
      <DatePickerPopover v-model:date="state.date" />
    </UFormGroup>

    <UFormGroup
      :label="$t('form.timeslot.roleLabel')"
      name="role_id"
    >
      <RoleSelect v-model:role="state.role_id" />
    </UFormGroup>

    <UFormGroup
      :label="$t('form.timeslot.employeeLabel')"
      name="employee_id"
    >
      <EmployeeSelect v-model:employee="state.employee_id" />
    </UFormGroup>

    <UFormGroup
      :label="$t('form.timeslot.startTimeLabel')"
      name="start_time"
      class="md:row-start-2"
    >
      <InputTime v-model="state.start_time" />
    </UFormGroup>

    <UFormGroup
      :label="$t('form.timeslot.endTimeLabel')"
      name="end_time"
      class="md:row-start-2"
    >
      <InputTime v-model="state.end_time" />
    </UFormGroup>

    <UFormGroup
      :label="$t('form.timeslot.breakLabel')"
      name="break"
      class="md:row-start-3 md:col-span-2"
    >
      <UCheckbox
        v-model="state.break"
        :label="$t('form.timeslot.breakDetails')"
      />
    </UFormGroup>

    <div class="md:col-end-4 md:row-start-3 place-self-end flex gap-2">
      <UButton
        v-if="!props.autosave"
        type="submit"
        :loading="loading"
      >
        {{ $t('form.common.submitButton') }}
      </UButton>
      <ButtonDelete
        v-if="props.deleteable"
        :title="$t('form.timeslot.deleteTitle')"
        :description="$t('form.timeslot.deleteDescription')"
        @delete="handleDelete"
      />
    </div>
  </UForm>
</template>
