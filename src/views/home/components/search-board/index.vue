<template>
  <div class="search-container"
       :class="isShow ? 'show' : ''">
    <div class="search-mask" @click="isShow = false"></div>
    <div class="input-box">
      <el-input ref="searchInput"
                type="text"
                v-model="searchText"
                @keyup.esc="handleEsc"
                @keyup.enter="submit"
                clearable />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { HomeEventBus } from '@/views/home/hooks'

export default {
  name: 'searchBoard',
  setup () {
    const isShow = ref(false)
    const searchText = ref('')
    const searchInput = ref(null)

    const toggleShow = () => {
      isShow.value = !isShow.value
      if (isShow.value) {
        searchInput.value.focus()
      }
    }

    const handleEsc = e => searchInput.value.blur()

    const submit = e => console.log(searchText.value)

    HomeEventBus.on('showSearchBoard', toggleShow)

    return {
      isShow,
      searchText,
      searchInput,
      handleEsc,
      submit,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../var';

.search-container {
  width: 100%;
  height: 0;
  color: #fff;
  position: absolute;
  top: -100%;
  left: 0;
  border: 1px solid $color-border-1;
  box-sizing: border-box;
  transition: all .5s;

  &.show {
    height: 100%;
    top: 0;
  }

  .search-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .15);
    backdrop-filter: blur(3px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .input-box {
    width: 50%;
    margin: 200px auto 0;

    .el-input {

      &::v-deep .el-input__inner {
        width: 100%;
        height: 36px;
        border: 1px solid #ccc;
        background-color: rgba(0, 0, 0, .12);
        color: #fff;
        font-size: 16px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 22px;
        transition: all .8s;

        &:focus {
          background-color: rgba(0, 0, 0, .6);
          box-shadow: 0 0 10px hsl(0deg 0% 100% / 60%);
        }
      }

      &::v-deep .el-input__suffix {
        top: 5px;
        right: 20px;
      }
    }
  }
}
</style>
