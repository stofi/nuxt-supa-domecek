<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateEmployee, createEmployeeSchema } from '~~/types/schemas/employee'

type Schema = Partial<CreateEmployee>

const props = defineProps<{
  initialState?: Schema
  id?: string | number
}>()

const emits = defineEmits<{
  submit: []
  error: []
}>()

const state = reactive<Schema>({
  name: '',
  contract: 100,
  roleIds: []
})

const loading = ref(false)

watchEffect(() => {
  if (props.initialState) {
    Object.assign(state, props.initialState)
  }
})

const form = ref<Form<Schema>>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  loading.value = true
  try {
    if (props.id) {
      await $fetch(`/api/employee/${props.id}`, {
        method: 'PUT',
        body: event.data
      })
    } else {
      await $fetch('/api/employee', {
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
  <UForm ref="form" :schema="createEmployeeSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup :label="$t('form.common.nameLabel')" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup :label="$t('form.employee.contractLabel')" name="contract">
      <UInput v-model="state.contract" type="numeric" />
    </UFormGroup>

    <UFormGroup :label="$t('form.employee.roleLabel')" name="roleIds">
      <RoleSelectMultiple v-model:roles="state.roleIds" />
    </UFormGroup>

    <UButton type="submit" :loading="loading">
      {{ $t('form.common.submitButton') }}
    </UButton>
  </UForm>
</template>
