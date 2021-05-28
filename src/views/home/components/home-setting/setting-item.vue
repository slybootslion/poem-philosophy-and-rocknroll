<template>
  <div class="item-container">
    <div class="item">
      <span>{{ text }}</span>
      <slot></slot>
    </div>
    <span class="desc">{{ desc }}</span>
  </div>
  <el-divider class="divider" v-if="!hide"></el-divider>
</template>

<script>
export default {
  name: 'homeSettingItem',
  props: {
    text: {
      type: String,
    },
    desc: {
      type: String,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../hooks/var";

.item-container {
  width: 100%;
  padding: p2r(11) p2r(6);
  box-sizing: border-box;

  .item {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .desc {
    font-size: p2r(12);
    color: $color-info;
    margin: p2r(4) 0 0;
    display: block;
    opacity: 0.6;
  }
}

.divider {
  margin: 0;
}
</style>
