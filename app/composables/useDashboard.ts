import { createSharedComposable } from '@vueuse/core'
import { pageDefinitions } from '~/pageDefinitions'

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isHelpSlideoverOpen = ref(false)
  const isNotificationsSlideoverOpen = ref(false)

  const shortcuts = pageDefinitions.reduce((acc, page) => {
    if (page.shortcuts) {
      acc[page.shortcuts.join('-').toLowerCase()] = () => router.push(page.to)
    }
    if (page.children) {
      page.children.forEach((child) => {
        if (child.shortcuts) {
          acc[child.shortcuts.join('-').toLowerCase()] = () => router.push(child.to)
        }
      })
    }
    return acc
  }, {} as Record<string, () => void>)

  shortcuts['?'] = () => (isHelpSlideoverOpen.value = true)
  shortcuts['n'] = () => (isNotificationsSlideoverOpen.value = true)

  defineShortcuts(shortcuts)

  watch(
    () => route.fullPath,
    () => {
      isHelpSlideoverOpen.value = false
      isNotificationsSlideoverOpen.value = false
    }
  )

  return {
    isHelpSlideoverOpen,
    isNotificationsSlideoverOpen
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
