<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <clock-comp :init-time="initTime" />
      <home-setting />
      <div class="search-icon-box">
        <span class="iconfont icon-newshot" @click="onLink"></span>
        <span class="iconfont icon-search" @click="onSearch"></span>
      </div>
      <search-board />
      <link-board />
    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'
import ClockComp from '@/views/home/components/clock-comp'
import BackgroundImage from '@/views/home/components/background-image'
import { clock, HomeEventBus, hotKeyJs } from '@/views/hooks'
import HomeSetting from '@/views/home/components/home-setting/index'
import SearchBoard from '@/views/home/components/search-board'
import LinkBoard from '@/views/home/components/link-board'

export default {
  name: 'home',
  components: {
    LinkBoard,
    SearchBoard,
    HomeSetting,
    BackgroundImage,
    ClockComp,
    HomeFooter,
  },
  setup () {
    const initTime = clock()

    const onSearch = () => HomeEventBus.emit('toggleSearchBoard', true)

    const onLink = () => HomeEventBus.emit('toggleLinkBoard')

    const initHotkey = () => {
      hotKeyJs('alt+q', onSearch)
      hotKeyJs('alt+l', onLink)
    }
    initHotkey()

    return {
      initTime,
      onSearch,
      onLink,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../hooks/var";

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

    .search-icon-box {
      position: absolute;
      top: p2r(20);
      left: p2r(20);

      .iconfont {
        font-size: p2r(28);
        color: $color-info;
        padding: 0 5px;
        cursor: pointer;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
