<script lang="ts" setup>
defineEmits<{
  click: []
}>()
</script>

<template>
  <UButton @click="$emit('click')">{{ $t('buttons.archive') }}</UButton>
</template>
