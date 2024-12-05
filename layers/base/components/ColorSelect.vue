<script lang="ts" setup>
import type { ColorOption } from '~~/types/color'

const { t } = useI18n()

const options = computed<{ value: ColorOption, label: string }[]>(() => [
  { value: 'red', label: t('colors.red') },
  { value: 'yellow', label: t('colors.yellow') },
  { value: 'green', label: t('colors.green') },
  { value: 'blue', label: t('colors.blue') },
  { value: 'indigo', label: t('colors.indigo') },
  { value: 'purple', label: t('colors.purple') },
  { value: 'teal', label: t('colors.teal') },
  { value: 'pink', label: t('colors.pink') }
])

const color = defineModel<string>('color')
</script>

<template>
  <USelectMenu v-model="color" :options="options" value-attribute="value">
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <ColorDot :color="option.value" />
        <span class="truncate">{{ option.label }}</span>
      </div>
    </template>
    <template #label>
      <div class="flex items-center gap-2 h-6">
        <ColorDot :color="color" />
        <span class="truncate">{{ options.find(o => o.value === color)?.label }}</span>
      </div>
    </template>
  </USelectMenu>
</template>
