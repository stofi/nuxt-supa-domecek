<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})

const route = useRoute()

const date = computed(() => new Date(`${route.params.year}-${route.params.month}-${route.params.day}`))

useHead({
  title: date.value.toLocaleDateString('cs')
})

const { data, status, error, refresh } = await useFetch(
  '/api/timeslot', {
    query: {
      date: date.value.toISOString().split('T')[0]
    },
    headers: useRequestHeaders(['cookie'])
  }
)

</script>

<template>
  <UDashboardPanelContent>
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <pre v-else>{{ JSON.stringify(data?.data, null, 2) }}</pre>

    <button @click="refresh()">Refresh</button>
  </UDashboardPanelContent>
</template>
