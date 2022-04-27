<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { closeSearchBoard, searchCurrent, useSearchBoard } from "../../../store/functional-module";
import {
  httpChangeSearchType, httpDeleteKeywordHistory, httpGetHotKeyByBing, httpGetSearchType, httpSearchKeywordHistory
} from "../libs/httpTheme";
import { useUserInfo } from "../../../store/user-info";
import { emitter } from "../../../utils/tools";
import { debounce } from "lodash";

const { searchBoardState } = useSearchBoard()
const isShow = computed({
  get: () => searchBoardState(),
  set: closeSearchBoard
})

const searchText = ref('')
const inputDom = ref(null)
const open = () => nextTick(() => inputDom.value.focus())
const closed = () => reset()

const searchType = ref('Google')
const { user } = useUserInfo()
const initSearchType = async () => {
  if (!user.isLogin) return
  const res = await httpGetSearchType()
  if (res.search_type) searchType.value = res.search_type
}
initSearchType()
const searchUrl = {
  Google: 'https://www.google.com/search?q=',
  Bing: 'https://www.bing.com/search?q=',
  Baidu: 'https://www.baidu.com/s?wd=',
}
const searchTypeChange = async () => {
  switch (searchType.value) {
    case 'Google':
      searchType.value = 'Bing'
      break;
    case 'Bing':
      searchType.value = 'Baidu'
      break
    case 'Baidu':
      searchType.value = 'Google'
      break
    default:
      break
  }
  if (!user.isLogin) return
  await httpChangeSearchType({ 'search_type': searchType.value })
}
const submitSearch = async (keyword = null) => {
  keyword = keyword ? keyword : searchText.value
  window.open(`${searchUrl[searchType.value]}${keyword}`)
  if (!user.isLogin) return
  await httpSearchKeywordHistory(keyword)
  reset()
}

const keywordList = ref([])
const getHotKeyByBing = debounce(async () => {
  if (searchText.value === '') keywordList.value = []
  const keyword = searchText.value.trim()
  if (!keyword) return
  const res = await httpGetHotKeyByBing(keyword)
  keywordList.value = res.keyword_list
}, 500)

const removeHistory = async item => {
  keywordList.value = keywordList.value.filter(keyword => keyword.value !== item.value)
  await httpDeleteKeywordHistory(item.value)
}

const activeIndex = ref(-1)
const selectResult = type => {
  const len = keywordList.value.length
  if (!len) return
  activeIndex.value = type === 'left' ?
      activeIndex.value - 1 < 0 ? len - 1 : activeIndex.value - 1 :
      activeIndex.value + 1 >= len ? 0 : activeIndex.value + 1
  console.log(keywordList.value[activeIndex])
  searchText.value = keywordList.value[activeIndex.value].value
}

const reset = () => {
  searchText.value = ''
  keywordList.value = []
  activeIndex.value = -1
}

const loadSearch = async () => {
  await initSearchType()
}
emitter.on('loadSearch', loadSearch)
onBeforeUnmount(() => emitter.off('loadSearch', loadSearch))
</script>

<template>
  <div class="popup-box">
    <span class="iconfont icon-search" @click="searchCurrent"></span>
    <var-popup v-model:show="isShow"
               @open="open"
               @closed="closed">
      <div class="block">
        <div class="search-type" @click="searchTypeChange">{{ searchType }}</div>
        <input v-model="searchText"
               ref="inputDom"
               @input="getHotKeyByBing"
               @keyup.esc="closeSearchBoard"
               @keyup.enter="() => submitSearch()"
               @keyup.left="selectResult('left')"
               @keyup.right="selectResult('right')"
               type="text"
               class="search-input">
        <var-icon name="close-circle"
                  v-show="searchText"
                  color="#fff"
                  class="clear-icon"
                  @click="reset" />
      </div>
      <div class="hotkey-box" v-show="keywordList.length">
        <div class="hotkey-item"
             v-for="(item, index) in keywordList"
             :class="index === activeIndex ? 'active' : ''"
             :key="index"
             @click="submitSearch(item.value)">
          <var-chip :closable="item.type === 'history'"
                    icon-name="delete"
                    plain
                    @close.stop="removeHistory(item)">
            {{ item.value }}
          </var-chip>
        </div>
      </div>
    </var-popup>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/style/index';

.popup-box {
  :deep(.var-popup__content) {
    width: 80%;
    background-color: transparent;
    box-shadow: none;
    position: relative;
    overflow: inherit;

    .block {
      background-color: transparent;
      display: flex;
      align-content: center;
      border-bottom: p2r(2) solid #fff;
    }
  }

  .icon-search {
    position: absolute;
    top: p2r(20);
    left: p2r(20);
    color: $color-info;
    cursor: pointer;
    font-size: p2r(20);

    &:hover {
      color: #fff;
    }
  }

  .search-type {
    width: p2r(120);
    font-size: p2r(24);
    padding: 0 0 0 p2r(20);
    color: #fff;
    cursor: pointer;
    //text-align: center;
  }

  .search-input {
    flex: 1;
    height: p2r(40);
    border: none;
    outline: none;
    box-shadow: none;
    //background-color: rgba(0, 0, 0, .05);
    background-color: transparent;
    color: #fff;
    font-size: p2r(20);
    padding: 0 p2r(20) 0 0;
    box-sizing: border-box;
    transition: all .8s;
  }

  .clear-icon {
    cursor: pointer;
  }

  .hotkey-box {
    width: 100%;
    margin: 10px auto 0;
    position: absolute;
    top: p2r(40);
    left: p2r(0);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .hotkey-item {
      margin: 0 p2r(20) p2r(20) 0;
      cursor: pointer;

      &.active,
      &:hover {
        background: var(--w-alpha-20);
        color: rgba(255, 255, 255, .9);
        background-color: rgba(0, 0, 0, .3);
        border-radius: p2r(20);
      }

      .var-chip {
        border-color: #fff;
        color: #fff;
      }
    }
  }
}
</style>
