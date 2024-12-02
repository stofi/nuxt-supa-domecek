<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Employee'
})
const route = useRoute()

const { data, status, error, refresh } = await useFetch(
  `/api/employee/${route.params.id}`, {
    headers: useRequestHeaders(['cookie'])
  })
</script>

<template>
  <div>
    <p v-if="status==='pending'">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>

    <button @click="refresh()">Refresh</button>
  </div>
</template>
