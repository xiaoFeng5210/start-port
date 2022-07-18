<script setup lang="ts">
import { metadata, proxyEl } from '~/composables/floating'

const props = defineProps<{}>()
const attrs = useAttrs()
metadata.props = props
metadata.attrs = attrs
const el = ref<HTMLElement>()

onMounted(() => {
  proxyEl.value = el.value
})
</script>

<template>
  <div ref="el" bg-gray-400:10>
    <slot />
  </div>
</template>
