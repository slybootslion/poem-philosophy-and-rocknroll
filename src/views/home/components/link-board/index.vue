<template>
  <div class="link-container"
       :class="isShow ? 'show' : ''">
    <div class="search-mask"
         @click="isShow = false" />
    <div class="link-box centerXY">
      <el-carousel height="100%"
                   :autoplay="false"
                   :initial-index="0"
                   arrow="never"
                   ref="carousel"
                   trigger="click">
        <el-carousel-item v-for="(card, index) in list"
                          :key="index">
          <link-board-item v-for="item in card"
                           :key="item.id"
                           :detail="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="iconfont icon-settings" v-if="getters.isLogin" @click="goSetting" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { formatIconUrl, HomeEventBus } from '@/views/hooks'
import LinkApi from '@/api/module/link-api'
import LinkBoardItem from '@/views/home/components/link-board/link-item'

const linkApi = new LinkApi()

export default {
  name: 'linkBoard',
  components: { LinkBoardItem },
  setup () {
    const isShow = ref(false)
    const toggleShow = () => isShow.value = !isShow.value
    const limit = 15
    const list = ref([])
    const carousel = ref(null)
    const router = useRouter()
    const store = useStore()

    HomeEventBus.on('toggleLinkBoard', toggleShow)

    const getLink = async () => {
      const result = await linkApi.getLinkList()
      const res = result.map(item => {
        return formatIconUrl(item)
      })

      let c = 0
      const arr = []
      for (let i = 0; i < res.length; i++) {
        if (c >= limit) {
          const temp = [...arr]
          list.value.push(temp)
          c = 0
          arr.length = 0
        }
        arr.push(res[i])
        c++
      }
      list.value.push(arr)
      store.dispatch('link/setLinkShowListAction', list.value)
    }

    const goSetting = () => {
      router.push({ name: 'LinkSetting' })
    }

    onMounted(async () => {
      await getLink()
      carousel.value.setActiveItem(0)
    })

    return {
      isShow,
      list,
      carousel,
      goSetting,
      getters: store.getters,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../hooks/var";

.link-container {
  .link-box {
    width: 682px;
    height: 613px;

    .el-carousel {
      height: 100%;

      :deep(.el-carousel__container) {

        .el-carousel__item {
          padding: p2r(20);
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: flex-start;
        }
      }
    }
  }

  .icon-settings {
    position: absolute;
    font-size: p2r(28);
    bottom: p2r(20);
    left: p2r(20);
    cursor: pointer;
    color: $color-info;

    &:hover {
      color: #fff;
    }
  }
}
</style>
