import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  components: [
    { path: '~role/components', prefix: 'Role' }
  ],
  alias: { '~role': resolve('./') }
})
