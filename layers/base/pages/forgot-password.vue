<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form, FormError } from '#ui/types'

const { t } = useI18n()

const schema = computed(() => z.object({
  email: z.string().email()
}))

type State = z.infer<typeof schema['value']>

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: t('page.forgotPassword.label')
})

const fields = computed(() => [
  {
    name: 'email',
    type: 'email',
    label: t('form.auth.emailLabel'),
    placeholder: t('form.auth.emailPlaceholder')
  }
])

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const form = ref<{ formRef?: Form<State> }>()

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<State>) {
  // NuxtUI Pro UAuthForm wraps UFrom but doesn't export it's type.
  const state = event as unknown as (typeof event)['data']
  try {
    // form.value?.formRef?.setErrors([])
    form.value?.formRef?.clear()

    loading.value = true
    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      state.email,
      {
        redirectTo: `${window.location.origin}/app/settings/change-password`
      }
    )
    if (error) throw error
    router.push('/')
  } catch (error) {
    console.error('Error reseting password:', error)
    const formError: FormError = {
      message: t('errors.auth.resetPassword'),
      path: 'email'
    }
    form.value?.formRef?.setErrors([formError])
    // Handle error (e.g., show error message to user)
  } finally {
    loading.value = false
  }
}

// Redirect if user is already logged in
watchEffect(() => {
  if (user.value) {
    router.push('/')
  }
})
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      ref="form"
      :fields="fields"
      :schema="schema"
      :title="$t('page.forgotPassword.label')"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid', label: $t('form.auth.submitButton') }"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #description>
        {{ $t('auth.dontHaveAccount') }}
        <ULink
          to="/signup"
          class="text-primary font-medium"
        >
          {{ $t('auth.signUp') }}
        </ULink>.
      </template>

      <!-- <template #password-hint> -->
      <!--   <NuxtLink -->
      <!--     to="/forgot-password" -->
      <!--     class="text-primary font-medium" -->
      <!--   >Forgot password?</NuxtLink> -->
      <!-- </template> -->

      <template #footer>
        {{ $t('page.forgotPassword.goBackTo') }}
        <ULink
          to="/login"
          class="text-primary font-medium"
        >
          {{ $t('page.login.label') }}
        </ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
