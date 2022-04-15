<script setup>
import { useHomeState, useThemeNight } from "../../../store/home-theme";
import { computed, onBeforeUnmount, reactive } from "vue";
import { clock, isNightClock } from "../libs/clock-hook";
import { TimerSimulateInterval } from "../../../utils/tools";

const {
  changeBgTimeIndex, changeNight,
  nightAutoState,
  nightThemeState, bgTimeIndex
} = useThemeNight()
const { isTimeState, changeTimeState } = useHomeState()

const isNight = computed(() => nightThemeState())
const clockData = reactive({
  time: '',
  day: '',
  date: '',
})

const computedClock = () => {
  const { day, date, time } = clock()
  if (nightAutoState()) {
    isNightClock() ? !nightThemeState() && changeNight(true) : nightThemeState() && changeNight(false)
  }
  clockData.day = day
  clockData.time = time
  clockData.date = date
}
computedClock()

const clockTimer = new TimerSimulateInterval()
clockTimer.simulateInterval({
  countLimit: Infinity,
  callback: computedClock,
  interval: 1000,
})
onBeforeUnmount(() => clockTimer.simulateClearInterval())
</script>

<template>
  <div class="clock centerXY"
       v-show="isTimeState()"
       :class="isNight ? 'night' : ''">
    <div class="time-box">
      {{ clockData.time }}
    </div>
    <div class="date-box">
      {{ clockData.date }} {{ clockData.day }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/style/index';

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

    &:hover {
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

      &:hover {
        opacity: 1;
      }
    }
  }

  .date-box {
    font-size: p2r(28);
    position: relative;
  }
}
</style>
