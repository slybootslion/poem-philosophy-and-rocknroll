<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(${url})`}" />
  <div class="cover" />
</template>

<script>
import { onMounted, ref } from 'vue'
import ThemeApi from '@/api/module/theme-api'
import { baseOssURL } from '@/config/setting'
import { useStore } from 'vuex'
import { randomInt, simulateInterval } from '@/utils'

const themeApi = new ThemeApi()
export default {
  name: 'backgroundImage',
  setup () {
    const url = ref('https://static.uniformfox.com/static/pic/ppr/bg/1.jpg')
    const store = useStore()

    const loadPic = src => {
      const image = new Image()
      image.src = src
      image.onload = function () {
        store.dispatch('sys/setIsLoadingActions', false)
      }
    }

    const selectImg = list => {
      const index = randomInt(0, list.length - 1)
      return {
        item: list[index],
        index,
      }
    }

    const picHandle = list => {
      const {
        index: currentIndex,
        item: currentImage,
      } = selectImg(list)
      const status = store.getters.isPageLoading
      if (status) loadPic(currentImage.url)

      url.value = list[currentIndex].url

      simulateInterval(() => {
        function selectIndex () {
          const index = selectImg(list).index
          if (index === currentIndex) {
            return selectIndex()
          }
          return index
        }
        const index = selectIndex()
        url.value = list[index].url
      }, 1000 * 60 * 60 * 3)
    }

    onMounted(async () => {
      let list = await themeApi.getTheme()
      list = list.map(item => {
        item.url = baseOssURL + item.ossName
        return item
      })
      picHandle(list)
    })

    return {
      url,
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
</style>
