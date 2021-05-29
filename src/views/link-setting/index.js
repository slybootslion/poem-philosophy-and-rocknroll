import { throttle } from 'lodash'

let lock = true
let el = null
const OUT_RECT = {}

const START_RECT = {}

export const mousedown = ele => {
  const rect = document.querySelector('.user-container').getBoundingClientRect()
  OUT_RECT.minX = rect.left
  OUT_RECT.maxX = rect.right
  OUT_RECT.minY = rect.top
  OUT_RECT.maxY = rect.bottom
  lock = false
  const eleRect = ele.getBoundingClientRect()
  START_RECT.top = eleRect.top
  START_RECT.left = eleRect.left
  el = ele
}

export const mouseup = e => {
  lock = true
}

export const mousemove = throttle(e => {
  if (lock || !el) return
  console.log(OUT_RECT, START_RECT)
  // el.style.cssText = 'position: absolute;'
}, 500)
