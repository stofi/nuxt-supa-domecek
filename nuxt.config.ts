// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxtjs/supabase',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/test-utils/module'
  ],

  devtools: { enabled: true },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
    '/api/search.json': { prerender: false },
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    '/app': { ssr: true },
    '/app/**': { ssr: true }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  typescript: {
    strict: false
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c =>
        ['UButton'].includes(c.pascalName)
      )

      globals.forEach(c => (c.global = true))
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // site: {
  //   url: 'https://beta.freshfiles.app',
  //   name: 'FreshFiles',
  //   description: 'FreshFiles',
  //   defaultLocale: 'en'
  // },

  supabase: {
    // redirect: false,
    cookieName: 'no-cookie-for-you',
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/app(/*)?'],
      exclude: ['/app/settings/change-password'],
      cookieRedirect: true
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce'
        // autoRefreshToken: isBrowser(),
        // detectSessionInUrl: isBrowser(),

        // persistSession: false,
        // autoRefreshToken: false,
        // detectSessionInUrl: false
      }
    }
  }
})
