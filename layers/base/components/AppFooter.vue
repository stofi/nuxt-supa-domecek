<script setup lang="ts">
import LanguageToggle from './LanguageToggle.vue'
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-primary-800 dark:text-primary-200">
         {{$t('app.footer.copyright', { year: new Date().getFullYear() })}}
      </p>
    </template>

    <template #right>
      <LanguageToggle />
      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>
