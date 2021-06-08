<template>
  <div class="link-item" :class="link.isCopy ? 'isCopy' : ''" ref="itemDom">
    <div class="icon-favicon" ref="iconEl">
      <img class="icon-img"
           :src="src">
    </div>
    <span class="link-item-title"
          @mousedown="mousedown"
          @mouseup="mouseup"
          @mousemove="mousemove">
      {{ link.shortTitle || link.title }}
    </span>
    <span v-if="isUser" class="close-box" @click="closeItem">
      <span class="iconfont icon-close"></span>
    </span>
  </div>
</template>

<script>

import { ref, computed } from 'vue'

export default {
  name: 'link-item',
  props: {
    link: {
      type: Object,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, context) {
    const itemDom = ref(null)

    console.log(props.link)

    const src = computed(() => {
      if (props.link.iconLink) {
        return props.link.iconLink
      } else {
        return `https://icons.duckduckgo.com/ip2/${props.link.icoUrl}.ico`
      }
    })

    const closeItem = () => {
      const id = props.link.id
      context.emit('closeItem', id)
    }

    const mousedown = e => {
      context.emit('MouseDown', itemDom, e, props.link)
    }

    const mouseup = e => {
      context.emit('MouseUp', e)
    }

    const mousemove = e => {
      context.emit('MouseMove', e)
    }

    return {
      itemDom,
      closeItem,
      mousedown,
      mouseup,
      mousemove,
      src,
    }
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
  user-select: none;

  &.isCopy {
    opacity: .5;
  }

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

    .close-box {
      display: flex;
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

  .close-box {
    width: p2r(20);
    height: p2r(20);
    position: absolute;
    top: p2r(4);
    right: p2r(8);
    border-radius: 50%;
    background-color: transparent;
    color: transparent;
    display: none;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #fff;
      color: #333333;
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
