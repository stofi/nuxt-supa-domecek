<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: 'Shift'
})

const route = useRoute()

const date = new Date(`${route.params.year}-${route.params.month}-${route.params.day}`).toISOString().split('T')[0]

const { data, status, error, refresh } = await useFetch(
  '/api/shift', {
    query: {
      from: date,
      to: date
    },
    headers: useRequestHeaders(['cookie'])
  }
)

if (data.value?.data[0]) {
  navigateTo(`/app/shift/${data.value.data[0].id}`, {
    replace: true
  })
} else {
  const { id } = await $fetch('/api/shift', {
    method: 'POST',
    body: {
      date
    }
  })
  navigateTo(`/app/shift/${id}`, {
    replace: true
  })
}

</script>

<template>
  <UDashboardPanelContent>
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <pre v-else>{{ JSON.stringify(data?.data, null, 2) }}</pre>

    <button @click="refresh()">Refresh</button>
  </UDashboardPanelContent>
</template>
