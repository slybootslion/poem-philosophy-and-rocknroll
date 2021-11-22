// import { throttle } from 'lodash'
import LinkApi from '@/api/module/link-api'
import { formatLinkGroup } from '@/views/hooks'

const linkApi = new LinkApi()

let lock = true
let domLock = false
let el = null
let link = null
let list = null
let maxLength = 0
let copyItem = null
let idx = null
let OUT_RECT = {}
let START_RECT = {}
let store = null

const X_COUNT = 5
let Y_COUNT = 0

export const updateUserLinks = async (listIds, list, store) => {
  const res = await linkApi.putUserLink({ ids: listIds })
  const groupList = formatLinkGroup(list.value, 15)
  if (res.code === 0) await store.dispatch('link/setLinkShowListAction', groupList)
}

const computedDom = (curL, curT) => {
  const leftIdx = Math.ceil((curL * X_COUNT) / OUT_RECT.width)
  let topIdx = Math.floor((curT * Y_COUNT) / (START_RECT.height * Y_COUNT))
  topIdx = topIdx > Y_COUNT ? Y_COUNT : topIdx
  let index = (topIdx * X_COUNT) + leftIdx

  if (!domLock) {
    list.value.splice(idx, 0, copyItem)
    domLock = true
  } else {
    const l = list.value.filter(item => item.id !== copyItem.id)
    index = index > maxLength - 1 ? maxLength - 1 : index
    l.splice(index, 0, copyItem)
    list.value = [...l]
  }

  idx = index
}

// export const move = throttle(e => {
//   if (lock || !el) return
//
//   const { minX, maxX, minY, maxY } = OUT_RECT
//
//   let curL = e.clientX - START_RECT.x + START_RECT.left
//   let curT = e.clientY - START_RECT.y + START_RECT.top
//   curL = curL < minX ? minX : (curL > maxX ? maxX : curL)
//   curT = curT < minY ? minY : (curT > maxY ? maxY : curT)
//   el.style.cssText = `position: absolute; left: ${curL}px; top: ${curT}px; z-index: 1000;`
//   el.classList.remove('isCopy')
//   computedDom(curL, curT)
// }, 60)

export const move = e => {
  if (lock || !e) return
  const { minX, maxX, minY, maxY } = OUT_RECT

  let curL = e.clientX - START_RECT.x + START_RECT.left
  let curT = e.clientY - START_RECT.y + START_RECT.top
  curL = curL < minX ? minX : (curL > maxX ? maxX : curL)
  curT = curT < minY ? minY : (curT > maxY ? maxY : curT)
  el.style.cssText = `position: absolute; left: ${curL}px; top: ${curT}px; z-index: 1000;`
  el.classList.remove('isCopy')
  computedDom(curL, curT)
}

const reset = () => {
  lock = true
  domLock = false
  el = null
  link = null
  list = null
  copyItem = null
  idx = null
  OUT_RECT = {}
  START_RECT = {}

  window.removeEventListener('mousemove', move)
  window.removeEventListener('mouseup', up)
}

export const up = async e => {
  const eleRect = el.getBoundingClientRect()
  if (Math.abs(eleRect.left - START_RECT.left) < 5 && Math.abs(eleRect.top - START_RECT.top) < 5) {
    reset()
    return
  }
  const ids = list.value.map(l => l.id)
  delete copyItem.isCopy

  const index = list.value.findIndex(item => item.id === link.id)
  list.value.splice(index, 1, link)

  await updateUserLinks(ids, list, store)

  el.parentNode.removeChild(el)
}

export const down = (ele, startX, startY, l, li, sto) => {
  const rect = document.querySelector('.user-container').getBoundingClientRect()
  const eleRect = ele.getBoundingClientRect()

  START_RECT.top = eleRect.top
  START_RECT.left = eleRect.left
  START_RECT.x = startX
  START_RECT.y = startY
  START_RECT.height = eleRect.height

  OUT_RECT.minX = 0
  OUT_RECT.maxX = rect.right - eleRect.width
  OUT_RECT.minY = 0
  OUT_RECT.maxY = rect.bottom - eleRect.height
  OUT_RECT.width = rect.width
  OUT_RECT.height = rect.height

  lock = false
  list = l
  maxLength = list.value.length
  store = sto

  Y_COUNT = Math.ceil(list.value.length / 5)

  link = li
  el = ele

  idx = list.value.findIndex(item => item.id === link.id)
  copyItem = {
    ...link, isCopy: true,
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}
