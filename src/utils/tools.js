import { ElMessage } from 'element-plus'
import { v4 } from 'uuid'

export function simulateClearInterval (intervalId) {
  clearTimeout(intervalId)
}

export function simulateInterval (callback, interval) {
  let timerId = null

  function fn () {
    callback()
    const prevTimerId = timerId
    timerId = setTimeout(fn, interval)
    clearTimeout(prevTimerId)
  }

  return setTimeout(fn, interval)
}

export function showMessage (message, type = 'error', duration = 1200) {
  ElMessage({
    message,
    type,
    duration,
  })
}

export function randomInt (min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

export function createUuid () {
  return v4()
}
