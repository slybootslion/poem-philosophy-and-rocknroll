<template>
  <div class="footer-box">
    <div class="footer-item"
         v-for="link in linkData"
         :key="link.content"
         :class="link.link ? 'hover' : ''"
         @click="handleClick(link.link)">
      <img v-if="link.pic" :src="link.pic" alt="" class="link-pic">
      {{ link.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeFooter',
  setup () {
    const pic1 = require('@/assets/images/ghs.png')
    const pic2 = require('@/assets/images/myBlog.png')

    const linkData = [
      {
        link: 'https://beian.miit.gov.cn/',
        content: '陕ICP备18010394号-2',
      },
      {
        link: 'http://www.beian.gov.cn/',
        content: '陕公网安备 61011302000856号',
        pic: pic1,
      },
      {
        link: '',
        content: 'Copyright SlybootsLion All Rights Reserved',
        pic: pic2,
      },
    ]

    const handleClick = link => {
      if (!link) return
      window.open(link)
    }

    return {
      linkData,
      handleClick,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.footer-box {
  height: 30px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;

  .footer-item {
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '|';
      position: relative;
      left: 10px;
    }

    &.hover {
      cursor: pointer;
    }

    &:nth-last-child(1) {
      &::after {
        content: '';
      }
    }

    .link-pic {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
}
</style>
