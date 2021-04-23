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

export function simulateClearInterval (intervalId) {
  clearTimeout(intervalId)
}
