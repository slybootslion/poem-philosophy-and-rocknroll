import { defineStore } from 'pinia'
import { ref } from "vue";
import { StorageCache } from "../utils/tools";
import { pinia } from "./index";

export const usePageLoading = defineStore('pageLoading', () => {
  const isLoading = ref(true)

  function finishedLoading () {
    isLoading.value = false
  }

  function loadingState () {
    return isLoading.value
  }

  return { isLoading, finishedLoading, loadingState }
})

export const useThemeNight = defineStore('themeNight', () => {
  const localState = StorageCache.get('isNight')
  const isNight = ref(JSON.parse(localState))

  function changeNight (val) {
    StorageCache.set('isNight', val)
    isNight.value = val
  }

  function nightThemeState () {
    return isNight.value
  }

  const bgTimeIndex = ref(Number(StorageCache.get('bgTime')) || 3)

  function changeBgTimeIndex (idx) {
    bgTimeIndex.value = idx
  }

  return { isNight, changeNight, nightThemeState, changeBgTimeIndex, bgTimeIndex }
})

export const useHomeState = defineStore('homeState', () => {
  const isTimeShow = ref(true)

  function changeTimeState (state) {
    isTimeShow.value = state
  }

  function isTimeState () {
    return isTimeShow.value
  }

  return { isTimeShow, changeTimeState, isTimeState }
})

export const useHomeStateOutside = () => useHomeState(pinia)
