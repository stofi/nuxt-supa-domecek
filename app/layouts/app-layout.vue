<script setup lang="ts">
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

const links = computed(() => [
  {
    id: 'home',
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/app',
    tooltip: {
      text: 'Dashboard',
      shortcuts: ['G', 'D']
    }
  },
  // employee Employees
  {
    id: 'employee',
    label: 'Employees',
    icon: 'i-heroicons-user-group',
    to: '/app/employee',
    tooltip: {
      text: 'Employee',
      shortcuts: ['G', 'E']
    }
  },
  // role Roles
  {
    id: 'role',
    label: 'Roles',
    icon: 'i-heroicons-shield-check',
    to: '/app/role',
    tooltip: {
      text: 'Role',
      shortcuts: ['G', 'R']
    }
  },
  // shift Shifts
  {
    id: 'shift',
    label: 'Shifts',
    icon: 'i-heroicons-calendar',
    to: '/app/shift',
    tooltip: {
      text: 'Shift',
      shortcuts: ['G', 'S']
    }
  },
  // vacation Vacations
  {
    id: 'vacation',
    label: 'Vacations',
    icon: 'i-heroicons-calendar',
    to: '/app/vacation',
    tooltip: {
      text: 'Vacation',
      shortcuts: ['G', 'V']
    }
  },
  // timeslot Timeslots
  {
    id: 'timeslot',
    label: 'Timeslots',
    icon: 'i-heroicons-clock',
    to: '/app/timeslot',
    tooltip: {
      text: 'Timeslot',
      shortcuts: ['G', 'T']
    }
  },
  // teams Teams
  {
    id: 'team',
    label: 'Teams',
    icon: 'i-heroicons-users',
    to: '/app/team',
    tooltip: {
      text: 'Team',
      shortcuts: ['G', 'T']
    }
  },
  {
    id: 'settings',
    label: 'Settings',
    to: '/app/settings',
    icon: 'i-heroicons-cog-8-tooth',

    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S']
    }
  }

])

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
