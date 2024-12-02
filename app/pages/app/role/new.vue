<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateRole, createRoleSchema } from '~~/types/schemas/role'

definePageMeta({
  layout: 'app-layout'
})

type Schema = Partial<CreateRole>

const state = reactive<Schema>({
  name: undefined,
  color: undefined,
  shortname: undefined,
  priority: false
})
const form = ref<Form<Schema>>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  try {
    await $fetch('/api/role', {
      method: 'POST',
      body: event.data
    })
    navigateTo('/app/role')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'name')
  }
}
</script>

<template>
  <UDashboardNavbar title="New role">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Role details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new role
    </p>

    <UForm ref="form" :schema="createRoleSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Color" name="color">
        <UInput v-model="state.color" />
      </UFormGroup>

      <UFormGroup label="Shortname" name="shortname">
        <UInput v-model="state.shortname" />
      </UFormGroup>

      <UFormGroup label="Priority" name="priority">
        <UCheckbox v-model="state.priority" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UDashboardPanelContent>
</template>
