<script setup lang="ts">
import type { NuxtError } from '#app'

const { t } = useI18n()
defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: t('errors.error'),
  description: t('errors.pageNotFoundMessage')
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })

provide('navigation', navigation)
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :navigation="navigation"
      />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
