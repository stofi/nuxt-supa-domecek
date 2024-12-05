<script setup lang="ts">
import type { FooterLink } from '#ui-pro/types'

const links: { label: string, children: FooterLink[] }[] = []

const toast = useToast()

const email = ref('')
const loading = ref(false)
const { t } = useI18n()

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: t('app.footer.subscribed'),
      description: t('app.footer.subscribedMessage')
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup
              :label="$t('app.footer.subscribeToNewsletter')"
              :ui="{ container: 'mt-3' }"
            >
              <UInput
                v-model="email"
                type="email"
                :placeholder="$t('app.footer.enterYourEmail')"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="loading ? $t('app.footer.subscribing') : $t('app.footer.subscribe')"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <!-- Copyright © {{ new Date().getFullYear() }}. All rights reserved. -->
         {{$t('app.footer.copyright', { year: new Date().getFullYear() })}}
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>
