<script setup>
import { ref } from "vue";
import { httpLoginQrcode, httpLoginQrcodeCheck } from "../libs/httpUser";
import { useUserInfo } from '../../../store/user-info'

const showPopup = ref(false)
const qrcodeSrc = ref('')

const handleUser = async () => {
  showPopup.value = true
  const res = await httpLoginQrcode()
  qrcodeSrc.value = res.qrcode
}



const checkQrcodeLogin = async () => {
  const res = await httpLoginQrcodeCheck()
  if (res && res.token) {

  } else {

  }
}

const qrcodePopupClosed = async () => {
  console.log('close')
}
</script>

<template>
  <span class="iconfont icon-profile" @click="handleUser" />
  <div class="popup-box">
    <var-popup v-model:show="showPopup"
               overlay-class="custom-overlay"
               @closed="qrcodePopupClosed">
      <div class="login-card">
        <var-loading :loading="!qrcodeSrc">
          <img v-show="qrcodeSrc" :src="qrcodeSrc" alt="">
        </var-loading>
      </div>
    </var-popup>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/style/index';

.icon-profile {
  color: $color-info;
  position: absolute;
  bottom: p2r(20);
  right: p2r(20);
  cursor: pointer;
  font-size: p2r(28);
  transition: all .3s;

  &:hover {
    color: #fff;
  }
}

.popup-box {
  :deep(.var-popup__content) {
    background-color: transparent;
  }
}

.login-card {
  width: p2r(260);
  height: p2r(260);
  border-radius: p2r(10);
  padding: p2r(5);
  box-sizing: border-box;
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
  }

  .var-loading {
    height: 100%;
  }
}
</style>
