<template>
  <Teleport to="#loading">
    <div class="container">
      <div class="lu-home-main" v-if="visible">
        <img
          class="lu-home-logo"
          src="@/assets/images/logo-300x179.png"
          alt="loading" />
        <span class="text">loading...</span>
      </div>
      <div class="lu-home-footer">
        <a href="https://www.sketchmac.com" target="_blank">
          诗歌、哲学与摇滚乐
        </a>
      </div>
    </div>
  </Teleport>
</template>

<script>

export default {
  name: 'loadingPageComp',
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  setup () {

  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/style/variables';

.container {
  display: flex;
  flex-direction: column;
  background-color: #333;
  background-position: center center;
  background-size: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;

  .lu-home-main {
    user-select: none;
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .text {
      color: #fff;
      font-size: p2r(12);
      margin-top: p2r(20);
    }

    .lu-home-logo {
      width: p2r(160);
      animation: toReal 3s infinite;
    }
  }

  .lu-home-footer {
    width: 100%;
    flex-grow: 0;
    text-align: center;
    padding: p2r(20) 0;

    > a {
      font-size: p2r(12);
      color: #c00;
      text-decoration: none;
    }
  }

  @keyframes toReal {
    0% {
      filter: blur(0);
    }
    50% {
      filter: blur(3px);
    }
    100% {
      filter: blur(1px);
    }
  }
}
</style>
