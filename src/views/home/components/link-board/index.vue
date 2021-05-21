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
import { ref } from 'vue'
import { HomeEventBus } from '@/views/home/hooks'

export default {
  name: 'linkBoard',
  setup () {
    console.log('in link board')

    const isShow = ref(false)
    const toggleShow = () => isShow.value = !isShow.value
    HomeEventBus.on('toggleLinkBoard', toggleShow)

    return {
      isShow,
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
    background-color: rgba(0, 0, 0, .1);
    backdrop-filter: blur(3px);
    border-radius: p2r(10);
  }
}
</style>
