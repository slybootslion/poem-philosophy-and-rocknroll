<script setup>
import HomeFooter from "./components/home-footer.vue";
import BackgroundImage from "./components/background-image.vue";
import UserBoard from "./components/user-board.vue";
import ElectronicClock from "./components/electronic-clock.vue";
import SearchBoard from "./components/search-board.vue";
import LinkBoard from "./components/link-board.vue";
import { bindHotKey, unbindHotKey } from "../../utils/tools";
import { linkCurrent, searchCurrent, useLinkBoard, useSearchBoard } from "../../store/functional-module";
import { onBeforeUnmount } from "vue";

const { showSearchBoard, changeSearchBoard, searchBoardState } = useSearchBoard()
const { showLinkBoard, changeLinkBoard, linkBoardState } = useLinkBoard()
bindHotKey('alt+q', () => searchCurrent())
bindHotKey('alt+l', () => linkCurrent())
onBeforeUnmount(() => {
  unbindHotKey('alt+q')
  unbindHotKey('alt+l')
})
</script>

<template>
  <div class="home-container">
    <div class="container">
      <background-image />
      <electronic-clock />
      <user-board />
      <search-board />
      <link-board />
    </div>
    <home-footer />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>
