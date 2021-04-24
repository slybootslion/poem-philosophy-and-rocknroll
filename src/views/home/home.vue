<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <clock-comp :init-time="initTime" />
    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'
import BackgroundImage from '@/views/home/components/background-image'
import ClockComp from '@/views/home/components/clock-comp'
import { clock } from '@/views/home/hooks/computed-time'
import ThemeApi from '@/api/module/theme-api'
// import { useStore } from 'vuex'

const themeApi = new ThemeApi()

export default {
  name: 'home',
  components: {
    ClockComp,
    BackgroundImage,
    HomeFooter,
  },
  async setup () {
    // const store = useStore()
    const initTime = clock()
    const res = await themeApi.getTheme()
    console.log(res)
    return { initTime }
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
