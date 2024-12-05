import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  components: [
    { path: '~team/components', prefix: 'Team' }
  ],
  alias: { '~team': resolve('./') }
})
