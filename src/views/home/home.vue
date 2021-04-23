<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <clock-comp :time="time" :date="date" :day="day" />
    </div>
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/home-footer'
import BackgroundImage from '@/views/home/components/background-image'
import ClockComp from '@/views/home/components/clock-comp'
import { clock } from '@/views/home/hooks/computed-time'

export default {
  name: 'home',
  components: {
    ClockComp,
    BackgroundImage,
    HomeFooter,
  },
  setup () {
    const {
      time,
      date,
      day,
    } = clock()

    console.log(time, date, day)

    return { time, date, day }
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
