<template>
  <div class="centerX search-box">
    <input type="text"
           class="search-input"
           @input="searchInput"
           v-model="t" />
    <span class="iconfont icon-close"
          @click="clearSearch"></span>
  </div>
</template>

<script>
import { ref } from 'vue'
import { debounce } from 'lodash'

export default {
  name: 'link-search',
  setup (_, context) {
    const t = ref('')

    const searchInput = debounce(() => context.emit('linkSearch', t.value), 500)

    const clearSearch = () => {
      t.value = ''
      context.emit('clearSearch')
    }

    return {
      t,
      searchInput,
      clearSearch,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../hooks/var";
.search-box {
  display: flex;
  top: p2r(-30);
  width: p2r(350);
  height: p2r(30);
}

.search-input {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: rgba(0, 0, 0, .12);
  color: #fff;
  font-size: p2r(16);
  padding: 0 p2r(20);
  box-sizing: border-box;
  border-radius: p2r(20);
  transition: all .8s;
  outline: none;

  &:focus {
    background-color: rgba(0, 0, 0, .6);
    box-shadow: 0 0 p2r(10) hsl(0deg 0% 100% / 60%);
  }
}

.icon-close {
  width: p2r(22);
  height: p2r(22);
  position: absolute;
  right: p2r(20);
  cursor: pointer;
  top: p2r(4);
  background-color: transparent;
  border-radius: 50%;
  transition: all .3s;
  text-align: center;
  font-size: p2r(14);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0,0,0,.6);
  }
}
</style>
