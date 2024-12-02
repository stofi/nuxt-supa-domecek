<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form, FormError } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up'
})

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

type State = z.infer<typeof schema>

const supabaseClient = useSupabaseClient()
const router = useRouter()
const form = ref<{ formRef?: Form<State> }>()

const loading = ref(false)

const fields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name'
  },
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

const providers = [
  {
    label: 'Continue with GitHub',
    icon: 'i-simple-icons-github',
    color: 'gray' as const,
    click: () => signUpWithGitHub()
  }
]

async function onSubmit(event: FormSubmitEvent<State>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = event as any as (typeof event)['data']
  try {
    form.value?.formRef?.clear()
    loading.value = true

    const { error } = await supabaseClient.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        data: { name: state.name },
        emailRedirectTo: `${window.location.origin}/app/`
      }
    })
    if (error) throw error

    // Redirect to a confirmation page or show a success message
    router.push('/signup-success')
  } catch (error) {
    console.error('Error signing up:', error)
    if (
      error && typeof error === 'object'
      && 'code' in error && typeof error.code === 'string'
      && error.code === 'user_already_exists') {
      const formError: FormError = {
        message: 'User already exists. Please login.',
        path: 'email'
      }
      form.value?.formRef?.setErrors([formError])
      return
    }
    const formError: FormError = {
      message: 'Error creating account. Please try again.',
      path: 'email'
    }
    form.value?.formRef?.setErrors([formError])
  } finally {
    loading.value = false
  }
}

async function signUpWithGitHub() {
  try {
    loading.value = true
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) throw error
  } catch (error) {
    console.error('Error signing up with GitHub:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      ref="form"
      :fields="fields"
      :schema="schema"
      :providers="providers"
      align="top"
      title="Create an account"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Create account' }"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account?
        <ULink
          to="/login"
          class="text-primary font-medium"
        >
          Login
        </ULink>.
      </template>

      <template #footer>
        By signing up, you agree to our
        <ULink
          to="/terms"
          class="text-primary font-medium"
        >Terms of Service</ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
