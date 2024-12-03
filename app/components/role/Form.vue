<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateRole, createRoleSchema } from '~~/types/schemas/role'

const props = defineProps<{
  initialState?: Partial<CreateRole>
  id?: string | number
}>()

const emits = defineEmits<{
  submit: []
  error: []
}>()

type Schema = Partial<CreateRole>

const state = reactive<Schema>({
  name: undefined,
  color: undefined,
  shortname: undefined,
  priority: false
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
      // PUT request to update existing role
      await $fetch(`/api/role/${props.id}`, {
        method: 'PUT',
        body: event.data
      })
    } else {
      // POST request to create new role
      await $fetch('/api/role', {
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
    :schema="createRoleSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Color" name="color">
      <ColorSelect v-model="state.color" />
    </UFormGroup>

    <UFormGroup label="Shortname" name="shortname">
      <UInput v-model="state.shortname" />
    </UFormGroup>

    <UFormGroup label="Priority" name="priority">
      <UCheckbox v-model="state.priority" />
    </UFormGroup>

    <UButton type="submit" :loading="loading">
      Submit
    </UButton>
  </UForm>
</template>
