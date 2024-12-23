<script setup lang="ts">
import type { ButtonColor } from '#ui/types'
import { pageDefinitions } from '~base/pageDefinitions'

const { isHelpSlideoverOpen } = useDashboard()
const { metaSymbol } = useShortcuts()

const shortcuts = ref(true)
const query = ref('')
const { t } = useI18n()

const links = computed(() => [
  {
    label: t('app.helpSlideover.titleShortcuts'),
    icon: 'i-heroicons-key',
    trailingIcon: 'i-heroicons-arrow-right-20-solid',
    color: 'gray' as ButtonColor,
    onClick: () => {
      shortcuts.value = true
    }
  }
  //   {
  //   label: 'Documentation',
  //   icon: 'i-heroicons-book-open',
  //   to: '/docs',
  //   target: '_blank'
  // }
])

const categories = computed(() => [
  {
    title: t('app.helpSlideover.categoryNavigation'),
    items: pageDefinitions.map(page => ({
      shortcuts: page.shortcuts,
      name: t(page.label)
    }))
  },
  {
    title: t('app.helpSlideover.categoryGeneral'),
    items: [
      { shortcuts: [metaSymbol.value, 'K'], name: t('app.helpSlideover.commandMenu') },
      { shortcuts: ['N'], name: t('app.helpSlideover.notifications') },
      { shortcuts: ['?'], name: t('app.helpSlideover.titleShortcuts') },
      { shortcuts: ['/'], name: t('app.helpSlideover.search') }
    ]
  }
])

const filteredCategories = computed(() => {
  return categories.value
    .map(category => ({
      title: category.title,
      items: category.items.filter((item) => {
        return item.name.search(new RegExp(query.value, 'i')) !== -1
      })
    }))
    .filter(category => !!category.items.length)
})
</script>

<template>
  <UDashboardSlideover v-model="isHelpSlideoverOpen">
    <template #title>
      <!-- <UButton
        v-if="shortcuts"
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-arrow-left-20-solid"
        @click="shortcuts = false"
      /> -->
      {{ shortcuts ? $t('app.helpSlideover.titleShortcuts') : $t('app.helpSlideover.titleHelpSupport') }}
    </template>

    <div
      v-if="shortcuts"
      class="space-y-6"
    >
      <UInput
        v-model="query"
        icon="i-heroicons-magnifying-glass"
        :placeholder="$t('app.helpSlideover.searchPlaceholder')"
        autofocus
        color="gray"
      />

      <div
        v-for="(category, index) in filteredCategories"
        :key="index"
      >
        <p class="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          {{ category.title }}
        </p>

        <div class="space-y-2">
          <div
            v-for="(item, i) in category.items"
            :key="i"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-500 dark:text-gray-400">{{
              item.name
            }}</span>

            <div class="flex items-center justify-end flex-shrink-0 gap-0.5">
              <UKbd
                v-for="(shortcut, j) in item.shortcuts"
                :key="j"
              >
                {{ shortcut }}
              </UKbd>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col gap-y-3"
    >
      <UButton
        v-for="(link, index) in links"
        :key="index"
        v-bind="link"
      />
    </div>
  </UDashboardSlideover>
</template>
