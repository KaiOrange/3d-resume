import { ref } from 'vue'

export type InteractableType = 'planet' | 'asteroid' | 'star' | null

export interface InteractableData {
  type: InteractableType
  index: number
  data: unknown
}

export function useInteraction() {
  const selected = ref<InteractableData | null>(null)
  const hovered = ref<InteractableData | null>(null)

  function select(item: InteractableData) {
    selected.value = item
  }

  function clearSelection() {
    selected.value = null
  }

  function setHovered(item: InteractableData | null) {
    hovered.value = item
  }

  return { selected, hovered, select, clearSelection, setHovered }
}
