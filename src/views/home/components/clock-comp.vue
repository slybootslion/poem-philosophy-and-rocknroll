<template>
  <div class="clock centerXY">
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

export default {
  name: 'clockComp',
  props: {
    initTime: {
      type: Object,
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
  height: 35%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select:none;

  .time-box {
    font-size: p2r(140);
  }

  .date-box {
    font-size: p2r(36);
  }
}
</style>
