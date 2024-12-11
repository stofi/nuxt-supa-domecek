export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',
    button: {
      rounded: 'rounded-full',
      default: {
        size: 'md'
      }
    },
    input: {
      default: {
        size: 'md'
      }
    },
    card: {
      rounded: 'rounded-xl',
      background: 'bg-gray-50 dark:bg-gray-950'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    },

    variables: {
      light: {
        background: '255 255 255',
        foreground: 'var(--color-gray-800)'
      },
      dark: {
        background: 'var(--color-gray-950)',
        foreground: 'var(--color-gray-200)'
      },
      header: {
        height: '4rem'
      }
    }
  }
})
