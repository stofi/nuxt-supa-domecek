<script lang="ts" setup>
import type { FormSubmitEvent, Form } from '#ui/types'
import { type CreateTeam, createTeamSchema } from '~~/types/schemas/team'

definePageMeta({
  layout: 'app-layout'
})

type Schema = Partial<CreateTeam>

const state = reactive<Schema>({
  name: undefined
})
const form = ref<Form<Schema>>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value!.clear()
  try {
    await $fetch('/api/team', {
      method: 'POST',
      body: event.data
    })
    navigateTo('/app/team')
  } catch (err) {
    const wasZodError = handleZodError(err, form)
    if (!wasZodError) handleServerError(err, form, 'name')
  }
}

</script>

<template>
  <UDashboardNavbar title="New team">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent title="Vacation details">
    <p class="mb-4 text-sm text-gray-500">
      Fill in the details of the new team
    </p>

    <UForm ref="form" :schema="createTeamSchema" :state="state" class="space-y-4" @submit="onSubmit">

      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UDashboardPanelContent>
</template>
