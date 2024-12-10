<script lang="ts" setup>
import type { Database } from '~~/types/supabase'

type Role = Database['public']['Tables']['role']['Row']

defineExpose({
  refresh: () => refresh()
})

const { data, status, error, refresh } = await useFetch(
  '/api/role', {
    headers: useRequestHeaders(['cookie']),
    key: 'roleSelect',
    dedupe: 'defer'
  }
)

const role = defineModel<number>('role')

const selectedRole = computed<Role | undefined>(() =>
  data.value?.data.find((r: Role) => r.id === role.value)
)
</script>

<template>
  <USelectMenu
    v-model="role"
    searchable
    :loading="status === 'pending'"
    :options="data?.data"
    :value-attribute="'id'"
  >
    <template #option="{ option }">
      <ColorDot :color="option.color" />
      <span class="truncate">{{ option.name }}</span>
    </template>
    <template #label>
      <div class="flex items-center h-6 gap-2 max-w-full">
        <template v-if="error">
          {{ error.statusMessage }}
        </template>
        <template v-else-if="selectedRole">
          <ColorDot :color="selectedRole.color" />
          <span class="truncate">{{ selectedRole.name }}</span>
        </template>
        <template v-else>
          <span class="truncate">{{ $t('form.role.selectRole') }}</span>
        </template>
      </div>
    </template>
  </USelectMenu>
</template>
