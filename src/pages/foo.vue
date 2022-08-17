<script lang="ts" setup>
let size = $ref(100)
function enlarge() {
  size += 20
}
</script>

<template>
  <div>Foo</div>
  <div>
    <router-link class="m-3 text-sm btn" to="/">Back</router-link>
    <button @click="enlarge">Enlarge</button>
  </div>
  <div m20>
    <p>
      Vue.js is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome backers. If you'd like to join them, please consider sponsor Vue's development
    </p>
    <FloatProxy :style="{ width: size + 'px', height: size + 'px' }" w-50 h-100 rounded="1/4" />
  </div>
  <!-- <TheImage w-50 h-100 rounded-xl m10 /> -->
</template>

<style lang="scss" scoped>
</style>
