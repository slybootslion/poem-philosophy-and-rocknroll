<script setup>
import { useLinkBoard } from "../../../store/functional-module";
import { computed } from "vue";
import { useHomeState } from "../../../store/home-theme";

const { changeLinkBoard, linkBoardState } = useLinkBoard()
const { changeTimeState } = useHomeState()

const isShow = computed({
  get: () => linkBoardState(),
  set: val => {
    changeLinkBoard(val)
    changeTimeState(true)
  }
})
</script>

<template>
  <var-popup v-model:show="isShow">
    <div class="block">link fell</div>
  </var-popup>
</template>

<style scoped lang="scss">
//
</style>
