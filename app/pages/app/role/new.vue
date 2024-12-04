<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  layout: 'app-layout'
})
useHead({
  title: t('page.role.new.label')
})

</script>

<template>
  <UDashboardNavbar :title="$t('page.role.new.label')">
    <template #right>

    </template>
  </UDashboardNavbar>
  <UDashboardPanelContent :title="$t('page.role.new.details')">
    <p class="mb-4 text-sm text-gray-500">
      {{ $t('page.role.new.fillRoleDetails') }}
    </p>
    <RoleForm @submit="navigateTo('/app/role')" />
  </UDashboardPanelContent>
</template>
