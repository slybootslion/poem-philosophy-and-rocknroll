<template>
  <div class="theme-content">
    <div class="album" v-for="album in themeList" :key="album.id">
      <div v-if="album.themeList">
        <div class="album-title">{{ album.name }}</div>
        <div class="album-content">
          <div class="album-item"
               v-for="theme in album.themeList"
               @click="checked(theme.id, album.id)"
               :key="theme.id">
            <span class="iconfont"
                  :class="theme.selected ? 'icon-likefill' : 'icon-like'"></span>
            <img class="theme-img" :src="theme.url" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThemeApi from '@/api/module/theme-api'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { baseOssURL } from '@/config/setting'
import { showMessage } from '@/utils'
import { HomeEventBus, urlFormat } from '@/views/home/hooks'

const themeApi = new ThemeApi()

export default {
  name: 'home-setting-theme-setting',
  setup () {
    const themeList = ref({})
    const store = useStore()

    const formatData = data => {
      const { albumList, list } = data

      const albumMap = {}
      albumList.forEach(album => albumMap[album.id] = album)

      list.forEach(theme => {
        theme.url = baseOssURL + theme.ossName
        const item = albumMap[theme.albumId]
        if (!item.themeList) {
          item.themeList = []
          item.themeList.push(theme)
        } else {
          item.themeList.push(theme)
        }
      })
      return albumMap
    }

    async function getList () {
      const res = await themeApi.getSettingTheme()
      themeList.value = formatData(res)
    }

    async function checked (themeId, albumId) {
      const list = store.state.theme.themeShowList
      const album = themeList.value[albumId]
      const currentTheme = album.themeList.find(theme => theme.id === themeId)
      const state = !currentTheme.selected
      if (list.length <= 1 && !state) {
        showMessage('至少保留一条壁纸', 'warning')
        return
      }
      const res = await themeApi.patchUserSettingTheme({ id: themeId, state })
      await urlFormat(res, store)
      currentTheme.selected = state
      HomeEventBus.emit('RefreshTheme', { state, themeId })
    }

    getList()

    return {
      themeList,
      checked,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../var';

.theme-content {
  padding: 10px;
  box-sizing: border-box;
}

.album {
  .album-title {
    padding: 5px 0;
    box-sizing: border-box;
    font-size: 28px;
    font-weight: 700;
    border-bottom: 4px solid $color-border-3;
    margin-bottom: 5px;
  }

  .album-content {
    display: flex;
    flex-wrap: wrap;

    .album-item {
      width: 180px;
      height: 120px;
      margin: 0 10px 10px 0;
      overflow: hidden;
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }

      .iconfont {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        left: 10px;
        color: $color-primary;
      }
    }
  }
}
</style>
