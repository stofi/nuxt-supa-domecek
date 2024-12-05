<script lang="ts" setup>

const time = defineModel<string>()

const props = withDefaults(defineProps<{
  startTime?: string
  endTime?: string
  step?: number
}>(), {
  startTime: '06:00',
  endTime: '23:00',
  step: 60
})

const timeOptions = computed(() => buildTimeArray(props.startTime, props.endTime, props.step))

</script>

<template>
  <USelectMenu v-model="time" searchable :options="timeOptions" />
</template>
