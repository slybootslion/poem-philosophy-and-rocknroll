<template>
  <div class="setting-container">
    <div class="container-title">{{title}}</div>
    <div class="container-desc">{{desc}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'homeSettingContainer',
  props: {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../var";

.setting-container {
  box-sizing: border-box;
  flex: 1;
  padding: p2r(10);

  .container-title {
    margin: p2r(-1) 0 p2r(2);
    font-size: p2r(20);
    font-weight: 600;
  }

  .container-desc {
    margin: p2r(3) 0 p2r(21);
    font-size: p2r(12);
    line-height: 1.3;
    color: $color-info;
  }
}
</style>
