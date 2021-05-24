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
                 :src="getters.userInfo.avatarUrl"
                 alt="">
            <template #title>用户设置</template>
          </el-menu-item>
        </div>
      </el-menu>
      <div class="menu-content scroll-style">
        <home-setting-night-model v-if="currentMenu === '显示设置'" />
        <home-setting-theme-setting v-if="currentMenu === '主题设置'" />
        <home-setting-user-setting v-if="currentMenu === '用户设置'" />
      </div>
    </div>
  </el-popover>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import HomeSettingNightModel from './setting-night'
import HomeSettingUserSetting from './setting-user'
import HomeSettingThemeSetting from '@/views/home/components/home-setting/setting-theme'

export default {
  name: 'homeSetting',
  components: { HomeSettingThemeSetting, HomeSettingUserSetting, HomeSettingNightModel },
  setup () {
    const store = useStore()
    const currentMenu = ref('显示设置')

    const originList = [
      {
        name: '显示设置',
        icon: 'icon-flashlightopen',
      },
      {
        name: '主题设置',
        icon: 'icon-discover',
        auth: true,
      },
    ]

    const menuItemList = computed(() => {
      const isLogin = store.getters.isLogin
      return originList.filter(item => {
        if (item.auth == null) return item
        if (item.auth && isLogin) return item
      })
    })

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
  transition: all .3s;

  &:hover {
    color: #fff;
  }
}

.menu-box {
  display: flex;

  &:deep(.el-menu.el-menu--collapse) {
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
