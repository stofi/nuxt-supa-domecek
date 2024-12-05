import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  components: [
    { path: '~vacation/components', prefix: 'Vacation' }
  ],
  alias: { '~vacation': resolve('./') }
})
