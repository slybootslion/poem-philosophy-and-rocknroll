<template>
  <div class="home-container">
    <div class="container">
    <background-image />
    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'
import BackgroundImage from '@/views/home/components/background-image'

export default {
  name: 'home',
  components: { BackgroundImage, HomeFooter },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
  }
}
</style>
