<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <clock-comp :init-time="initTime" />
      <home-setting />
      <search-board />
    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'
import ClockComp from '@/views/home/components/clock-comp'
import BackgroundImage from '@/views/home/components/background-image'
import { clock, HomeEventBus, hotKeyJs } from '@/views/home/hooks'
import HomeSetting from '@/views/home/components/home-setting/index'
import SearchBoard from '@/views/home/components/search-board'

export default {
  name: 'home',
  components: {
    SearchBoard,
    HomeSetting,
    BackgroundImage,
    ClockComp,
    HomeFooter,
  },
  setup () {
    const initTime = clock()

    const initHotkey = () => {
      hotKeyJs('alt+s', () => {
        HomeEventBus.emit('showSearchBoard')
      })
    }
    initHotkey()

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
