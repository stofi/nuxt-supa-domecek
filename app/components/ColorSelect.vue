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

const color = defineModel<string>('color')
</script>

<template>
  <USelectMenu v-model="color" :options="options">
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <ColorDot :color="option" />
        <span class="truncate">{{ option }}</span>
      </div>
    </template>
    <template #label>
      <div class="flex items-center gap-2 h-6">
        <ColorDot :color="color" />
        <span class="truncate">{{ color }}</span>
      </div>
    </template>
  </USelectMenu>
</template>
