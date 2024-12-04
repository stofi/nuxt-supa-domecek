const en = {
  welcome: 'Welcome',
  locale: {
    en: 'English',
    cs: 'Česky'
  },
  app: {
    layout: {
      shortcuts: 'Shortcuts',
      goTo: 'Go to',
      search: 'Search'
    },
    footer: {
      subscribeToNewsletter: 'Subscribe to our newsletter',
      enterYourEmail: 'Enter your email',
      subscribing: 'Subscribing',
      subscribe: 'Subscribe',
      copyright: 'Copyright © {year}. All rights reserved.',
      subscribed: 'Subscribed!',
      subscribedMessage: 'You\'ve been subscribed to our newsletter.'

    },
    header: {
      newBadge: 'New',
      signIn: 'Sign in',
      signUp: 'Sign up',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    helpSlideover: {
      titleShortcuts: 'Shortcuts',
      titleHelpSupport: 'Help & Support',
      searchPlaceholder: 'Search...',
      categoryNavigation: 'Navigation',
      categoryGeneral: 'General',
      commandMenu: 'Command menu',
      notifications: 'Notifications',
      search: 'Search'
    }
  },
  page: {
    dashboard: {
      label: 'Dashboard'
    },
    employees: {
      label: 'Employees'
    },
    employee: {
      label: 'Employee',
      new: {
        label: 'New Employee',
        employeeDetails: 'Employee details',
        fillEmployeeDetails: 'Fill in the details of the new employee'
      }
    },
    roles: {
      label: 'Roles'
    },
    role: {
      label: 'Role',
      new: {
        label: 'New Role',
        roleDetails: 'Role details',
        fillRoleDetails: 'Fill in the details of the new role'
      }
    },
    vacations: {
      label: 'Vacations'
    },
    vacation: {
      label: 'Vacation',
      new: {
        label: 'New Vacation',
        vacationDetails: 'Vacation details',
        fillVacationDetails: 'Fill in the details of the new vacation'
      }
    },
    timeslots: {
      label: 'Timeslots'
    },
    timeslot: {
      label: 'Timeslot',
      new: {
        label: 'New Timeslot',
        timeslotDetails: 'Timeslot details',
        fillTimeslotDetails: 'Fill in the details of the new timeslot'
      }
    },
    shift: {
      label: 'Shift',
      addTimeslot: 'Add Timeslot'
    },
    settings: {
      label: 'Settings',
      general: {
        label: 'General'
      },
      teams: {
        label: 'Teams'
      },
      team: {
        label: 'Team',
        new: {
          label: 'New Team',
          teamDetails: 'Team details',
          fillTeamDetails: 'Fill in the details of the new team'
        }
      }
    },
    login: {
      label: 'Login'
    },
    signup: {
      label: 'Signup'
    },
    confirmRedirect: {
      label: 'Confirm Redirect'
    },
    forgotPassword: {
      label: 'Forgot Password'
    },
    signupSuccess: {
      label: 'Signup Success'
    }
  },
  form: {
    common: {
      nameLabel: 'Name',
      submitButton: 'Submit',
      select: 'Select'
    },
    employee: {
      contractLabel: 'Contract',
      roleLabel: 'Role',
      selectEmployee: 'Select Employee'
    },
    role: {
      colorLabel: 'Color',
      shortnameLabel: 'Shortname',
      priorityLabel: 'Priority',
      selectRole: 'Select Role',
      selectRoles: 'Select Roles'
    },
    timeslot: {
      dateLabel: 'Date',
      roleLabel: 'Role',
      employeeLabel: 'Employee',
      startTimeLabel: 'Start time',
      endTimeLabel: 'End time',
      breakLabel: 'Break'
    },
    vacation: {
      employeeLabel: 'Employee',
      dateLabel: 'Date'
    },
    team: {
      selectTeam: 'Select team',
      ownerLabel: 'Owner'
    }
  },
  team: {
    createTeam: 'Create team',
    manageTeams: 'Manage teams'
  },
  buttons: {
    refresh: 'Refresh',
    newEmployee: 'New Employee',
    newRole: 'New Role',
    newTeam: 'New Team',
    newVacation: 'New Vacation',
    newTimeslot: 'New Timeslot',
    print: 'Print',
    deleteAccount: 'Delete account',
    home: 'Home',
    settings: 'Settings',
    signOut: 'Sign out',
    submit: 'Submit',
    login: 'Login',
    createAccount: 'Create account'
  },
  auth: {
    welcomeBack: 'Welcome back',
    dontHaveAccount: 'Don\'t have an account?',
    signUp: 'Sign up',
    forgotPassword: 'Forgot password?',
    bySigningIn: 'By signing in, you agree to our',
    termsOfService: 'Terms of Service',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Login',
    signupSuccess: 'Signup Success',
    checkEmailVerification: 'Please check your email for a verification link.'
  },
  errors: {
    invalidEmailOrPassword: 'Invalid email or password',
    userAlreadyExists: 'User already exists. Please login.',
    errorCreatingAccount: 'Error creating account. Please try again.',
    pageNotFound: 'Page not found',
    pageNotFoundMessage: 'We are sorry but this page could not be found.',
    loading: 'Loading...',
    error: 'Error',
    waitingForLogin: 'Waiting for login...'
  },
  user: {
    dropdown: {
      signedInAs: 'Signed in as',
      accountSettings: 'Settings',
      commandMenu: 'Command menu',
      shortcuts: 'Shortcuts',
      signOut: 'Sign out'
    }
  },
  misc: {
    profile: 'Profile',
    theme: 'Theme',
    customizeDashboard: 'Customize the look and feel of your dashboard.',
    deleteAccount: 'Delete account',
    deleteAccountDescription: 'No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.',

    selectDate: 'Select Date',
    notSelected: 'Not selected',
    noShift: 'No shift'
  },
  colors: {
    red: 'Red',
    blue: 'Blue',
    green: 'Green',
    yellow: 'Yellow',
    purple: 'Purple',
    pink: 'Pink',
    indigo: 'Indigo',
    cyan: 'Cyan',
    teal: 'Teal',
    gray: 'Gray'
  }
}

type Translations = typeof en

const cs: Translations = {
  welcome: 'Vítejte',
  locale: {
    en: 'English',
    cs: 'Česky'
  },
  app: {
    layout: {
      shortcuts: 'Zkratky',
      goTo: 'Přejít na',
      search: 'Hledat'
    },
    footer: {
      subscribeToNewsletter: 'Přihlaste se k odběru novinek',
      enterYourEmail: 'Zadejte svůj email',
      subscribing: 'Přihlašuji',
      subscribe: 'Přihlásit',
      copyright: 'Copyright © {year}. Všechna práva vyhrazena.',
      subscribed: 'Přihlášeno!',
      subscribedMessage: 'Byli jste přihlášeni k odběru našeho newsletteru.'
    },
    header: {
      newBadge: 'Nové',
      signIn: 'Přihlásit se',
      signUp: 'Zaregistrovat se',
      dashboard: 'Přehled',
      logout: 'Odhlásit se'
    },
    helpSlideover: {
      titleShortcuts: 'Zkratky',
      titleHelpSupport: 'Nápověda a podpora',
      searchPlaceholder: 'Hledat...',
      categoryNavigation: 'Navigace',
      categoryGeneral: 'Obecné',
      commandMenu: 'Příkazové menu',
      notifications: 'Notifikace',
      search: 'Hledat'
    }
  },
  page: {
    dashboard: {
      label: 'Přehled'
    },
    employees: {
      label: 'Zaměstnanci'
    },
    employee: {
      label: 'Zaměstnanec',
      new: {
        label: 'Nový zaměstnanec',
        employeeDetails: 'Detaily zaměstnance',
        fillEmployeeDetails: 'Vyplňte detaily nového zaměstnance'
      }
    },
    roles: {
      label: 'Role'
    },
    role: {
      label: 'Role',
      new: {
        label: 'Nová role',
        roleDetails: 'Detaily role',
        fillRoleDetails: 'Vyplňte detaily nové role'
      }
    },
    vacations: {
      label: 'Dovolená'
    },
    vacation: {
      label: 'Dovolená',
      new: {
        label: 'Nová dovolená',
        vacationDetails: 'Detaily dovolené',
        fillVacationDetails: 'Vyplňte detaily nové dovolené'
      }
    },
    timeslots: {
      label: 'Časové sloty'
    },
    timeslot: {
      label: 'Časový slot',
      new: {
        label: 'Nový časový slot',
        timeslotDetails: 'Detaily časového slotu',
        fillTimeslotDetails: 'Vyplňte detaily nového časového slotu'
      }
    },
    shift: {
      label: 'Směna',
      addTimeslot: 'Přidat časový slot'
    },
    settings: {
      label: 'Nastavení',
      general: {
        label: 'Obecné'
      },
      teams: {
        label: 'Týmy'
      },
      team: {
        label: 'Tým',
        new: {
          label: 'Nový tým',
          teamDetails: 'Detaily týmu',
          fillTeamDetails: 'Vyplňte detaily nového týmu'
        }
      }
    },
    login: {
      label: 'Přihlášení'
    },
    signup: {
      label: 'Registrace'
    },
    confirmRedirect: {
      label: 'Potvrzení přesměrování'
    },
    forgotPassword: {
      label: 'Zapomenuté heslo'
    },
    signupSuccess: {
      label: 'Registrace úspěšná'
    }
  },
  form: {
    common: {
      nameLabel: 'Jméno',
      submitButton: 'Odeslat',
      select: 'Vybrat'
    },
    employee: {
      contractLabel: 'Úvazek',
      roleLabel: 'Role',
      selectEmployee: 'Vyberte zaměstnance'
    },
    role: {
      colorLabel: 'Barva',
      shortnameLabel: 'Zkratka',
      priorityLabel: 'Priorita',
      selectRole: 'Vyberte roli',
      selectRoles: 'Vyberte role'
    },
    timeslot: {
      dateLabel: 'Datum',
      roleLabel: 'Role',
      employeeLabel: 'Zaměstnanec',
      startTimeLabel: 'Začátek',
      endTimeLabel: 'Konec',
      breakLabel: 'Přestávka'
    },
    vacation: {
      employeeLabel: 'Zaměstnanec',
      dateLabel: 'Datum'
    },
    team: {
      selectTeam: 'Vybrat tým',
      ownerLabel: 'Vlastník'
    }
  },
  team: {
    createTeam: 'Vytvořit tým',
    manageTeams: 'Spravovat týmy'
  },
  buttons: {
    refresh: 'Obnovit',
    newEmployee: 'Nový zaměstnanec',
    newRole: 'Nová role',
    newTeam: 'Nový tým',
    newVacation: 'Nová dovolená',
    newTimeslot: 'Nový časový slot',
    print: 'Tisk',
    deleteAccount: 'Smazat účet',
    home: 'Domů',
    settings: 'Nastavení',
    signOut: 'Odhlásit se',
    submit: 'Odeslat',
    login: 'Přihlásit se',
    createAccount: 'Vytvořit účet'
  },
  auth: {
    welcomeBack: 'Vítejte zpět',
    dontHaveAccount: 'Nemáte účet?',
    signUp: 'Zaregistrujte se',
    forgotPassword: 'Zapomněli jste heslo?',
    bySigningIn: 'Přihlášením souhlasíte s našimi',
    termsOfService: 'Podmínkami služby',
    alreadyHaveAccount: 'Už máte účet?',
    login: 'Přihlaste se',
    signupSuccess: 'Úspěšná registrace',
    checkEmailVerification: 'Prosím zkontrolujte svůj email pro ověřovací odkaz.'
  },
  errors: {
    invalidEmailOrPassword: 'Neplatný email nebo heslo',
    userAlreadyExists: 'Uživatel již existuje. Prosím přihlaste se.',
    errorCreatingAccount: 'Chyba při vytváření účtu. Zkuste to prosím znovu.',
    pageNotFound: 'Stránka nenalezena',
    pageNotFoundMessage: 'Je nám líto, ale tato stránka nebyla nalezena.',
    loading: 'Načítání...',
    error: 'Chyba',
    waitingForLogin: 'Čeká se na přihlášení...'
  },
  user: {
    dropdown: {
      signedInAs: 'Přihlášen jako',
      accountSettings: 'Nastavení',
      commandMenu: 'Příkazové menu',
      shortcuts: 'Zkratky',
      signOut: 'Odhlásit se'
    }
  },
  misc: {
    profile: 'Profil',
    theme: 'Motiv',
    customizeDashboard: 'Přizpůsobte vzhled a dojem z vašeho dashboardu.',
    deleteAccount: 'Smazat účet',
    deleteAccountDescription: 'Už nechcete používat naše služby? Zde můžete smazat svůj účet. Tato akce je nevratná. Všechny informace související s tímto účtem budou trvale smazány.',
    selectDate: 'Vybrat datum',
    notSelected: 'Nevybráno',
    noShift: 'Žádná směna'
  },
  colors: {
    red: 'Červená',
    blue: 'Modrá',
    green: 'Zelená',
    yellow: 'Žlutá',
    purple: 'Fialová',
    pink: 'Růžová',
    indigo: 'Indigo',
    cyan: 'Cyan',
    teal: 'Teal',
    gray: 'Šedá'
  }
}

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'cs',
  messages: {
    en,
    cs
  }
}))
