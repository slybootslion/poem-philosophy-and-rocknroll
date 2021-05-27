<template>
  <div class="link-item" @click="go">
    <div class="icon-favicon" ref="iconEl">
      <img class="icon-img"
           :src="`https://icons.duckduckgo.com/ip2/${detail.icoUrl}.ico`">
    </div>
    <span class="link-item-title">
      {{ detail.shortTitle || detail.title }}
    </span>
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
  setup (props) {
    const go = () => {
      window.open(props.detail.link)
    }

    return {
      go,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.link-item {
  height: 170px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &:hover {

    .icon-favicon {
      background-color: rgba(180, 180, 180, .3);
      backdrop-filter: blur(9px);
    }
  }

  .icon-favicon {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin: 0 24px 10px;
    background-color: rgba(180, 180, 180, .15);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .35s;

    .icon-img {
      width: 30px;
      height: 30px;
    }
  }

  .link-item-title {
    width: 80px;
    bottom: -25px;
    color: white;
    font-size: 12px;
    left: 5%;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transition: .25s;
    white-space: nowrap;
  }
}
</style>
