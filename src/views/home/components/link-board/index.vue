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
          <div v-for="item in card"
               :key="item.id">
            <link-board-item :detail="item" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { HomeEventBus } from '@/views/home/hooks'
import LinkApi from '@/api/module/link-api'
import LinkBoardItem from '@/views/home/components/link-board/link-item'

const linkApi = new LinkApi()

export default {
  name: 'linkBoard',
  components: { LinkBoardItem },
  setup () {
    const isShow = ref(false)
    const toggleShow = () => isShow.value = !isShow.value
    const limit = 2
    const list = ref([])
    const carousel = ref(null)
    HomeEventBus.on('toggleLinkBoard', toggleShow)

    const getLink = async () => {
      const result = await linkApi.getLinkList()
      const res = result.map(item => {
        // const reg = /http(s)?:\/\/(([\w-]+\.)+\w+(:\d{1,5})?)/
        // const r = reg.match(item)
        // console.log(r)
        item.icoUrl = item.link.split('')[1]
        return item
      })
      console.log(res)
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
    }

    onMounted(async () => {
      await getLink()
      carousel.value.setActiveItem(0)
    })

    return {
      isShow,
      list,
      carousel,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../var";
.link-container {
  .link-box {
    width: 50%;
    height: 80%;

    .el-carousel {
      height: 100%;

      :deep(.el-carousel__container) {
        .el-carousel__item {
          padding: p2r(20);
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
