import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  components: [
    { path: '~timeslot/components', prefix: 'Timeslot' }
  ],
  alias: { '~timeslot': resolve('./') }
})
