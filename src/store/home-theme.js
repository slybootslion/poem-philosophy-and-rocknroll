import { defineStore } from 'pinia'
import { ref } from "vue";
import { StorageCache } from "../utils/tools";

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
  const isNight = ref(false)

  function changeNight (val) {
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
