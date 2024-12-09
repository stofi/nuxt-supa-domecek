<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>()

const emit = defineEmits<{
  delete: []
}>()

const open = ref(false)

const onDelete = () => {
  emit('delete')
  open.value = false
}
</script>

<template>
  <UButton color="red" @click="open = true">{{ $t('buttons.delete') }}</UButton>
  <UDashboardModal
    v-model="open"
    :title="title"
    :description="description"
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any
    }"
  >
    <template #footer>
      <UButton
        color="red"
        :label="$t('buttons.delete')"
        @click="onDelete" />
      <UButton
        color="white"
        :label="$t('buttons.cancel')"
        @click="open = false" />
    </template>
  </UDashboardModal>
</template>
