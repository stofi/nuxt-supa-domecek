<script lang="ts" setup>
const { locale, setLocale, locales } = useI18n()
</script>

<template>
  <UButtonGroup
    class="self-center"
    size="sm"
  >
    <UButton
      v-for="l in locales"
      :key="l"
      :variant="l === locale ? 'solid' : 'ghost'"
      :disabled="l === locale"
      square
      @click="setLocale(l)"
    >
      <span class="px-1">{{ $t(`locale.${l}`) }}</span>
    </UButton>
  </UButtonGroup>
</template>
