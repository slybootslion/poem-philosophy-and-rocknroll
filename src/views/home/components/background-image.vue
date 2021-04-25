<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(${url})`}" />
  <div class="cover" />
  <div class="night-cover" v-if="store.getters.isNight"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import ThemeApi from '@/api/module/theme-api'
import { baseOssURL } from '@/config/setting'
import { useStore } from 'vuex'
import { randomInt } from '@/utils'

const themeApi = new ThemeApi()
export default {
  name: 'backgroundImage',
  setup () {
    const url = ref('https://static.uniformfox.com/static/pic/ppr/bg/1.jpg')
    const store = useStore()
    const changeBgTime = 60 * 60 * 3 * 1000
    let list = []

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

    // eslint-disable-next-line no-unused-vars
    const picHandle = () => {
      let {
        index: currentIndex,
        item: currentImage,
      } = selectImg(list)
      const status = store.getters.isPageLoading
      if (status) loadPic(currentImage.url)

      url.value = list[currentIndex].url

      const changeImg = () => {
        const index = currentIndex = selectIndex()
        url.value = list[index].url
      }

      function selectIndex () {
        const index = selectImg(list).index
        if (index === currentIndex) return selectIndex()
        setTimeout(() => {
          console.log(new Date())
          changeImg()
        }, changeBgTime)
        return index
      }

      selectIndex()
    }

    onMounted(async () => {
      list = await themeApi.getTheme()
      list = list.map(item => {
        item.url = baseOssURL + item.ossName
        return item
      })
      picHandle()
      // store.dispatch('sys/setIsLoadingAction', false)
    })

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
