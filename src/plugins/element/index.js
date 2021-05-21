import {
  ElButton, ElPopover, ElMenu, ElMenuItem, ElDivider,
  ElSwitch, ElImage, ElPopconfirm,
  ElInput, ElSelect, ElOption,
} from 'element-plus'

import './element-variables.scss'

const elementComponents = [ElButton, ElPopover, ElMenu, ElMenuItem, ElDivider, ElSwitch, ElImage, ElPopconfirm, ElInput, ElSelect, ElOption]

export default function initElement (app) {
  app.config.globalProperties.$ELEMENT = {
    size: 'mini',
    zIndex: 10,
  }
  elementComponents.forEach(comp => app.component(comp.name, comp))
}
