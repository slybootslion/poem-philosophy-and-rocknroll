<template>
  <home-setting-container>
    <div class="qr-code" v-if="!getters.isLogin">
      <el-image class="qr-image"
                :src="qrLink" />
      <div class="img-mask" v-show="showMask" @click="getQRCode">点击刷新</div>
    </div>
    <div v-else>
      已登录
    </div>
  </home-setting-container>
</template>

<script>
import HomeSettingContainer from './setting-container'
import { onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import PublicApi from '@/api/module/public-api'
import { storageCache, TimerSimulateInterval } from '@/utils'

const publicApi = new PublicApi()

export default {
  name: 'home-setting-user-setting',
  components: { HomeSettingContainer },
  setup () {
    const store = useStore()
    const qrLink = ref('')
    const showMask = ref(true)
    const uuid = storageCache.getUuid()
    const timerSi = new TimerSimulateInterval()

    const clearCheckLogin = () => {
      showMask.value = true
      timerSi.simulateClearInterval()
    }

    const checkLogin = async () => {
      showMask.value = false

      const checkLoginRequest = async () => {
        const qrcode = storageCache.getQRCode()
        if (!qrcode) clearCheckLogin()
        const res = await publicApi.checkLogin({ uuid })
        if (!res) clearCheckLogin()
        const { token, userInfo } = res
        if (token) {
          clearCheckLogin()
          await store.dispatch('user/setTokenAction', token)
          await store.dispatch('user/setUserInfoAction', userInfo)
        }
      }

      timerSi.simulateInterval(checkLoginRequest, 1000)
    }

    onUnmounted(() => timerSi.simulateClearInterval())

    const getQRCode = async () => {
      if (store.getters.isLogin) return
      let qrcode = storageCache.getQRCode()
      if (qrcode) {
        qrLink.value = qrcode
        await checkLogin()
        return
      }
      const res = await publicApi.getQRCode()
      qrcode = res.qrcode
      qrLink.value = qrcode
      storageCache.setQRCode(qrcode)
      await checkLogin()
    }
    getQRCode()

    return {
      qrLink,
      getQRCode,
      showMask,
      getters: store.getters,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../var.scss";

.qr-code {
  width: 100%;
  height: p2r(360);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .qr-image {
    width: 180px;
    height: 180px;
    cursor: pointer;
  }

  .img-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .95);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
