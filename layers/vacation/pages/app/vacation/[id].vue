<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.vacation.label')
})

const route = useRoute()

const { data, status, error, refresh } = await useFetch(
  `/api/vacation/${route.params.id}`, {
    headers: useRequestHeaders(['cookie'])
  })
</script>

<template>
  <div>
    <p v-if="status === 'pending'">
      {{ $t('errors.loading') }}
    </p>
    <p v-else-if="error">
      {{ $t('errors.error') }}: {{ error.message }}
    </p>
    <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>

    <button @click="refresh()">
      {{ $t('buttons.refresh') }}
    </button>
  </div>
</template>
