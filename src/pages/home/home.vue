<script setup>
import HomeFooter from "./components/home-footer.vue";
import BackgroundImage from "./components/background-image.vue";
import UserBoard from "./components/user-board.vue";
import ElectronicClock from "./components/electronic-clock.vue";
</script>

<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <electronic-clock />
      <user-board />
    </div>
    <home-footer />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>
