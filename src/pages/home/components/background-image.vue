<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useHomeState, usePageLoading, useThemeNight } from '../../../store/home-theme'
import { httpThemeList } from "../libs/httpTheme";
import { emitter, randomInt, showMessage, TimerSimulateInterval } from "../../../utils/tools";
import { usePopupState } from '../libs/popup-state-hook'
import { useUserInfo } from "../../../store/user-info";

const url = ref('https://slybootslion.oss-cn-chengdu.aliyuncs.com/ppr/meitu/2021-04-25/80c43c8702f6d387113d74e0ea7f93a8.jpg')

const { finishedLoading, loadingState } = usePageLoading()
const {
  isNight, changeNight, nightThemeState,
  isNightAuto, changeNightAuto, nightAutoState,
  bgTimeIndexState, changeBgTimeIndex,
} = useThemeNight()
const { isTimeState } = useHomeState()
const { isShow, openPopup, closePopup } = usePopupState()

const dict = {
  1: 60 * 60 * 0.5 * 1000,
  2: 60 * 60 * 1000,
  3: 60 * 60 * 3 * 1000,
  4: 60 * 60 * 6 * 1000,
  5: 60 * 60 * 12 * 1000,
  6: 0,
}
let changeBgTime = dict[bgTimeIndexState()]

const loadPic = src => {
  const image = new Image()
  image.src = src
  image.onload = () => finishedLoading()
}
loadPic(url.value)

const { user } = useUserInfo()
const list = ref([])
const getThemeList = async () => {
  if (!user.isLogin) return
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

const currentImageId = ref(0)

watch(currentImageId, () => {
  list.value = list.value.map(image => {
    image.isActive = image.id === currentImageId.value
    return image
  })
})

const selectImage = () => {
  const index = randomInt(0, list.value.length - 1)
  const image = list.value[index]
  currentImageId.value = image.id
  return {
    image: image.oss_name,
    index,
  }
}

const pickHandle = id => {
  let currentIndex
  if (!id) {
    let {
      index,
      image: currentImage,
    } = selectImage()
    currentIndex = index
    if (loadingState()) loadPic(currentImage.oss_name)
    url.value = currentImage
  }

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
    let index = null
    if (id) {
      url.value = (list.value.find(theme => theme.id === id)).oss_name
      currentImageId.value = id
      id = null
    } else {
      index = selectImage().index
      if (index === currentIndex) return selectIndex()
    }
    return index
  }
}

const nightState = computed({
  get: () => nightThemeState(),
  set: val => changeNight(val)
})

const autoState = computed({
  get: () => nightAutoState(),
  set: val => changeNightAuto(val)
})

const changeTimeRadio = ref(bgTimeIndexState())
const timeRadioChange = val => {
  changeBgTimeIndex(val)
  changeBgTime = dict[bgTimeIndexState()]
}


const open = () => {
  if (!user.isLogin) {
    showMessage('未登录')
    return
  }
  openPopup()
}

const loadTheme = async () => {
  await getThemeList()
  pickHandle()
}
emitter.on('loadTheme', loadTheme)
onBeforeUnmount(() => emitter.off('loadTheme', loadTheme))
</script>

<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(${url})`}" />
  <div class="cover" />
  <div class="night-cover" v-if="nightThemeState()" />
  <var-icon name="image-outline"
            v-show="isTimeState()"
            class="theme-btn"
            size="28"
            @click="open" />
  <div class="popup-box">
    <var-popup v-model:show="isShow"
               position="bottom"
               @closed="() => closePopup(null)">
      <div class="popup-content scroll-style">
        <div class="theme-box">
          <img :src="image.oss_name"
               v-for="image in list"
               alt=""
               :key="image.id"
               :class="image.isActive ? 'active' : ''"
               @click="pickHandle(image.id)" />
        </div>
        <div class="switch-box">
          <div class="switch-item">
            <span class="label">夜间模式：</span>
            <var-switch v-model="nightState" />
          </div>
          <div class="switch-item">
            <span class="label">自动夜间模式：</span>
            <var-switch v-model="autoState" />
          </div>
          <div class="switch-item">
            <var-radio-group v-model="changeTimeRadio">
              <var-radio v-for="(val, key) in dict"
                         :key="key"
                         :checked-value="key"
                         @change="timeRadioChange"
                         checked-color="#fff"
                         unchecked-color="#ededed">
                {{ val / 1000 / 60 / 60 }}小时
              </var-radio>
            </var-radio-group>
          </div>
        </div>
      </div>
    </var-popup>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/style/index';

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
  background-image: url('https://static.slybootslion.com/static/pic/filter.png');
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

.theme-btn {
  position: absolute;
  bottom: p2r(20);
  left: p2r(20);
  color: $color-info;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}


.popup-box {
  :deep(.var-popup__content) {
    background-color: transparent;
    width: 80%;
    max-height: 60%;
    padding: p2r(20);
    box-shadow: p2r(10) p2r(10) p2r(20) rgba(0, 0, 0, .3);

    &::-webkit-scrollbar {
      width: p2r(4);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: p2r(10);
      -webkit-box-shadow: inset 0 0 p2r(5) rgba(0, 0, 0, .2);
      background: rgba(0, 0, 0, .2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 p2r(5) rgba(0, 0, 0, .2);
      border-radius: 0;
      background: rgba(0, 0, 0, .1);
    }

    .popup-content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      color: #fff;

      .theme-box {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        img {
          width: p2r(240);
          height: p2r(160);
          margin: 0 p2r(10) p2r(10) 0;
          cursor: pointer;

          &.active {
            border: 1px solid #fff;
          }
        }
      }
    }
  }
}
</style>
