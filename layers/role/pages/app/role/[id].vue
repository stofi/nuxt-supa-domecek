<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})

const route = useRoute()

const { data, status, error, refresh } = await useFetch(
  `/api/role/${route.params.id}`, {
    headers: useRequestHeaders(['cookie'])
  })

useHead({
  title: `${t('page.role.label')} - ${data.value?.name}`
})
</script>

<template>
  <div>
    <p v-if="status==='pending'">
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
