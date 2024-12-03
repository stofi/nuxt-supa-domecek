<script lang="ts" setup>
import type { TableColumn } from '#ui/types'
import type { Database } from '~~/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

defineProps<{
  data: Profile[]
}>()

const columns: TableColumn[] = [
  {
    key: 'full_name',
    label: 'Name'
  }
]

</script>

<template>
  <UTable
  :columns="columns"
  :rows="data"
  sort-mode="manual"
  class="w-full">
  </UTable>
</template>
