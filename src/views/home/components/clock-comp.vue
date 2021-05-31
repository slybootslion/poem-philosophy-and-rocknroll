<template>
  <div class="clock centerXY"
       :class="store.getters.isNight ? 'night' : ''">
    <div class="time-box">
      {{ clockData.time || initTime.time }}
      <span class="iconfont icon-time" @click="timeBoxClick"></span>
    </div>
    <div class="date-box">
      {{ clockData.date || initTime.date }} {{ clockData.day || initTime.day }}
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive } from 'vue'
import { TimerSimulateInterval } from '@/utils'
import { clock } from '@/views/hooks'
import { useStore } from 'vuex'

export default {
  name: 'clockComp',
  props: {
    initTime: {
      type: Object,
    },
  },
  setup () {
    const store = useStore()

    const clockData = reactive({
      time: '',
      day: '',
      date: '',
    })

    const computedClock = () => {
      const { day, date, time, hour } = clock()
      if (store.getters.isAutoNightModel) {
        hour >= 22 || hour < 6
          ? store.dispatch('sys/nightAction', true)
          : store.dispatch('sys/nightAction', false)
      }

      clockData.day = day
      clockData.time = time
      clockData.date = date
    }

    const timerSi = new TimerSimulateInterval()
    timerSi.simulateInterval(computedClock, 1000)
    onUnmounted(() => { timerSi.simulateClearInterval() })
    // simulateInterval(computedClock, 1000)

    const timeBoxClick = () => {
      console.log('in timeBoxClick')
      Notification.requestPermission(function (status) {
        console.log(status) // 仅当值为 "granted" 时显示通知
        var n = new Notification('title', { body: 'notification body' }) // 显示通知
        n.onshow = function () {
          console.log('in in in')
        }
      })
    }

    return {
      clockData,
      clock,
      store,
      timeBoxClick,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../hooks/var";

.clock {
  height: 35%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;

  &.night {
    opacity: .2;
  }

  .time-box {
    font-size: p2r(140);
    position: relative;
    padding: 0 p2r(30);

    &:hover{
      .icon-time {
        opacity: .5;
      }
    }

    .icon-time {
      position: absolute;
      font-size: p2r(28);
      opacity: .0;
      cursor: pointer;
      top: p2r(10);
      right: p2r(10);

      &:hover{
        opacity: 1;
      }
    }
  }

  .date-box {
    font-size: p2r(36);
    position: relative;
  }
}
</style>
