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
</template>

<script>
import HomeSettingContainer from '@/views/home/components/home-setting/setting-container'
import HomeSettingItem from '@/views/home/components/home-setting/setting-item'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'homeSettingNightModel',
  components: {
    HomeSettingItem,
    HomeSettingContainer,
  },
  setup () {
    const store = useStore()
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

    return {
      getters: store.getters,
      autoNightModelChange,
      nightModelChange,
      fullScreen,
      isFullScreen,
    }
  },
}
</script>
