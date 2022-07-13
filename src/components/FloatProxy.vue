<script setup lang="ts">
import { metadata } from '~/composables/floating'

const props = defineProps<{
  modelValue?: boolean
}>()
const attrs = useAttrs()
metadata.props = props
metadata.attrs = attrs
</script>

<template>
  Proxy
</template>
