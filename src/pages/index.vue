<script setup lang="ts">
import { TheImageProxy } from '../composables/image'
const router = useRouter()
const go = () => {
  router.push('/foo')
}
const gobar = () => {
  router.push('/bar')
}
</script>

<template>
  <div>
    <div>Index</div>
    <div>
      <button class="m-3 text-sm btn" @click="go">
        Go
      </button>
      <button class="m-3 text-sm btn" @click="gobar">bar</button>
    </div>
    <div m10>
      <TheImageProxy w-50 h-50 rounded-xl />
    </div>
    <!-- <TheImage w-50 h-50 rounded-xl m10 /> -->
  </div>
</template>
