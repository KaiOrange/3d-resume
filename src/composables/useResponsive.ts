import { ref, onMounted, onUnmounted, computed } from 'vue'

const MOBILE_BREAKPOINT = 768

export function useResponsive() {
  const windowWidth = ref(window.innerWidth)

  function onResize() {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))

  const isMobile = computed(() => windowWidth.value < MOBILE_BREAKPOINT)
  const isDesktop = computed(() => !isMobile.value)

  const starCount = computed(() => isMobile.value ? 30000 : 100000)
  const pixelRatio = computed(() =>
    Math.min(isMobile.value ? 1 : window.devicePixelRatio, 2)
  )

  return { isMobile, isDesktop, starCount, pixelRatio, windowWidth }
}
