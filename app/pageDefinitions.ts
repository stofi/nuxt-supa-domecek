export const pageDefinitions = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/app',
    shortcuts: ['G', 'D']
  },
  {
    id: 'employee',
    label: 'Employees',
    icon: 'i-heroicons-user-group',
    to: '/app/employee',
    shortcuts: ['G', 'E']
  },
  {
    id: 'role',
    label: 'Roles',
    icon: 'i-heroicons-shield-check',
    to: '/app/role',
    shortcuts: ['G', 'U']
  },
  {
    id: 'vacation',
    label: 'Vacations',
    icon: 'i-heroicons-calendar',
    to: '/app/vacation',
    shortcuts: ['G', 'V']
  },
  {
    id: 'timeslot',
    label: 'Timeslots',
    icon: 'i-heroicons-clock',
    to: '/app/timeslot',
    shortcuts: ['G', 'T']
  },

  {
    id: 'settings',
    label: 'Settings',
    to: '/app/settings',
    icon: 'i-heroicons-cog-8-tooth',
    shortcuts: ['G', 'S'],
    defaultOpen: false,
    children: [
      {
        id: 'general',
        label: 'General',
        to: '/app/settings/',
        exact: true
      },
      {
        id: 'team',
        label: 'Teams',
        to: '/app/settings/team'
      }
    ]
  }
]
