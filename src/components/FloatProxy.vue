<script setup lang="ts">
import { metadata } from '~/composables/floating'

const props = defineProps<{}>()
const attrs = useAttrs()
metadata.props = props
metadata.attrs = attrs
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  Proxy
</template>
