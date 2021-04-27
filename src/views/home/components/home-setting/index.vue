<template>
  <el-popover :width="600"
              trigger="click">
    <template #reference>
      <div class="iconfont icon-settings" />
    </template>
    <div class="menu-box">
      <el-menu collapse
               :default-active="currentMenu"
               @select="menuSelect">
        <el-menu-item v-for="menu in menuItemList"
                      :key="menu.name"
                      :index="menu.name">
          <i class="iconfont" :class="menu.icon"></i>
          <template #title>{{ menu.name }}</template>
        </el-menu-item>
      </el-menu>
      <div class="menu-content">
        <home-setting-night-model v-if="currentMenu === '夜间模式'" />
        <div v-if="currentMenu === '测试'">test</div>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { reactive, ref } from 'vue'
import HomeSettingNightModel from '@/views/home/components/home-setting/night-comp'

export default {
  name: 'homeSetting',
  components: { HomeSettingNightModel },
  setup () {
    const currentMenu = ref('夜间模式')
    const menuItemList = reactive([
      {
        name: '显示设置',
        icon: 'icon-flashlightopen',
      },
      {
        name: '测试',
        icon: 'icon-discover',
      },
    ])

    function menuSelect (name) {
      currentMenu.value = name
    }

    return {
      menuItemList,
      currentMenu,
      menuSelect,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../var";

.icon-settings {
  position: absolute;
  left: p2r(20);
  bottom: p2r(20);
  cursor: pointer;
  font-size: p2r(28);
}

.menu-box {
  display: flex;

  .menu-content {
    flex: 1;
  }
}

.iconfont {
  color: $color-info;
}
</style>
