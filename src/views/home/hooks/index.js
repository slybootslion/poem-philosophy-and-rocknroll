import dayjs from 'dayjs'
import mitt from 'mitt'
import hotkeys from 'hotkeys-js'
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

export async function hotKeyJs (hotkey, fn) {
  hotkeys(hotkey, fn)
}
