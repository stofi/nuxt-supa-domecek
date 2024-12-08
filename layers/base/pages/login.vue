<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form, FormError } from '#ui/types'

const { t } = useI18n()
const teamId = useCookie<number | undefined>('teamId')
const schema = computed(() => z.object({
  email: z.string({
    message: t('form.auth.validation.emailRequired')
  })
    .email(t('form.auth.validation.emailInvalid')),
  password: z.string({
    message: t('form.auth.validation.passwordRequired')
  })
    .min(8, t('form.auth.validation.passwordMin'))
}))

type State = z.infer<typeof schema['value']>

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: t('page.login.label')
})

const fields = computed(() => [
  {
    name: 'email',
    type: 'email',
    label: t('form.auth.emailLabel'),
    placeholder: t('form.auth.emailPlaceholder')
  },
  {
    name: 'password',
    label: t('form.auth.passwordLabel'),
    type: 'password',
    placeholder: t('form.auth.passwordPlaceholder')
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
    form.value?.formRef?.clear()
    loading.value = true

    const { error } = await supabaseClient.auth.signInWithPassword({
      email: state.email,
      password: state.password
    })
    if (error) throw error

    // Redirect to confirmation page after successful login
    router.push('/confirm')
  } catch (error) {
    console.error('Error logging in:', error)
    const formError: FormError = {
      message: 'Invalid email or password',
      path: 'email'
    }
    form.value?.formRef?.setErrors([formError])
  } finally {
    loading.value = false
    teamId.value = undefined
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
ref="form" :fields="fields" :schema="schema" :title="$t('auth.welcomeBack')"
      align="top" icon="i-heroicons-lock-closed" :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid', label: $t('form.auth.submitButton') }" :loading="loading" @submit="onSubmit">
      <template #description>
        {{ $t('auth.dontHaveAccount') }}
        <ULink to="/signup" class="text-primary font-medium">{{ $t('auth.signUp') }}</ULink>.
      </template>

      <template #password-hint>
        <ULink to="/forgot-password" class="text-primary font-medium">{{ $t('auth.forgotPassword') }}</ULink>
      </template>

      <template #footer>
        <!-- By signing in, you agree to our -->
        {{ $t('auth.bySigningIn') }}
        <ULink to="/" class="text-primary font-medium">{{ $t('auth.termsOfService') }}</ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
