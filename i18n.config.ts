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
    termsOfService: 'Terms of Service',
    continue: 'Continue'
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
        fillEmployeeDetails: 'Fill in the details of the employee'
      },
      archive: {
        success: 'Employee archived successfully',
        error: 'Error archiving employee'
      },
      delete: {
        title: 'Delete Employee',
        description: 'Are you sure you want to delete this employee? The employee will be deleted from all past shifts and vacations. This action is not reversible. Consider archiving the employee instead.',
        success: 'Employee deleted successfully',
        error: 'Error deleting employee'
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
        fillRoleDetails: 'Fill in the details of the role'
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
        fillVacationDetails: 'Fill in the details of the vacation'
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
        fillTimeslotDetails: 'Fill in the details of the shift'
      }
    },
    print: {
      label: '@:general.print'
    },
    shift: {
      label: 'Shift',
      addTimeslot: 'Add shift',
      timeslotsLabel: 'Shifts',
      timelineLabel: 'Timeline'
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
          fillTeamDetails: 'Fill in the details of the team'
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
      label: 'Forgot Password',
      goBackTo: 'Go back to'
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
    },
    auth: {
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      submitButton: '@:general.continue',
      nameLabel: '@:general.nameLabel',
      namePlaceholder: 'Enter your name',
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Email is invalid',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 6 characters long',
        nameRequired: 'Name is required'
      }
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
    createAccount: '@:general.createAccount',
    archive: 'Archive',
    delete: 'Delete',
    cancel: 'Cancel'
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
    waitingForLogin: 'Waiting for login...',
    passwordResetError: 'Error resetting password'
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
    termsOfService: 'Podmínkami služby',
    continue: 'Pokračovat'
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
        fillEmployeeDetails: 'Vyplňte detaily zaměstnance'
      },
      archive: {
        success: 'Zaměstnanec úspěšně archivován',
        error: 'Chyba při archivaci zaměstnance'
      },
      delete: {
        title: 'Smazat zaměstnance',
        description: 'Opravdu chcete smazat tohoto zaměstnance? Zaměstnanec bude smazán ze všech minulých směn a dovolených. Tato akce je nevratná. Zvažte archivaci zaměstnance.',
        success: 'Zaměstnanec úspěšně smazán',
        error: 'Chyba při mazání zaměstnance'
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
        fillRoleDetails: 'Vyplňte detaily úlohy'
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
        fillVacationDetails: 'Vyplňte detaily dovolené'
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
        fillTimeslotDetails: 'Vyplňte detaily směny'
      }
    },
    print: {
      label: '@:general.print'
    },
    shift: {
      label: 'Směna',
      addTimeslot: 'Přidat směnu',
      timeslotsLabel: 'Směny',
      timelineLabel: 'Časová osa'
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
          fillTeamDetails: 'Vyplňte detaily týmu'
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
      label: 'Zapomenuté heslo',
      goBackTo: 'Zpět na'
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
    },
    auth: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'Zadejte svůj e-mail',
      passwordLabel: 'Heslo',
      passwordPlaceholder: 'Zadejte své heslo',
      submitButton: '@:general.continue',
      nameLabel: '@:general.nameLabel',
      namePlaceholder: 'Zadejte své jméno',
      validation: {
        emailRequired: 'E-mail je povinný',
        emailInvalid: 'E-mail je neplatný',
        passwordRequired: 'Heslo je povinné',
        passwordMin: 'Heslo musí být alespoň 6 znaků dlouhé',
        nameRequired: 'Jméno je povinné'
      }
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
    createAccount: '@:general.createAccount',
    archive: 'Archivovat',
    delete: 'Smazat',
    cancel: 'Zrušit'
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
    waitingForLogin: 'Čeká se na přihlášení...',
    passwordResetError: 'Chyba při resetování hesla'
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
