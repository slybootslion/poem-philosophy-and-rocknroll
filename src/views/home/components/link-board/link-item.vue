<template>
  <div class="link-item">
    <img class="icon-favicon"
         :src="`https://icons.duckduckgo.com/ip2/${detail.icoUrl}.ico`">
    <span class="link-item-title">{{ detail.shortTitle }}</span>
  </div>
</template>

<script>
export default {
  name: 'linkBoardItem',
  props: {
    detail: {
      type: Object,
    },
  },
  setup () {
    return {}
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.link-item {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 10px 25px 40px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, .15);
  backdrop-filter: blur(3px);
  cursor: pointer;
  transition: background-color 0.35s;

  .link-item-title {
    bottom: -25px;
    color: white;
    font-size: 12px;
    left: 5%;
    overflow: hidden;
    position: absolute;
    text-align: center;
    text-overflow: ellipsis;
    transition: .25s;
    white-space: nowrap;
    width: 90%;
  }
}
</style>
