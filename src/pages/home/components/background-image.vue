<script setup>
import { ref } from "vue";
import { usePageLoading, useThemeNight } from '../../../store/home-theme'
import { httpThemeList } from "../libs/httpTheme";
import { randomInt, TimerSimulateInterval } from "../../../utils/tools";

const url = ref('https://slybootslion.oss-cn-chengdu.aliyuncs.com/ppr/meitu/2021-04-25/80c43c8702f6d387113d74e0ea7f93a8.jpg')

const { finishedLoading, loadingState } = usePageLoading()
const { isNight, changeBgTimeIndex, bgTimeIndex } = useThemeNight()

const dict = {
  1: 60 * 60 * 0.5 * 1000,
  2: 60 * 60 * 1000,
  3: 60 * 60 * 3 * 1000,
  4: 60 * 60 * 6 * 1000,
  5: 60 * 60 * 12 * 1000,
  6: 0,
}
let changeBgTime = dict[bgTimeIndex]

const loadPic = src => {
  const image = new Image()
  image.src = src
  image.onload = () => finishedLoading()
}
loadPic(url.value)

const list = ref([])

const getThemeList = async () => {
  list.value = (await httpThemeList()).theme
  if (!list.value.length) return
  if (list.value.length === 1) {
    url.value = list.value[0].oss_name
    return
  }
  if (list.value.length > 1) pickHandle()
}
getThemeList()

const themeTimer = new TimerSimulateInterval()

const selectImage = () => {
  const index = randomInt(0, list.value.length - 1)
  return {
    image: list.value[index].oss_name,
    index
  }
}

const pickHandle = id => {
  let {
    index: currentIndex,
    image: currentImage,
  } = selectImage()
  if (loadingState()) loadPic(currentImage.oss_name)
  url.value = currentImage

  const changeImg = () => {
    themeTimer.simulateClearInterval()
    if (changeBgTime === 0) return
    const index = currentIndex = selectIndex()
    if (index != null) url.value = list.value[index].oss_name
    themeTimer.simulateInterval({
      callback: changeImg,
      interval: changeBgTime
    })
  }
  changeImg()

  function selectIndex () {
    const index = selectImage().index
    if (index === currentIndex) return selectIndex()
    if (id) {
      url.value = (list.value.find(theme => theme.id === id)).oss_name
      id = null
    }
    return index
  }
}
</script>

<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(${url})`}" />
  <div class="cover" />
  <div class="night-cover" v-if="isNight" />
  <!--  setting icon and setting board-->
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
