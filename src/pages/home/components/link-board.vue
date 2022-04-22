<script setup>
import { linkCurrent, useLinkBoard } from "../../../store/functional-module";
import { computed, onBeforeUnmount, ref } from "vue";
import { useHomeState } from "../../../store/home-theme";
import { httpGetLinks } from "../libs/httpTheme";
import { useUserInfo } from "../../../store/user-info";
import { emitter } from "../../../utils/tools";

const { changeLinkBoard, linkBoardState } = useLinkBoard()
const { changeTimeState } = useHomeState()

const isShow = computed({
  get: () => linkBoardState(),
  set: val => {
    changeLinkBoard(val)
    changeTimeState(true)
  }
})

const links = ref([])
const { user } = useUserInfo()
const getLinks = async () => {
  if (!user.isLogin) return
  links.value = await httpGetLinks()
}
getLinks()

emitter.on('loadLinks', getLinks)
onBeforeUnmount(() => emitter.off('loadLinks', getLinks))

const goPage = data => {
  window.open(data.link_url)
}

const searchWord = ref('')
let backup = null
const search = () => {
  const t = searchWord.value.trim()
  if (!t) return
  backup = [...links.value]
  links.value = links.value.filter(link => {
    if (link.abbreviation.indexOf(t) > -1 ||
        link.link_name.indexOf(t) > -1 ||
        link.link_url.indexOf(t) > -1) {
      return link
    }
  })
}
const clearSearch = () => {
  searchWord.value = ''
  links.value = [...backup]
  backup = null
}
</script>

<template>
  <div class="popup-box">
    <span class="iconfont icon-link"
          @click="linkCurrent"></span>
    <var-popup v-model:show="isShow">
      <div class="search-box centerX">
        <input type="text"
               v-model="searchWord"
               class="search-input"
               @keyup.enter="search">
        <var-icon name="close-circle" v-show="searchWord" class="search-icon" color="#fff" @click="clearSearch" />
      </div>
      <div class="block">
        <div class="link-item"
             v-for="link in links"
             :key="link.id"
             @click="goPage(link)">
          <div ref="iconEl" class="icon-favicon">
            <img v-if="link.link_icon"
                 class="icon-img"
                 alt=""
                 :src="link.link_icon">
            <var-icon name="notebook" v-else size="26" color="#ededed" />
          </div>
          <span class="link-item-title">
          {{ link.abbreviation || link.link_name }}
        </span>
        </div>
      </div>
    </var-popup>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/style/index';

.block {
  display: flex;
  flex-wrap: wrap;

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

      .link-item-title {
        color: #fff;
      }
    }

    .icon-favicon {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      margin: 0 10px 5px;
      background-color: rgba(180, 180, 180, .15);
      backdrop-filter: blur(3px);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color .35s;

      .icon-img {
        width: 26px;
        height: 26px;
      }
    }

    .link-item-title {
      width: 80px;
      bottom: -25px;
      font-size: 12px;
      left: 5%;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      transition: .25s;
      white-space: nowrap;
      color: $color-text-placeholder;
    }
  }
}

.popup-box {
  :deep(.var-popup__content) {
    width: 86%;
    height: 86%;
    box-shadow: none;
    background-color: transparent;
    position: relative;
    padding-top: p2r(40);

    &::-webkit-scrollbar {
      width: p2r(4);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: p2r(10);
      -webkit-box-shadow: inset 0 0 p2r(5) rgba(0, 0, 0, .2);
      background: rgba(0, 0, 0, .2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 p2r(5) rgba(0, 0, 0, .2);
      border-radius: 0;
      background: rgba(0, 0, 0, .1);
    }
  }

  .icon-link {
    position: absolute;
    top: p2r(20);
    right: p2r(20);
    color: $color-info;
    cursor: pointer;
    font-size: p2r(20);

    &:hover {
      color: #fff;
    }
  }
}
.search-box {
  width: 80%;
  position: fixed !important;
  top: p2r(30);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search-input {
    width: 100%;
    height: p2r(30);
    outline: none;
    border: none;
    background-color: transparent;
    border-bottom: p2r(1) solid $color-border-1;
    padding: 0 p2r(20);
    box-sizing: border-box;
    color: #fff;
  }

  .search-icon {
    cursor: pointer;
  }
}

</style>
