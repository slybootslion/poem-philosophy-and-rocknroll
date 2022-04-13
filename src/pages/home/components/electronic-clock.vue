<script setup>
console.log('Electronic clock')
</script>

<template>
  <div class="clock centerXY" :class="false ? 'night' : ''">
    <div class="time-box">
      time
    </div>
    <div class="date-box">
      date
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
