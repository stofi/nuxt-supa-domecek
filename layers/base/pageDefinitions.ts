export const pageDefinitions = [
  {
    id: 'home',
    label: 'page.dashboard.label',
    icon: 'i-heroicons-home',
    to: '/app',
    shortcuts: ['G', 'D']
  },
  {
    id: 'employee',
    label: 'page.employees.label',
    icon: 'i-heroicons-user-group',
    to: '/app/employee',
    shortcuts: ['G', 'E']
  },
  {
    id: 'role',
    label: 'page.roles.label',
    icon: 'i-heroicons-shield-check',
    to: '/app/role',
    shortcuts: ['G', 'U']
  },
  {
    id: 'vacation',
    label: 'page.vacations.label',
    icon: 'i-heroicons-calendar',
    to: '/app/vacation',
    shortcuts: ['G', 'V']
  },
  {
    id: 'timeslot',
    label: 'page.timeslots.label',
    icon: 'i-heroicons-clock',
    to: '/app/timeslot',
    shortcuts: ['G', 'T']
  },
  {
    id: 'print',
    label: 'page.print.label',
    icon: 'i-heroicons-printer',
    to: '/app/print',
    shortcuts: ['G', 'P']
  },
  {
    id: 'settings',
    label: 'page.settings.label',
    to: '/app/settings',
    icon: 'i-heroicons-cog-8-tooth',
    shortcuts: ['G', 'S'],
    defaultOpen: false,
    children: [
      {
        id: 'general',
        label: 'page.settings.general.label',
        to: '/app/settings/',
        exact: true
      },
      {
        id: 'team',
        label: 'page.settings.teams.label',
        to: '/app/settings/team'
      }
    ]
  }
]
