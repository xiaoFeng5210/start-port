<script setup lang="ts">
import type { StyleValue } from 'vue'
import { metadata, proxyEl } from '~/composables/floating'

const rect = ref<DOMRect | undefined>({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  bottom: 0,
  right: 0,
} as DOMRect)
watch(proxyEl, (el) => {
  rect.value = el?.getBoundingClientRect() ?? rect.value
}, { immediate: true })
const style = computed((): StyleValue => {
  return {
    transition: 'all .5s ease-in-out',
    position: 'fixed',
    top: `${rect.value?.top ?? 0}px`,
    left: `${rect.value?.left ?? 0}px`,
    // width: `${width}px`,
    // height: `${height}px`,
  }
})
function update() {
  rect.value = proxyEl.value?.getBoundingClientRect()
}

useMutationObserver(proxyEl, update, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
})

useEventListener('resize', update)
watchEffect(update)
</script>

<template>
  <div :style="style">
    <slot v-bind="metadata.attrs" />
  </div>
</template>
