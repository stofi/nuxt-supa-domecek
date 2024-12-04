<script setup lang="ts">
import { pageDefinitions } from '~/pageDefinitions'

const { locale, t, setLocale, locales } = useI18n()

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
    label: t(page.label),
    icon: page.icon,
    to: page.to,
    tooltip: {
      text: t(page.label),
      shortcuts: page.shortcuts
    },
    children: page.children?.map(c => ({ ...c, label: t(c.label) })) ?? []
  }))
)

const footerLinks = computed(() => [
  // {
  //   label: 'Invite people',
  //   icon: 'i-heroicons-plus',
  //   to: '/app/settings/members'
  // },
  {
    label: t('app.layout.shortcuts'),
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true)
  }
])

const groups = computed(() => [
  {
    key: 'links',
    label: t('app.layout.goTo'),
    commands: links.value.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts
    }))
  }
])

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
          <UDashboardSearchButton :label="$t('app.layout.search')" />
        </template>

        <UDashboardSidebarLinks :ui="linksUi" :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :ui="linksUi" :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <div class="flex flex-col justify-stretch w-full gap-2">
            <UButtonGroup class="self-center" size="sm">
              <UButton
v-for="l in locales" :key="l" :variant="l === locale ? 'solid' : 'ghost'"
                :disabled="l === locale" square @click="setLocale(l)">
                <span class="px-1">{{ $t(`locale.${l}`) }}</span>

              </UButton>
            </UButtonGroup>
            <UserDropdown />
          </div>
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
      <LazyUDashboardSearch
      :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
