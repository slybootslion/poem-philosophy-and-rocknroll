import { ElMessage } from 'element-plus'
import { v4 } from 'uuid'

export class TimerSimulateInterval {
  constructor () {
    this.timer = null
    this.clear = false
  }

  simulateInterval (callback, interval) {
    let timerId = null
    this.clear = false

    const fn = () => {
      if (this.clear) return
      callback()
      const prevTimerId = timerId
      timerId = setTimeout(fn, interval)
      clearTimeout(prevTimerId)
      this.timer = timerId
    }

    setTimeout(fn, interval)
  }

  simulateClearInterval () {
    clearTimeout(this.timer)
    this.clear = true
  }
}

// export function simulateClearInterval (intervalId) {
//   clearTimeout(intervalId)
// }
//
// export function simulateInterval (callback, interval) {
//   let timerId = null
//
//   function fn () {
//     callback()
//     const prevTimerId = timerId
//     timerId = setTimeout(fn, interval)
//     clearTimeout(prevTimerId)
//   }
//
//   setTimeout(fn, interval)
// }

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
