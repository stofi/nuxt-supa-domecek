<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()
const { isDashboardSearchModalOpen } = useUIState()
const { metaSymbol } = useShortcuts()

const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()

const { t } = useI18n()
const teamId = useCookie<number | undefined>('teamId')

const logout = async () => {
  const { error } = await supabaseClient.auth.signOut()
  if (error) {
    console.error('Error logging out:', error)
  }
  navigateTo('/')
  teamId.value = undefined
}

const items = computed(() => [
  [
    {
      slot: 'account',
      label: '',
      disabled: true
    }
  ],
  [
    {
      label: t('user.dropdown.accountSettings'),
      icon: 'i-heroicons-cog-8-tooth',
      to: '/app/settings'
    },
    {
      label: t('user.dropdown.commandMenu'),
      icon: 'i-heroicons-command-line',
      shortcuts: [metaSymbol.value, 'K'],
      click: () => {
        isDashboardSearchModalOpen.value = true
      }
    },
    {
      label: t('user.dropdown.shortcuts'),
      icon: 'i-heroicons-question-mark-circle',
      shortcuts: ['?'],
      click: () => (isHelpSlideoverOpen.value = true)
    }
  ],
  [
    {
      label: t('user.dropdown.signOut'),
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: logout
    }
  ]
])
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        class="w-full"
        :label="user?.user_metadata?.name ?? user?.email ?? 'User'"
        :class="[open && 'bg-white dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            :src="user?.user_metadata?.avatar_url"
            :alt="user?.user_metadata?.name"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon
            name="i-heroicons-ellipsis-vertical"
            class="w-5 h-5 ml-auto"
          />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <div>
          <p>{{ $t('user.dropdown.signedInAs') }}</p>
          <p class="font-medium text-gray-900 truncate dark:text-white">
            {{ user?.email }}
          </p>
        </div>
        <!-- <div class="flex items-center gap-1 mt-1">
          <UIcon :name="roleIcon" class="w-5 h-4" />
          <span class="font-bold text-gray-900 dark:text-white">{{
            roleString
          }}</span>
        </div> -->
      </div>
    </template>
  </UDropdown>
</template>
