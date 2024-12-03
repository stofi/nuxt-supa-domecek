<script setup lang="ts">
import { format } from 'date-fns'

// const date = ref(new Date())

const date = defineModel<Date>('date')

</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="date ? format(date, 'd MMM, yyy'): 'Not selected'" />

    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
</template>
