<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const isLoggedIn = computed(() => !!user.value)
const logout = async () => {
  const { error } = await supabaseClient.auth.signOut()
  if (error) {
    console.error('Error logging out:', error)
  } else {
    // Redirect to home page or login page after successful logout
    navigateTo('/')
  }
}
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
          color="black"
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
        <UButton
          :label="$t('app.header.logout')"
          color="red"
          @click="logout"
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
