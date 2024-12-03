<script lang="ts" setup>
import type { Database } from '~~/types/supabase'

type Role = Database['public']['Tables']['role']['Row']

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
  <USelectMenu v-model="roles" :loading="status === 'pending'" :options="data?.data" :value-attribute="'id'" multiple>
    <template #option="{ option }">
      <ColorDot :color="option.color" />
      <span class="truncate">{{ option.name }}</span>
    </template>
    <template #label>
      <template v-if="selectedRoles.length">
        <div v-for="role in selectedRoles" :key="role.id" class="flex items-center">
          <ColorDot :color="role.color" />
          <span class="mx-1 truncate">{{ role.name }}</span>
        </div>
      </template>
      <template v-else>
        <span class="truncate">Select Roles</span>
      </template>
    </template>
  </USelectMenu>
</template>
