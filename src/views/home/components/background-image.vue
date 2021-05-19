<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(${url})`}" />
  <div class="cover" />
  <div class="night-cover" v-if="store.getters.isNight"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import ThemeApi from '@/api/module/theme-api'
import { useStore } from 'vuex'
import { randomInt } from '@/utils'
import { HomeEventBus, urlFormat } from '@/views/home/hooks'

const themeApi = new ThemeApi()

export default {
  name: 'backgroundImage',
  setup () {
    const url = ref('https://static.uniformfox.com/static/pic/ppr/bg/1.jpg')
    const store = useStore()
    const changeBgTime = 60 * 60 * 3 * 1000
    // const changeBgTime = 5 * 1000
    let timer = null

    const loadPic = src => {
      const image = new Image()
      image.src = src
      image.onload = function () {
        store.dispatch('sys/setIsLoadingAction', false)
      }
    }

    const selectImg = list => {
      const index = randomInt(0, list.length - 1)
      return {
        item: list[index],
        index,
      }
    }

    const picHandle = id => {
      const list = store.state.theme.themeShowList
      if (!list.length) {
        loadPic(url.value)
        return
      }
      let {
        index: currentIndex,
        item: currentImage,
      } = selectImg(list)
      const status = store.getters.isPageLoading
      if (status) loadPic(currentImage.url)

      url.value = list[currentIndex].url

      const changeImg = list => {
        const index = currentIndex = selectIndex()
        if (index != null) url.value = list[index].url
      }

      function selectIndex () {
        const list = store.state.theme.themeShowList
        if (list.length === 1) return
        const index = selectImg(list).index
        if (index === currentIndex) return selectIndex()
        if (id) {
          url.value = list.find(theme => theme.id === id).url
          id = null
        }
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        timer = setTimeout(() => changeImg(list), changeBgTime)
        return index
      }

      selectIndex()
    }

    const getNetList = async () => {
      const list = await themeApi.getTheme()
      await urlFormat(list, store)
    }

    async function refreshTheme (eventData) {
      let id = null
      if (!eventData) {
        await getNetList()
      } else {
        eventData.state && (id = eventData.themeId)
      }
      picHandle(id)
    }

    onMounted(async () => {
      await refreshTheme()
    })

    onUnmounted(() => {
      HomeEventBus.off('RefreshTheme', refreshTheme)
    })

    HomeEventBus.on('RefreshTheme', refreshTheme)

    return {
      url,
      store,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
