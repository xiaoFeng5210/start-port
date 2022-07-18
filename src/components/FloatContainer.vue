<script setup lang="ts">
import { metadata } from '~/composables/floating'
</script>

<template>
  {{ metadata.attrs }}
  <slot v-bind="metadata.attrs" />
</template>
