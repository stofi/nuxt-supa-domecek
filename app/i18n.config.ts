const en = {
  welcome: 'Welcome',
  locale: {
    en: 'English',
    cs: 'Česky'
  },
  general: {
    settings: 'Settings',
    submit: 'Submit',
    signOut: 'Sign out',
    signUp: 'Sign up',
    signIn: 'Sign in',
    login: 'Login',
    deleteAccount: 'Delete account',
    dashboard: 'Dashboard',
    shortcuts: 'Shortcuts',
    commandMenu: 'Command menu',
    error: 'Error',
    select: 'Select',
    date: 'Date',
    employee: 'Employee',
    role: 'Role',
    team: 'Team',
    vacation: 'Vacation',
    timeslot: 'Shift',
    home: 'Home',
    refresh: 'Refresh',
    print: 'Print',
    theme: 'Theme',
    profile: 'Profile',
    createAccount: 'Create account',
    selectDate: 'Select Date',
    notSelected: 'Not selected',
    noShift: 'No shift',
    new: 'New',
    owner: 'Owner',
    nameLabel: 'Name',
    termsOfService: 'Terms of Service'
  },
  app: {
    layout: {
      shortcuts: '@:general.shortcuts',
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
      newBadge: '@:general.new',
      signIn: '@:general.signIn',
      signUp: '@:general.signUp',
      dashboard: '@:general.dashboard',
      logout: 'Logout'
    },
    helpSlideover: {
      titleShortcuts: '@:general.shortcuts',
      titleHelpSupport: 'Help & Support',
      searchPlaceholder: 'Search...',
      categoryNavigation: 'Navigation',
      categoryGeneral: 'General',
      commandMenu: '@:general.commandMenu',
      notifications: 'Notifications',
      search: 'Search'
    }
  },
  page: {
    dashboard: {
      label: '@:general.dashboard'
    },
    employees: {
      label: 'Employees'
    },
    employee: {
      label: '@:general.employee',
      new: {
        label: '@:general.new @:general.employee',
        employeeDetails: 'Employee details',
        fillEmployeeDetails: 'Fill in the details of the new employee'
      }
    },
    roles: {
      label: 'Roles'
    },
    role: {
      label: '@:general.role',
      new: {
        label: '@:general.new @:general.role',
        roleDetails: 'Role details',
        fillRoleDetails: 'Fill in the details of the new role'
      }
    },
    vacations: {
      label: 'Vacations'
    },
    vacation: {
      label: '@:general.vacation',
      new: {
        label: '@:general.new @:general.vacation',
        vacationDetails: 'Vacation details',
        fillVacationDetails: 'Fill in the details of the new vacation'
      }
    },
    timeslots: {
      label: 'Shifts'
    },
    timeslot: {
      label: '@:general.timeslot',
      new: {
        label: '@:general.new @:general.timeslot',
        timeslotDetails: 'Shift details',
        fillTimeslotDetails: 'Fill in the details of the new shift'
      }
    },
    shift: {
      label: 'Shift',
      addTimeslot: 'Add shift'
    },
    settings: {
      label: '@:general.settings',
      general: {
        label: 'General'
      },
      teams: {
        label: 'Teams'
      },
      team: {
        label: '@:general.team',
        new: {
          label: '@:general.new @:general.team',
          teamDetails: 'Team details',
          fillTeamDetails: 'Fill in the details of the new team'
        }
      }
    },
    login: {
      label: '@:general.login'
    },
    signup: {
      label: '@:general.signUp'
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
      nameLabel: '@:general.nameLabel',
      submitButton: '@:general.submit',
      select: '@:general.select'
    },
    employee: {
      contractLabel: 'Contract',
      roleLabel: '@:general.role',
      selectEmployee: 'Select Employee',
      validation: {
        nameMin: 'Name must be at least 1 character long',
        nameMax: 'Name must be at most 255 characters long'
      }
    },
    role: {
      colorLabel: 'Color',
      shortnameLabel: 'Shortname',
      priorityLabel: 'Priority',
      selectRole: 'Select Role',
      selectRoles: 'Select Roles'
    },
    timeslot: {
      dateLabel: '@:general.date',
      roleLabel: '@:general.role',
      employeeLabel: '@:general.employee',
      startTimeLabel: 'Start time',
      endTimeLabel: 'End time',
      breakLabel: 'Break'
    },
    vacation: {
      employeeLabel: '@:general.employee',
      dateLabel: '@:general.date'
    },
    team: {
      selectTeam: 'Select team',
      ownerLabel: '@:general.owner'
    }
  },
  team: {
    createTeam: 'Create team',
    manageTeams: 'Manage teams'
  },
  buttons: {
    refresh: '@:general.refresh',
    newEmployee: 'New Employee',
    newRole: 'New Role',
    newTeam: 'New Team',
    newVacation: 'New Vacation',
    newTimeslot: 'New Shift',
    print: '@:general.print',
    deleteAccount: '@:general.deleteAccount',
    home: '@:general.home',
    settings: '@:general.settings',
    signOut: '@:general.signOut',
    submit: '@:general.submit',
    login: '@:general.login',
    createAccount: '@:general.createAccount'
  },
  auth: {
    welcomeBack: 'Welcome back',
    dontHaveAccount: 'Don\'t have an account?',
    signUp: '@:general.signUp',
    forgotPassword: 'Forgot password?',
    bySigningIn: 'By signing in, you agree to our',
    termsOfService: '@:general.termsOfService',
    alreadyHaveAccount: 'Already have an account?',
    login: '@:general.login',
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
    error: '@:general.error',
    waitingForLogin: 'Waiting for login...'
  },
  user: {
    dropdown: {
      signedInAs: 'Signed in as',
      accountSettings: '@:general.settings',
      commandMenu: '@:general.commandMenu',
      shortcuts: '@:general.shortcuts',
      signOut: '@:general.signOut'
    }
  },
  misc: {
    profile: '@:general.profile',
    theme: '@:general.theme',
    customizeDashboard: 'Customize the look and feel of your dashboard.',
    deleteAccount: '@:general.deleteAccount',
    deleteAccountDescription: 'No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.',
    selectDate: '@:general.selectDate',
    notSelected: '@:general.notSelected',
    noShift: '@:general.noShift'
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
  general: {
    settings: 'Nastavení',
    submit: 'Odeslat',
    signOut: 'Odhlásit se',
    signUp: 'Zaregistrovat se',
    signIn: 'Přihlásit se',
    login: 'Přihlášení',
    deleteAccount: 'Smazat účet',
    dashboard: 'Přehled',
    shortcuts: 'Zkratky',
    commandMenu: 'Příkazové menu',
    error: 'Chyba',
    select: 'Vybrat',
    date: 'Datum',
    employee: 'Zaměstnanec',
    role: 'Úloha',
    team: 'Tým',
    vacation: 'Dovolená',
    timeslot: 'Směna',
    home: 'Domů',
    refresh: 'Obnovit',
    print: 'Tisk',
    theme: 'Motiv',
    profile: 'Profil',
    createAccount: 'Vytvořit účet',
    selectDate: 'Vybrat datum',
    notSelected: 'Nevybráno',
    noShift: 'Žádná směna',
    new: 'Nové',
    owner: 'Vlastník',
    nameLabel: 'Jméno',
    termsOfService: 'Podmínkami služby'
  },
  app: {
    layout: {
      shortcuts: '@:general.shortcuts',
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
      newBadge: '@:general.new',
      signIn: '@:general.signIn',
      signUp: '@:general.signUp',
      dashboard: '@:general.dashboard',
      logout: '@:general.signOut'
    },
    helpSlideover: {
      titleShortcuts: '@:general.shortcuts',
      titleHelpSupport: 'Nápověda a podpora',
      searchPlaceholder: 'Hledat...',
      categoryNavigation: 'Navigace',
      categoryGeneral: 'Obecné',
      commandMenu: '@:general.commandMenu',
      notifications: 'Notifikace',
      search: 'Hledat'
    }
  },
  page: {
    dashboard: {
      label: '@:general.dashboard'
    },
    employees: {
      label: 'Zaměstnanci'
    },
    employee: {
      label: '@:general.employee',
      new: {
        label: '@:general.new @:general.employee',
        employeeDetails: 'Detaily zaměstnance',
        fillEmployeeDetails: 'Vyplňte detaily nového zaměstnance'
      }
    },
    roles: {
      label: 'Úlohy'
    },
    role: {
      label: '@:general.role',
      new: {
        label: '@:general.new @:general.role',
        roleDetails: 'Detaily úlohy',
        fillRoleDetails: 'Vyplňte detaily nové úlohy'
      }
    },
    vacations: {
      label: 'Dovolená'
    },
    vacation: {
      label: '@:general.vacation',
      new: {
        label: '@:general.new @:general.vacation',
        vacationDetails: 'Detaily dovolené',
        fillVacationDetails: 'Vyplňte detaily nové dovolené'
      }
    },
    timeslots: {
      label: 'Směny'
    },
    timeslot: {
      label: '@:general.timeslot',
      new: {
        label: '@:general.new @:general.timeslot',
        timeslotDetails: 'Detaily směny',
        fillTimeslotDetails: 'Vyplňte detaily nové směny'
      }
    },
    shift: {
      label: 'Směna',
      addTimeslot: 'Přidat směnu'
    },
    settings: {
      label: '@:general.settings',
      general: {
        label: 'Obecné'
      },
      teams: {
        label: 'Týmy'
      },
      team: {
        label: '@:general.team',
        new: {
          label: '@:general.new @:general.team',
          teamDetails: 'Detaily týmu',
          fillTeamDetails: 'Vyplňte detaily nového týmu'
        }
      }
    },
    login: {
      label: '@:general.login'
    },
    signup: {
      label: '@:general.signUp'
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
      nameLabel: '@:general.nameLabel',
      submitButton: '@:general.submit',
      select: '@:general.select'
    },
    employee: {
      contractLabel: 'Úvazek',
      roleLabel: '@:general.role',
      selectEmployee: 'Vyberte zaměstnance',
      validation: {
        nameMin: 'Jméno musí být alespoň 1 znak dlouhé',
        nameMax: 'Jméno musí být nejvíce 255 znaků dlouhé'
      }
    },
    role: {
      colorLabel: 'Barva',
      shortnameLabel: 'Zkratka',
      priorityLabel: 'Priorita',
      selectRole: 'Vyberte úlohu',
      selectRoles: 'Vyberte úlohy'
    },
    timeslot: {
      dateLabel: '@:general.date',
      roleLabel: '@:general.role',
      employeeLabel: '@:general.employee',
      startTimeLabel: 'Začátek',
      endTimeLabel: 'Konec',
      breakLabel: 'Přestávka'
    },
    vacation: {
      employeeLabel: '@:general.employee',
      dateLabel: '@:general.date'
    },
    team: {
      selectTeam: 'Vybrat tým',
      ownerLabel: '@:general.owner'
    }
  },
  team: {
    createTeam: 'Vytvořit tým',
    manageTeams: 'Spravovat týmy'
  },
  buttons: {
    refresh: '@:general.refresh',
    newEmployee: 'Nový zaměstnanec',
    newRole: 'Nová úloha',
    newTeam: 'Nový tým',
    newVacation: 'Nová dovolená',
    newTimeslot: 'Nová směna',
    print: '@:general.print',
    deleteAccount: '@:general.deleteAccount',
    home: '@:general.home',
    settings: '@:general.settings',
    signOut: '@:general.signOut',
    submit: '@:general.submit',
    login: '@:general.login',
    createAccount: '@:general.createAccount'
  },
  auth: {
    welcomeBack: 'Vítejte zpět',
    dontHaveAccount: 'Nemáte účet?',
    signUp: '@:general.signUp',
    forgotPassword: 'Zapomněli jste heslo?',
    bySigningIn: 'Přihlášením souhlasíte s našimi',
    termsOfService: '@:general.termsOfService',
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
    error: '@:general.error',
    waitingForLogin: 'Čeká se na přihlášení...'
  },
  user: {
    dropdown: {
      signedInAs: 'Přihlášen jako',
      accountSettings: '@:general.settings',
      commandMenu: '@:general.commandMenu',
      shortcuts: '@:general.shortcuts',
      signOut: '@:general.signOut'
    }
  },
  misc: {
    profile: '@:general.profile',
    theme: '@:general.theme',
    customizeDashboard: 'Přizpůsobte vzhled a dojem z vašeho dashboardu.',
    deleteAccount: '@:general.deleteAccount',
    deleteAccountDescription: 'Už nechcete používat naše služby? Zde můžete smazat svůj účet. Tato akce je nevratná. Všechny informace související s tímto účtem budou trvale smazány.',
    selectDate: '@:general.selectDate',
    notSelected: '@:general.notSelected',
    noShift: '@:general.noShift'
  },
  colors: {
    red: 'Červená',
    blue: 'Modrá',
    green: 'Zelená',
    yellow: 'Žlutá',
    purple: 'Fialová',
    pink: 'Růžová',
    indigo: 'Indigo',
    cyan: 'Azurová',
    teal: 'Modrozelená',
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
