<script lang="ts" setup>
const props = defineProps<{
  color?: string | null
}>()
</script>

<template>
  <div
    class="flex-shrink-0 inline-block w-3 h-3 mt-px rounded-full"
    :class="getColorClass(props.color)"
  />
</template>
