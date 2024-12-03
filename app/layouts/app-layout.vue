<script setup lang="ts">
import { pageDefinitions } from '~/pageDefinitions'

const client = useSupabaseClient()
// const user = useSupabaseUser()
const _appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

client.auth.refreshSession()

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

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.value.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts
    }))
  }
]

const linksUi = {
  active: 'text-gray-950 before:bg-white font-semibold',
  inactive: 'text-gray-700',
  icon: {
    active: 'text-gray-950 dark:text-white',
    inactive: 'text-gray-700'
  }
}
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
:width="250" :resizable="{ min: 200, max: 300 }" collapsible
      :ui="{ wrapper: 'bg-gray-50 dark:bg-gray-950' }">
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }" title="">
        <template #left>
          <TeamDropdown />
        </template>

      </UDashboardNavbar>
      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :ui="linksUi" :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :ui="linksUi" :links="footerLinks" />

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
