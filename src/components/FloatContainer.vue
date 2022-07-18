<script setup lang="ts">
import type { StyleValue } from 'vue'
import { metadata, proxyEl } from '~/composables/floating'

const rect = ref<DOMRect>({
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
  const { top, left, width, height } = rect.value
  return {
    transition: 'all .5s ease-in-out',
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
  }
})
</script>

<template>
  <div :style="style">
    <slot v-bind="metadata.attrs" />
  </div>
</template>
