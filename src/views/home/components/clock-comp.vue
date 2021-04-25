<template>
  <div class="clock centerXY"
       :class="store.getters.isNight ? 'night' : ''">
    <div class="time-box">
      {{ clockData.time || initTime.time }}
    </div>
    <div class="date-box">
      {{ clockData.date || initTime.date }} {{ clockData.day || initTime.day }}
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { simulateInterval } from '@/utils'
import { clock } from '@/views/home/hooks/computed-time'
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

    simulateInterval(computedClock, 1000)

    return {
      clockData,
      clock,
      store,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "var";

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
  }

  .date-box {
    font-size: p2r(36);
  }
}
</style>
