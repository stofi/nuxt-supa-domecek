<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const user = useSupabaseUser()
const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const isLoggedIn = computed(() => !!user.value)

const links = [

]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Směnobot <UBadge
        :label="$t('app.header.newBadge')"
        variant="subtle"
        class="mb-0.5"
      />
    </template>
    <template #right>
      <!-- Show these buttons when the user is not logged in -->
      <template v-if="!isLoggedIn">
        <UButton
          :label="$t('app.header.signIn')"
          color="gray"
          to="/login"
        />
        <UButton
          :label="$t('app.header.signUp')"
          icon="i-heroicons-arrow-right-20-solid"
          trailing
          to="/signup"
          class="hidden lg:flex"
        />
      </template>

      <!-- Show these buttons when the user is logged in -->
      <template v-else>
        <UButton
          :label="$t('app.header.dashboard')"
          color="gray"
          to="/app"
        />
      </template>
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
