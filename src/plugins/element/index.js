import {
  ElButton, ElPopover, ElMenu, ElMenuItem, ElDivider,
  ElSwitch, ElImage, ElPopconfirm,
  ElInput, ElSelect, ElOption,
  ElCarousel, ElCarouselItem,
  ElRadioGroup, ElRadioButton,
} from 'element-plus'

import './element-variables.scss'

const elementComponents = [ElButton, ElPopover, ElMenu, ElMenuItem, ElDivider, ElSwitch, ElImage, ElPopconfirm, ElInput, ElSelect, ElOption, ElCarousel, ElCarouselItem, ElRadioGroup, ElRadioButton]

export default function initElement (app) {
  app.config.globalProperties.$ELEMENT = {
    size: 'mini',
    zIndex: 10,
  }
  elementComponents.forEach(comp => app.component(comp.name, comp))
}
