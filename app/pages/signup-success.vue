<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const { t } = useI18n()
const client = useSupabaseClient()
const user = useSupabaseUser()

await client.auth.refreshSession()

console.log(user.value)

if (user.value) {
  navigateTo('/app')
}

useSeoMeta({
  title: t('page.signupSuccess.label')
})
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="text-center">
      <h1 class="text-2xl font-bold">{{ $t('auth.signupSuccess') }}</h1>
       <p>{{ $t('auth.checkEmailVerification') }}</p>
    </div>
  </UCard>
</template>
