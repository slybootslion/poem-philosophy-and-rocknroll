<template>
  <div class="clock centerXY">
    <div class="time-box">
      {{ clockData.time ? clockData.time : time }}
    </div>
    <div class="date-box">
      {{ clockData.date ? clockData.date : date }} {{ clockData.day ? clockData.day : day }}
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { simulateInterval } from '@/utils'
import { clock } from '@/views/home/hooks/computed-time'

export default {
  name: 'clockComp',
  props: {
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    day: {
      type: String,
    },
  },
  setup () {
    const clockData = reactive({
      time: '',
      day: '',
      date: '',
    })

    const computedClock = () => {
      const { day, date, time } = clock()
      clockData.day = day
      clockData.time = time
      clockData.date = date
    }

    simulateInterval(computedClock, 1000)

    return {
      clockData,
      clock,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "var";

.clock {
  width: 50%;
  height: 25%;
}
</style>
