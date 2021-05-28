<template>
  <div class="link-item">
    <div class="icon-favicon" ref="iconEl">
      <img class="icon-img"
           :src="`https://icons.duckduckgo.com/ip2/${link.icoUrl}.ico`">
    </div>
    <span class="link-item-title">
      {{ link.shortTitle || link.title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'link-item',
  props: {
    link: {
      type: Object,
    },
  },
  setup (props) {
    return {}
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../hooks/var";

.link-item {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: left;
  transition: all .3s;
  margin-bottom: 5px;

  &:hover {
    .icon-favicon {
      background-color: rgba(180, 180, 180, .3);
      backdrop-filter: blur(9px);

      .icon-img {
        opacity: 0;
      }
    }

    .link-item-title {
      opacity: 1;
    }
  }

  .icon-favicon {
    width: p2r(80);
    height: p2r(80);
    border-radius: p2r(10);
    margin: 0 p2r(5);
    background-color: rgba(180, 180, 180, .15);
    backdrop-filter: blur(p2r(3));
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .35s;

    .icon-img {
      width: p2r(30);
      height: p2r(30);
      opacity: 1;
    }
  }

  .link-item-title {
    width: p2r(80);
    height: p2r(80);
    position: absolute;
    top: 0;
    left: p2r(5);
    color: white;
    font-size: p2r(12);
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transition: .25s;
    white-space: nowrap;
    line-height: p2r(80);
    opacity: 0;
  }
}
</style>
