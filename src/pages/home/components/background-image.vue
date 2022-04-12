<script setup>
import { ref } from "vue";
import { usePageLoading, useThemeNight } from '../../../store/home-theme'

const url = ref('https://slybootslion.oss-cn-chengdu.aliyuncs.com/ppr/meitu/2021-04-25/80c43c8702f6d387113d74e0ea7f93a8.jpg')

const { finishedLoading } = usePageLoading()
const { isNight } = useThemeNight()

const loadPic = src => {
  const image = new Image()
  image.src = src
  image.onload = () => finishedLoading()
}
loadPic(url.value)

const getThemeList = () => {
  const list = awiat
}

</script>

<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(${url})`}" />
  <div class="cover" />
  <div class="night-cover" v-if="isNight" />
</template>

<style scoped lang="scss">
.canvas {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 2s;
}

.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('https://static.uniformfox.com/static/pic/filter.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.night-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .85);
}
</style>
