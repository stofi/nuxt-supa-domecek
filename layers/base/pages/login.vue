<script setup lang="ts">
// TODO: i18n
import { z } from 'zod'
import type { FormSubmitEvent, Form, FormError } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

type State = z.infer<typeof schema>
const { t } = useI18n()

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: t('page.login.label')
})

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  }
]

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const form = ref<{ formRef?: Form<State> }>()

const loading = ref(false)

const providers = [

]

async function onSubmit(event: FormSubmitEvent<State>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = event as any as (typeof event)['data']
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
      :providers="providers"
      :title="$t('auth.welcomeBack')"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #description>
        {{ $t('auth.dontHaveAccount') }}
        <ULink to="/signup" class="text-primary font-medium">{{ $t('auth.signUp') }}</ULink>.
      </template>

      <template #password-hint>
        <ULink to="/forgot-password" class="text-primary font-medium"
          >{{  $t('auth.forgotPassword')  }}</ULink
        >
      </template>

      <template #footer>
        <!-- By signing in, you agree to our -->
         {{ $t('auth.bySigningIn') }}
        <ULink to="/" class="text-primary font-medium">{{  $t('auth.termsOfService') }}</ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
