import { defineStore } from 'pinia'
import { ref } from "vue";
import { StorageCache } from "../utils/tools";
import { pinia } from "./index";
import { isNightClock } from "../pages/home/libs/clock-hook";

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
    if (val && nightAutoState() && !isNightClock()) changeNightAuto(false)
    if (!val && nightAutoState() && isNightClock()) changeNightAuto(false)
    isNight.value = val
  }

  function nightThemeState () {
    return isNight.value
  }

  const localStateAuto = StorageCache.get('isNightAuto')
  const isNightAuto = ref(JSON.parse(localStateAuto))

  const changeNightAuto = val => {
    StorageCache.set('isNightAuto', val)
    isNightAuto.value = val
  }

  const nightAutoState = () => isNightAuto.value

  const changeTime = StorageCache.get('changeBgTime')
  const bgTimeIndex = ref(changeTime || '3')

  function changeBgTimeIndex (idx) {
    StorageCache.set('changeBgTime', idx)
    bgTimeIndex.value = idx
  }

  const bgTimeIndexState = () => bgTimeIndex.value

  return {
    isNight, changeNight, nightThemeState,
    isNightAuto, changeNightAuto, nightAutoState,
    changeBgTimeIndex, bgTimeIndex, bgTimeIndexState
  }
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
