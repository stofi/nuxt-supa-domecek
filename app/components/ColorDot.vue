<script lang="ts" setup>
import type { ColorOption } from '~~/types/color'

const props = defineProps<{
  color: string | null
}>()

const supportedColor = computed(() => {
  if (!props.color) return 'gray'
  const colors: ColorOption[] = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
  return colors.includes(props.color as ColorOption) ? props.color : 'gray'
})

</script>

<template>
  <div class="flex-shrink-0 inline-block w-3 h-3 mt-px rounded-full" :class="`bg-${supportedColor}-500`" />

</template>
