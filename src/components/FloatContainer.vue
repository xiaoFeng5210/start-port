<script setup lang="ts">
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
const style = computed(() => {
  const { top, left, width, height } = rect.value
  return {
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
