<script setup lang="ts">
import TheImage from '~/components/TheImage.vue'
const router = useRouter()
const go = () => {
  router.push('/foo')
}
</script>

<template>
  <div>
    <div>Index</div>
    <div>
      <button class="m-3 text-sm btn" @click="go">
        Go
      </button>
    </div>
    <TheImage w-50 h-50 rounded-xl m10 />
  </div>
</template>
