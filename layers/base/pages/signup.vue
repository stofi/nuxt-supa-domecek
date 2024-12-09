<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, Form, FormError } from '#ui/types'

const { t, locale } = useI18n()
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: t('page.signup.label')
})

const schema = computed(() => z.object({
  name: z.string({
    message: t('form.auth.validation.nameRequired')
  }).min(1, { message: t('form.auth.validation.nameRequired') }),

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

const supabaseClient = useSupabaseClient()
const router = useRouter()
const form = ref<{ formRef?: Form<State> }>()

const loading = ref(false)

const fields = computed(() => [
  {
    name: 'name',
    type: 'text',
    label: t('form.auth.nameLabel'),
    placeholder: t('form.auth.namePlaceholder')
  },
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

async function onSubmit(event: FormSubmitEvent<State>) {
  // NuxtUI Pro UAuthForm wraps UFrom but doesn't export it's type.
  const state = event as unknown as (typeof event)['data']
  try {
    form.value?.formRef?.clear()
    loading.value = true

    const { error } = await supabaseClient.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        data: { name: state.name, locale: locale.value },
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
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      ref="form"
      :fields="fields"
      :schema="schema"
      align="top"
      :title="$t('page.signup.label')"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: $t('buttons.createAccount') }"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #description>
        {{ $t('auth.alreadyHaveAccount') }}
        <ULink
          to="/login"
          class="text-primary font-medium"
        >
          {{ $t('auth.login') }}
        </ULink>.
      </template>

      <template #footer>
        {{ $t('auth.bySigningIn') }}
        <ULink
          to="/terms"
          class="text-primary font-medium"
        >{{ $t('auth.termsOfService') }}</ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
