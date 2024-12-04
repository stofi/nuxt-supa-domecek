<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateTeam, createTeamSchema } from '~~/types/schemas/team'

type Schema = Partial<CreateTeam>
const props = defineProps<{
  initialState?: Schema
  id?: string | number
}>()

const emits = defineEmits<{
  submit: []
  error: []
}>()

const state = reactive<Schema>({
  name: undefined
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
    if (props.id) {
      // PUT request to update existing team
      await $fetch(`/api/team/${props.id}`, {
        method: 'PUT',
        body: event.data
      })
    } else {
      // POST request to create new team
      await $fetch('/api/team', {
        method: 'POST',
        body: event.data
      })
    }
    emits('submit')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'name')
    emits('error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    ref="form"
    :schema="createTeamSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup :label="$t('form.common.nameLabel')" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UButton type="submit" :loading="loading">
      {{ $t('form.common.submitButton') }}
    </UButton>
  </UForm>
</template>
