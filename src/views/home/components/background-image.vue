<template>
  <canvas class="canvas"
          :style="{backgroundImage: `url(https://static.uniformfox.com/static/pic/ppr/bg/${num}.jpg)`}" />
  <div class="cover"></div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'backgroundImage',
  setup () {
    const num = ref(1)
    const backImg = `url(https://static.uniformfox.com/static/pic/ppr/bg/${1}.jpg)`

    setTimeout(() => {
      num.value = 2
    }, 3000)

    return {
      backImg,
      num,
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
