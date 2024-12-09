<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.settings.label')
})

const isDeleteAccountModalOpen = ref(false)

const user = useSupabaseUser()

const state = reactive({
  name: user.value?.user_metadata?.name,
  email: user.value?.email
})
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Theme"
      description="Customize the look and feel of your dashboard."
    >
      <template #links>
        <UColorModeSelect color="gray" />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :state="state"
      :validate-on="['submit']"
    >
      <UDashboardSection title="Profile">
        <UFormGroup
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="grid items-center grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="off"
            icon="i-heroicons-envelope"
            size="md"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />

    <!-- <UDashboardSection -->
    <!--   title="Delete account" -->
    <!--   description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently." -->
    <!-- > -->
    <!--   <template #links> -->
    <!--     <UButton -->
    <!--       color="red" -->
    <!--       :label="$t('buttons.deleteAccount')" -->
    <!--       size="md" -->
    <!--       @click="isDeleteAccountModalOpen = true" -->
    <!--     /> -->
    <!--   </template> -->
    <!-- </UDashboardSection> -->

    <SettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />
  </UDashboardPanelContent>
</template>
