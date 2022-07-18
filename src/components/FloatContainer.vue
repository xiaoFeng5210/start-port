<script setup lang="ts">
import { metadata } from '~/composables/floating'
</script>

<template>
  <div fixed>
    <slot v-bind="metadata.attrs" />
  </div>
</template>
