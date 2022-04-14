<script setup>
import { computed } from "vue";
import { useSearchBoard } from "../../../store/functional-module";
import { useHomeState } from "../../../store/home-theme";

const { showSearchBoard, changeSearchBoard, searchBoardState } = useSearchBoard()
const { changeTimeState } = useHomeState()
const isShow = computed({
  get: () => searchBoardState(),
  set: val => {
    changeSearchBoard(val)
    changeTimeState(true)
  }
})
</script>

<template>
  <var-popup v-model:show="isShow">
    <div class="block">fell</div>
  </var-popup>
</template>

<style scoped lang="scss">
//
</style>
