<template>
  <div class="container">
    <div>Bar</div>
    <div>
            <button class="m-3 text-sm btn" @click="back">
        Home
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
function back() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
</style>
