<script lang="ts" setup>
import type { TableColumn } from '#ui/types'
import type { Database } from '~~/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

const { t } = useI18n()

defineProps<{
  data: Profile[]
}>()

const columns = computed<TableColumn[]>(() => [
  {
    key: 'full_name',
    label: t('form.common.nameLabel')
  }
])

</script>

<template>
  <UTable
  :columns="columns"
  :rows="data"
  sort-mode="manual"
  class="w-full">
  </UTable>
</template>
