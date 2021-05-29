import hotkeys from 'hotkeys-js'
import { HomeEventBus } from '@/views/hooks'

function hotKeyJs (hotkey, fn) {
  hotkeys(hotkey, fn)
}

export const onSearch = () => HomeEventBus.emit('toggleSearchBoard', true)

export const onLink = () => HomeEventBus.emit('toggleLinkBoard')

export const initHotkey = () => {
  hotKeyJs('alt+q', onSearch)
  hotKeyJs('alt+l', onLink)
}
