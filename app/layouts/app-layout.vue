<script setup lang="ts">
import { pageDefinitions } from '~/pageDefinitions'

const client = useSupabaseClient()
// const user = useSupabaseUser()
const _appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()
// const { role, checkRole } = useUsers()

// await checkRole()
// watch(user, checkRole)

client.auth.onAuthStateChange(async (event, _session) => {
  if (event === 'SIGNED_IN') {
    // await checkRole()
  }
})

const links = computed(() =>
  pageDefinitions.map(page => ({
    id: page.id,
    label: page.label,
    icon: page.icon,
    to: page.to,
    tooltip: {
      text: page.label,
      shortcuts: page.shortcuts
    },
    children: page.children
  }))
)

const footerLinks = [
  //   {
  //   label: 'Invite people',
  //   icon: 'i-heroicons-plus',
  //   to: '/app/settings/members'
  // },
  {
    label: 'Shortcuts',
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true)
  }
]

// const { fetchEntries, query, notes: entries } = useEntries()

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.value.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts
    }))
  }
  // {
  //   key: 'notes',
  //   label: (q: string) => q && `Notes matching "${q}"...`,
  //   search: async (q: string) => {
  //     if (!q) {
  //       return []
  //     }

  //     query.value.q = q

  //     await fetchEntries()

  //     const notes = entries.value
  //     if (!notes) {
  //       return []
  //     }
  //     return notes.map(note => ({
  //       id: note.id,
  //       label: note.title,
  //       suffix: note.body ? note.body.substring(0, 50) + '...' : '',
  //       to: `/app/notes/${note.id}`
  //     }))
  //   }
  // }
]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }" title="">
        <template #left>
          <TeamsDropdown />
        </template>

      </UDashboardNavbar>
      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <UDashboardPage>
      <UDashboardPanel grow>
        <slot />
      </UDashboardPanel>
    </UDashboardPage>

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <!-- <NotificationsSlideover /> -->

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
