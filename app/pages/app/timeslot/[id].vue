<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const route = useRoute()

const { data, status, error, refresh } = await useFetch(
  `/api/timeslot/${route.params.id}`, {
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
