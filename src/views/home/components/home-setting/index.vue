<template>
  <el-popover :width="680"
              popper-class="popper-style"
              trigger="click">
    <template #reference>
      <div class="iconfont icon-settings" />
    </template>
    <div class="menu-box">
      <el-menu collapse
               class="el-menu-style"
               :default-active="currentMenu"
               @select="menuSelect">
        <div>
          <el-menu-item v-for="menu in menuItemList"
                        :key="menu.name"
                        :index="menu.name">
            <i class="iconfont" :class="menu.icon"></i>
            <template #title>{{ menu.name }}</template>
          </el-menu-item>
        </div>
        <div>
          <el-menu-item index="用户设置">
            <i class="iconfont icon-friendfamous" v-if="!getters.isLogin"></i>
            <img class="user-avatar"
                 v-else
                 src="https://thirdwx.qlogo.cn/mmopen/vi_32/5c1gkU1VMGpxXFtMicMakEaQxAjrQwWYo6uhaeMic0L6XicgfVKLF2MZtYUDArwRxP5qT8xiaofD6LmvTzYvscg8jg/132"
                 alt="">
            <template #title>用户设置</template>
          </el-menu-item>
        </div>
      </el-menu>
      <div class="menu-content scroll-style">
        <home-setting-night-model v-if="currentMenu === '显示设置'" />
        <div v-if="currentMenu === '测试'">test</div>
        <home-setting-user-setting v-if="currentMenu === '用户设置'" />
      </div>
    </div>
  </el-popover>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import HomeSettingNightModel from './night-comp'
import HomeSettingUserSetting from './setting-user'

export default {
  name: 'homeSetting',
  components: { HomeSettingUserSetting, HomeSettingNightModel },
  setup () {
    const store = useStore()
    const currentMenu = ref('显示设置')
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
      getters: store.getters,
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

  &::v-deep .el-menu.el-menu--collapse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &::after {
      content: '';
      display: none;
    }

    &::before {
      content: '';
      display: none;
    }
  }

  .menu-content {
    height: p2r(400);
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    margin-left: -8px;
    border-radius: 50%;
    border: 1px solid #ededed;
  }
}

.iconfont {
  color: $color-info;
}
</style>
