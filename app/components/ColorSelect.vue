<script lang="ts" setup>
import type { ColorOption } from '~~/types/color'

const options: ColorOption[] = [
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'teal',
  'pink'
]

const color = defineModel<ColorOption>('color', { default: () => 'red' })
</script>

<template>
  <USelectMenu v-model="color" :options="options" >
    <template #option="{ option }">
      <ColorDot :color="option"/>
      <span class="truncate">{{ option }}</span>
    </template>
    <template #label>
      <ColorDot :color="color"/>
      <span class="truncate">{{ color }}</span>
    </template>
  </USelectMenu>
</template>
