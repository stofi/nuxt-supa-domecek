<script lang="ts" setup>
definePageMeta({
  layout: 'app-layout'
})
// const teamId = useCookie('teamId')

// teamId.value = '1'

const { data, pending, error, refresh } = await useAsyncData(
  'employees',
  () => $fetch('/api/employee', {
    headers: useRequestHeaders(['cookie'])
  })
)
</script>

<template><div>
  <h1>Employees</h1>
  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Error: {{ error.message }}</p>
  <ul v-else>
    <li v-for="employee in data?.data" :key="employee.id">{{ employee.name }}</li>
  </ul>
  <button @click="refresh()">Refresh</button>
</div></template>
