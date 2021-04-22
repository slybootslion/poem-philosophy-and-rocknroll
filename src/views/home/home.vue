<template>
  <div class="home-container">
    <div class="container">

    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'

export default {
  name: 'home',
  components: { HomeFooter },
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
