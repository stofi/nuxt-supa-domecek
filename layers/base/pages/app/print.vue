<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.print.label')
})
</script>

<template>
  <div>
    <h1>Print</h1>
  </div>
</template>
