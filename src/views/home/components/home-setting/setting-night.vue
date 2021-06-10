<template>
  <home-setting-container title="夜间模式" desc="夜间模式开启选项">
    <home-setting-item text="是否开启"
                       desc="手动控制夜间模式">
      <el-switch :value="getters.isNightModel"
                 @change="nightModelChange" />
    </home-setting-item>
    <home-setting-item text="自动设置"
                       desc="会根据时间自动设置，6am~10pm为白天模式，其他时间为夜间模式">
      <el-switch :value="getters.isAutoNightModel"
                 @change="autoNightModelChange" />
    </home-setting-item>
  </home-setting-container>
  <home-setting-container title="全屏" desc="是否开启全屏">
    <home-setting-item text="是否全屏显示"
                       hide>
      <el-switch v-model="isFullScreen" @change="fullScreen" />
    </home-setting-item>
  </home-setting-container>
  <home-setting-container title="主题切换时间" desc="切换主题的间隔，每次设置将重新计算时间">
    <home-setting-item text="选择">
      <el-radio-group v-model="timeRadio" size="mini">
        <el-radio-button :label="1">30分钟</el-radio-button>
        <el-radio-button :label="2">1小时</el-radio-button>
        <el-radio-button :label="3">3小时</el-radio-button>
        <el-radio-button :label="4">6小时</el-radio-button>
        <el-radio-button :label="5">12小时</el-radio-button>
        <el-radio-button :label="6">不切换</el-radio-button>
      </el-radio-group>
    </home-setting-item>
  </home-setting-container>
</template>

<script>
import HomeSettingContainer from './setting-container'
import HomeSettingItem from './setting-item'
import { useStore } from 'vuex'
import { watch, ref } from 'vue'

export default {
  name: 'home-setting-night-model',
  components: {
    HomeSettingItem,
    HomeSettingContainer,
  },
  setup () {
    const store = useStore()
    const initRadio = store.state.theme.changeBgTime
    const timeRadio = ref(initRadio)

    watch(() => timeRadio.value, value => store.dispatch('theme/setChangeBgTimeAction', value))

    const timeRadioList = []
    const autoNightModelChange = async status => {
      await store.dispatch('sys/setAutoNightAction', status)
      await store.dispatch('sys/setNightAction', store.getters.isNight)
    }

    const nightModelChange = async value => {
      await store.dispatch('sys/setNightAction', value)
      await store.dispatch('sys/setAutoNightAction', false)
      await store.dispatch('sys/nightAction', value)
    }

    const isFullScreen = ref(false)

    const toggleFullScreen = () => {
      !document.fullscreenElement
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen && document.exitFullscreen()
    }

    const fullScreen = async value => {
      isFullScreen.value = value
      toggleFullScreen()
    }

    /*    const timeRadioHandle = value => {
          store.dispatch('theme/setChangeBgTimeAction', value)
        } */

    return {
      getters: store.getters,
      autoNightModelChange,
      nightModelChange,
      fullScreen,
      isFullScreen,
      timeRadio,
      timeRadioList,
    }
  },
}
</script>
