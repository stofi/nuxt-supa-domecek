<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const { data, status, error, refresh } = await useFetch(
  '/api/team', {
    headers: useRequestHeaders(['cookie'])
  }
)
const teamId = useCookie<number>('teamId')

const teams = computed(() =>
  data.value?.data.map((team) => {
    const item: DropdownItem = ({
      label: team.name,

      click: () => {
        teamId.value = team.id
      }
    })
    return item
  }) ?? []
)

const selectedTeam = computed(() => {
  const team = data.value?.data.find(team => team.id === teamId.value)
  return team?.name ?? 'Select team'
})

const actions = [
  {
    label: 'Create team',
    icon: 'i-heroicons-plus-circle',
    to: '/app/settings/team/new'
  },
  {
    label: 'Manage teams',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/app/settings/team'
  }
]

</script>

<template>
  <UDropdown
v-slot="{ open }" mode="hover" :items="[teams, actions]" class="w-full" :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }">
    <UButton color="gray" :class="[open && 'bg-gray-50 dark:bg-gray-800']" class="w-full">

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{
        selectedTeam
        }}</span>
      <template #trailing>
        <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
      </template>
    </UButton>
  </UDropdown>
</template>
