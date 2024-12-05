import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  components: [
    { path: '~employee/components', prefix: 'Employee' }
  ],
  alias: { '~employee': resolve('./') }
})
