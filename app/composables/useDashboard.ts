import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isHelpSlideoverOpen = ref(false)
  const isNotificationsSlideoverOpen = ref(false)

  defineShortcuts({
    'g-d': () => router.push('/app'),
    // 'g-a': () => router.push('/app/notes'),
    // 'g-c': () => router.push('/app/collections'),
    // 'g-t': () => router.push('/app/taxonomy'),
    // 'g-s': () => router.push('/app/settings'),
    '?': () => (isHelpSlideoverOpen.value = true),
    'n': () => (isNotificationsSlideoverOpen.value = true)
  })

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
