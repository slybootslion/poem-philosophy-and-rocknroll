<template>
  <div class="search-container"
       :class="isShow ? 'show' : ''">
    <div class="search-mask" @click="isShow = false" />
    <div class="input-box">
      <el-input ref="searchInput"
                type="text"
                v-model="searchData.searchText"
                @input="handlerInput"
                @keyup.esc="handlerEsc"
                @keyup.enter="submit"
                @keyup.up="selectResult('up')"
                @keyup.down="selectResult('down')"
                clearable>
        <template #prepend>
          <el-select v-model="searchData.searchType"
                     @change="searchTypeChange">
            <el-option label="Google" value="Google"></el-option>
            <el-option label="Bing" value="Bing"></el-option>
            <el-option label="Duck" value="DuckDuckGo"></el-option>
          </el-select>
        </template>
      </el-input>
    </div>
    <div class="hotkey-box">
      <div class="hotkey-item"
           :class="item.active ? 'active' : ''"
           v-for="(item, index) in searchData.searchResult"
           :key="index"
           @click="submit(item)">
        <span class="iconfont" :class="searchData.iconType[item.type]"></span>
        <span>
          <span v-if="item.type === 1">翻译：</span>
          {{ item.text }}
        </span>
        <span v-if="item.type === 2" class="clear" @click.stop="removeHistory(item)">移除</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { HomeEventBus } from '@/views/hooks'
import SearchApi from '@/api/module/search-api'
import { debounce } from 'lodash'
import { checkRegCN, checkRegEN, storageCache } from '@/utils'

const searchApi = new SearchApi()

export default {
  name: 'searchBoard',
  setup () {
    const isShow = ref(false)
    const searchInput = ref(null)
    const searchData = reactive({
      searchText: '',
      searchUrl: {
        Google: 'https://www.google.com/search?q=',
        Bing: 'https://www.bing.com/search?q=',
        DuckDuckGo: 'https://duckduckgo.com/?q=',
      },
      searchType: 'Google',
      iconType: Object.freeze({
        1: 'icon-discover',
        2: 'icon-time',
        3: 'icon-search',
      }),
      searchResult: [],
    })
    let activeIndex = -1
    let isCNFlag = null
    let resultFlag = false

    const toggleShow = state => {
      isShow.value = state
      if (isShow.value) {
        searchInput.value.focus()
      }
    }

    const handlerEsc = e => {
      searchInput.value.blur()
      HomeEventBus.emit('toggleSearchBoard', false)
    }

    const translationSubmit = () => {
      const text = searchData.searchText
      if (isCNFlag) {
        window.open(`https://translate.google.com/?tl=en&text=${text}&op=translate&hl=zh-CN`)
      } else {
        window.open(`https://translate.google.com/?sl=en&text=${text}&op=translate&hl=zh-CN`)
      }
      searchData.searchText = ''
    }

    const handleResultData = bingResult => {
      searchData.searchResult = searchData.searchResult.concat(bingResult).slice(0, 11)
    }

    const removeHistory = item => {
      storageCache.unshiftSearchHistoryItem(item.text, true)
      searchData.searchResult = searchData.searchResult.filter(i => i.text !== item.text)
    }

    watch(() => searchData.searchText, n => {
      if (!n) searchData.searchResult = []
    })

    const handlerInput = debounce(async str => {
      str = str.trim()
      if (!str) return
      if (resultFlag) {
        resultFlag = false
        return
      }

      const isEN = checkRegEN(searchData.searchText)
      const isCN = checkRegCN(searchData.searchText)
      isCNFlag = isCN ? true : (isEN ? false : null)

      if (isCNFlag != null) searchData.searchResult = [{ type: 1, text: searchData.searchText }]

      let historyArr = storageCache.getSearchHistory()
      if (historyArr) {
        historyArr = historyArr.filter(item => item.startsWith(searchData.searchText)).slice(0, 3).map(item => ({
          type: 2, text: item,
        }))
        if (historyArr.length) searchData.searchResult = searchData.searchResult.concat(historyArr)
      }
      searchData.searchResult.concat(historyArr)

      const res = await searchApi.getHotKeyByBing(encodeURI(str))
      const bingResult = res.map(r => ({ text: r, type: 3 }))
      handleResultData(bingResult)
    }, 500)

    const selectResult = type => {
      const res = searchData.searchResult
      const len = res.length
      if (!len) return
      type === 'up'
        ? activeIndex = activeIndex = activeIndex - 1 < 0 ? len - 1 : activeIndex - 1
        : activeIndex = activeIndex = activeIndex + 1 >= len ? 0 : activeIndex + 1
      searchData.searchResult = res.map((item, index) => {
        if (index === activeIndex) {
          item.active = true
          searchData.searchText = item.text
        } else {
          item.active = false
        }
        return item
      })
    }

    const searchTypeChange = type => searchData.searchType = type

    const submit = async item => {
      if (!(item instanceof KeyboardEvent)) {
        searchData.searchText = item.text
        if (item.type === 1) {
          translationSubmit()
          return
        }
      } else {
        if (activeIndex === 0) {
          translationSubmit()
          return
        }
      }

      window.open(`${searchData.searchUrl[searchData.searchType]}${searchData.searchText}`)
      storageCache.unshiftSearchHistoryItem(searchData.searchText)
      resultFlag = true
      searchData.searchText = ''
    }

    HomeEventBus.on('toggleSearchBoard', toggleShow)

    return {
      isShow,
      searchInput,
      searchData,
      handlerEsc,
      removeHistory,
      handlerInput,
      selectResult,
      searchTypeChange,
      submit,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../../hooks/var';

.search-container {
  .input-box {
    width: 50%;
    margin: 200px auto 0;

    .el-input {
      position: relative;

      &:deep(.el-input__inner) {
        width: 100%;
        height: 36px;
        border: 1px solid #ccc;
        background-color: rgba(0, 0, 0, .12);
        color: #fff;
        font-size: 16px;
        padding: 0 20px 0 100px;
        box-sizing: border-box;
        border-radius: 22px;
        transition: all .8s;

        &:focus {
          background-color: rgba(0, 0, 0, .6);
          box-shadow: 0 0 10px hsl(0deg 0% 100% / 60%);
        }
      }

      &:deep(.el-input-group__prepend) {
        position: absolute;
        margin: 0;
        padding: 0;
        border: none;
        background-color: transparent;
        width: 0;

        .el-select {
          &.el-select--mini {
            margin: -2px 0 0;
            line-height: 36px;

            .el-input {
              width: 97px;

              .el-input__inner {
                padding: 0;
                text-align: center;
                border: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                background-color: transparent;
                box-shadow: none;
              }
            }

            .el-input__suffix {
              display: none;
            }
          }
        }
      }

      &:deep(.el-input__suffix) {
        top: 5px;
        right: 20px;
      }
    }
  }

  .hotkey-box {
    width: 50%;
    margin: 10px auto 0;
    position: relative;
    overflow-y: hidden;
    border-radius: 15px;
    transition: .25s;
    backdrop-filter: blur(5px);

    .hotkey-item {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      clear: both;
      padding-right: 10px;
      text-indent: 10px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, .15);
      color: rgba(255, 255, 255, .6);
      transition: all .2s;

      &.active,
      &:hover {
        text-indent: 15px;
        background: var(--w-alpha-20);
        color: rgba(255, 255, 255, .9);
        background-color: rgba(0, 0, 0, .3);
      }

      .iconfont {
        margin-right: 10px;
      }

      .clear {
        line-height: 30px;
        position: absolute;
        right: 20px;

        &:hover {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
