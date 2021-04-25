<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <clock-comp :init-time="initTime" />
      <home-setting />
    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'
import ClockComp from '@/views/home/components/clock-comp'
import BackgroundImage from '@/views/home/components/background-image'
import { clock } from '@/views/home/hooks/computed-time'
import HomeSetting from '@/views/home/components/home-setting/index'

export default {
  name: 'home',
  components: {
    HomeSetting,
    BackgroundImage,
    ClockComp,
    HomeFooter,
  },
  setup () {
    const initTime = clock()
    return {
      initTime,
    }
  },
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
