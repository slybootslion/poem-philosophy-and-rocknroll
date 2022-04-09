<script setup>
import { ref } from "vue";

const visible = ref(false)
</script>

<template>
  <Teleport to="#loading">
    <div class="container">
      <div class="lu-home-main" v-if="visible">
        <img
            class="lu-home-logo"
            src="@/assets/images/logo-300x179.png"
            alt="loading" />
        <span class="text">loading...</span>
      </div>
      <div class="lu-home-footer">
        <a href="https://www.sketchmac.com" target="_blank">
          诗歌、哲学与摇滚乐
        </a>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '../../assets/style/index';

</style>
