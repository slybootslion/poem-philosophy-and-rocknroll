import dayjs from 'dayjs'
import mitt from 'mitt'
import { baseOssURL } from '@/config/setting'

const dayDict = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}

export const clock = () => {
  const date = dayjs(new Date())
  const hour = date.hour()

  return {
    hour,
    time: date.format('HH:mm:ss'),
    date: date.format('YYYY年MM月DD日'),
    day: dayDict[date.day()],
  }
}

export const HomeEventBus = mitt()

export async function urlFormat (list, store) {
  if (list.length) {
    list = list.map(item => {
      item.url = baseOssURL + item.ossName
      return item
    })
  }
  await store.dispatch('theme/setThemeShowListAction', list)
  return list
}

export function formatIconUrl (item) {
  const reg = /(\w+):\/\/([^/:]+)(:\d*)?/
  const r = reg.exec(item.link)
  item.icoUrl = r[2]
  return item
}

export function formatLinkGroup (list, groupLimit = 15) {
  const arr = []
  let c = 0
  let temp = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (c >= groupLimit) {
      arr.push([...temp])
      temp = []
      c = 0
      temp.length = []
    }

    temp.push(item)
    c++
  }
  arr.push(temp)
  return arr
}
