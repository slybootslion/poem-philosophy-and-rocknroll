<template>
  <el-popover :width="680"
              :popper-append-to-body="false"
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
          <el-menu-item index="用户">
            <i class="iconfont icon-flashlightopen"></i>
            <template #title>用户</template>
          </el-menu-item>
        </div>
      </el-menu>
      <div class="menu-content scroll-style">
        <home-setting-night-model v-if="currentMenu === '显示设置'" />
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
      console.log(name)
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
}

.iconfont {
  color: $color-info;
}
</style>
