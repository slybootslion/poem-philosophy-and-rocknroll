<script setup>
import { ref } from "vue";
import { httpLoginQrcode, httpLoginQrcodeCheck, httpLogout } from "../libs/httpUser";
import { useUserInfo } from '../../../store/user-info'
import { StorageCache, TimerSimulateInterval } from "../../../utils/tools";
import { Dialog } from "@varlet/ui";

const showPopup = ref(false)
const qrcodeSrc = ref('')

const loginInterval = new TimerSimulateInterval()
const { setUserInfo, setIsLogin, setToken, user } = useUserInfo()
const onConfirm = async d => httpLogout().then(() => {
  StorageCache.clear()
  setIsLogin(false)
  setToken('')
  setUserInfo({})
  d()
})
const handleUser = async () => {
  if (user.isLogin) {
    // show logout
    await Dialog({
      message: '确定退出登录？',
      onBeforeClose: (action, done) => {
        if (action === 'confirm') {
          onConfirm(done)
        }
        done()
      }
    })
  } else {
    // show login qrcode
    showPopup.value = true
    const res = await httpLoginQrcode()
    qrcodeSrc.value = res.qrcode
    loginInterval.simulateInterval({ callback: checkQrcodeLogin, countLimit: 60 * 5 })
  }
}

const qrcodePopupClosed = () => loginInterval.simulateClearInterval()
const checkQrcodeLogin = async () => {
  const res = await httpLoginQrcodeCheck()
  if (res && res.token) {
    setUserInfo(res.user)
    setToken(res.token)
    setIsLogin()
    StorageCache.set('token', res.token)
    StorageCache.set('userInfo', JSON.stringify(res.user))
    qrcodePopupClosed()
    showPopup.value = false
  }
}
</script>

<template>
  <span class="iconfont icon-profile" @click="handleUser" />
  <div class="popup-box">
    <var-popup v-model:show="showPopup"
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