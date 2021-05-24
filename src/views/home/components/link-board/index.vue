<template>
  <div class="link-container"
       :class="isShow ? 'show' : ''">
    <div class="search-mask"
         @click="isShow = false" />
    <div class="link-box centerXY">

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { HomeEventBus } from '@/views/home/hooks'
import LinkApi from '@/api/module/link-api'

const linkApi = new LinkApi()

export default {
  name: 'linkBoard',
  setup () {
    const isShow = ref(false)
    const toggleShow = () => isShow.value = !isShow.value
    HomeEventBus.on('toggleLinkBoard', toggleShow)

    let list = []

    onMounted(async () => {
      list = await linkApi.getLinkList()
      console.log(list)
    })

    return {
      isShow,
      list,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../var";
.link-container {
  .link-box {
    width: 80%;
    height: 80%;
  }
}
</style>
