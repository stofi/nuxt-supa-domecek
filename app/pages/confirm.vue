<script setup lang="ts">
const user = useSupabaseUser()
const { t } = useI18n()
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: t('page.confirmRedirect.label')
})

const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value

const supabase = useSupabaseClient()

const parseUrl = async () => {
  const hash = window.location.hash
  const data = hash.replace('#', '')
  const params = new URLSearchParams(data)
  const access_token = params.get('access_token')
  const refresh_token = params.get('refresh_token')
  if (!access_token || !refresh_token) {
    return
  }
  await supabase.auth.setSession({
    access_token,
    refresh_token
  })
}

await parseUrl()

watch(
  user,
  () => {
    if (user.value) {
      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null
      // Redirect to path
      return navigateTo(redirectPath || '/app')
    } else {
      // return navigateTo('/login')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>{{ $t('errors.waitingForLogin') }}</div>
</template>
