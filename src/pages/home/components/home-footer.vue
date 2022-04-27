<script setup>
import pic2 from '/src/assets/images/my-blog.png'
import pic1 from '/src/assets/images/ghs.png'

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
</script>

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

<style scoped lang="scss">
@import '../../../assets/style/index';

.footer-box {
  height: p2r(30);
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: p2r(12);

  .footer-item {
    margin: 0 p2r(10);
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '|';
      position: relative;
      left: p2r(10);
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
      width: p2r(16);
      height: p2r(16);
      margin-right: p2r(5);
    }
  }
}
</style>
