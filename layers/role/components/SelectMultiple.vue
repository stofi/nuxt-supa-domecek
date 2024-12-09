<script lang="ts" setup>
import type { Database } from '~~/types/supabase'

type Role = Database['public']['Tables']['role']['Row']

defineExpose({
  refresh: () => refresh()
})

const { data, status, error, refresh } = await useFetch(
  '/api/role', {
    headers: useRequestHeaders(['cookie'])
  }
)

const roles = defineModel<number[]>('roles')

const selectedRoles = computed<Role[]>(() =>
  data.value?.data.filter((r: Role) => roles.value?.includes(r.id)) ?? []
)
</script>

<template>
  <USelectMenu
    v-model="roles"
    :loading="status === 'pending'"
    :options="data?.data"
    :value-attribute="'id'"
    multiple
  >
    <template #option="{ option }">
      <ColorDot :color="option.color" />
      <span class="truncate">{{ option.name }}</span>
    </template>
    <template #label>
      <div class="flex items-center h-6 gap-1 overflow-hidden max-w-full">
        <template v-if="error">
          {{ error.statusMessage }}
        </template>
        <template v-else-if="selectedRoles.length">
          <template
            v-for="role in selectedRoles"
            :key="role.id"
          >
            <ColorDot :color="role.color" />
            <span class="mr-2 truncate">{{ role.name }}</span>
          </template>
        </template>
        <template v-else>
          <span class="truncate">{{ $t('form.role.selectRoles') }}</span>
        </template>
      </div>
    </template>
  </USelectMenu>
</template>
