import initElement from '@/plugins/element'
import { initHotkey } from '@/plugins/initHotkeys'

import 'normalize.css/normalize.css'
import '@/assets/style/index.scss'
import '@/assets/iconfont/iconfont.scss'

export default function initPlugin (app) {
  initElement(app)
  initHotkey()
}
