<script lang="ts" setup>
import {
  DEFAULT_START,
  DEFAULT_END,
  DEFAULT_STEP
} from '~~/consts'

const time = defineModel<string>()

const props = withDefaults(defineProps<{
  startTime?: string
  endTime?: string
  step?: number
}>(), {
  startTime: DEFAULT_START,
  endTime: DEFAULT_END,
  step: DEFAULT_STEP
})

const timeOptions = computed(() => buildTimeArray(props.startTime, props.endTime, props.step))

</script>

<template>
  <USelectMenu v-model="time" searchable :options="timeOptions" />
</template>
