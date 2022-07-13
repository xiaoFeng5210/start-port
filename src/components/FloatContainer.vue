<script setup lang="ts">
import { metadata } from '~/composables/floating'
</script>

<template>
  {{ metadata }}
  <slot v-bind="{ ...metadata.attrs }" />
</template>
