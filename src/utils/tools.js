import { Snackbar } from "@varlet/ui";
import hotkeys from "hotkeys-js";
import mitt from 'mitt'
import { v4 } from "uuid";

export class TimerSimulateInterval {
  constructor () {
    this.timer = null
    this.clear = false
    this.countLimit = 0
  }

  /*
  * 设置定时器，
  * 1参数：定时器回调
  * 2参数：每次定时器执行间隔时长，默认1秒
  * 3参数：定时器执行次数，默认5次，可传Infinity不限制次数
  * */
  simulateInterval ({ callback, interval = 1000, countLimit = 5 }) {
    let timerId = null
    this.clear = false
    this.countLimit = countLimit
    let c = 0
    const fn = () => {
      if (this.clear) return
      if (c >= this.countLimit) {
        this.simulateClearInterval()
        return
      }
      callback()
      const prevTimerId = timerId
      timerId = setTimeout(fn, interval)
      clearTimeout(prevTimerId)
      this.timer = timerId
      c++
    }

    setTimeout(fn, interval)
  }

  simulateClearInterval (callback) {
    clearTimeout(this.timer)
    this.clear = true
    callback && callback()
  }
}

export const showMessage = (content, type = 'error', duration = 1500) => {
  Snackbar({
    content,
    duration,
    type,
  })
}

export const StorageCache = {
  set (key, val) {
    localStorage.setItem(key, val)
  },
  get (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  clear () {
    localStorage.clear()
  }
}

export function randomInt (min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

export const bindHotKey = (hotkey, fn) => hotkeys(hotkey, fn)

export const unbindHotKey = hotkey => hotkeys.unbind(hotkey)

export const emitter = mitt()

export const getUuid = () => {
  let uuid = StorageCache.get('uuid')
  if (!uuid) {
    uuid = v4()
    StorageCache.set('uuid', uuid)
  }
  return uuid
}

export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
