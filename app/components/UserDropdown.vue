<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()
const { isDashboardSearchModalOpen } = useUIState()
const { metaSymbol } = useShortcuts()

const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()

// const { roleString, roleIcon } = useUsers()
const logout = async () => {
  const { error } = await supabaseClient.auth.signOut()
  if (error) {
    console.error('Error logging out:', error)
  } else {
    // Redirect to home page or login page after successful logout
    navigateTo('/')
  }
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
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth',
      to: '/app/settings'
    },
    {
      label: 'Command menu',
      icon: 'i-heroicons-command-line',
      shortcuts: [metaSymbol.value, 'K'],
      click: () => {
        isDashboardSearchModalOpen.value = true
      }
    },
    {
      label: 'Shortcuts',
      icon: 'i-heroicons-question-mark-circle',
      shortcuts: ['?'],
      click: () => (isHelpSlideoverOpen.value = true)
    }
  ],
  // [{
  //
  //   label: 'Documentation',
  //   icon: 'i-heroicons-book-open',
  //   to: '/docs',
  //   target: '_blank'
  // }],
  [
    {
      label: 'Sign out',
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
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <div>
          <p>Signed in as</p>
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
