<script setup lang="ts">
const { t, locale } = useI18n()

const { data: page } = await useAsyncData('index',
  () => queryContent('/')
    .where({
      _locale: locale.value
    })
    .findOne(),
  {
    watch: [locale]
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('errors.pageNotFound'),
    fatal: true
  })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

const uiConfig = {
  title: 'text-primary-900 dark:text-primary-100',
  description: 'text-primary-900 dark:text-primary-200',
  icon: { base: 'text-primary-800 dark:text-primary-300' }
}
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      :ui="uiConfig"
    >
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />
      <!--
      <img
        src="/images/hero.png"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      /> -->
    </ULandingHero>

    <ULandingSection
      :ui="uiConfig"
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          :ui="uiConfig"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        :ui="uiConfig"
        v-bind="page.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
