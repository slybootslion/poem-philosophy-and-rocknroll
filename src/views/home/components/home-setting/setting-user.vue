<template>
  <home-setting-container v-if="!getters.isLogin">
    <div class="qr-code">
      <el-image class="qr-image"
                :src="qrLink" />
      <div class="img-mask" v-show="showMask" @click="getQRCode">点击刷新</div>
    </div>
    <div class="input-box">
      <div>手机登录：</div>
      <el-input v-model="smsCode.phone" class="phone-input">
        <template #prepend>
          <i class="el-icon-mobile-phone"></i>
        </template>
        <template #append>
          <el-button icon="el-icon-message" @click="sendSMS" v-if="smsCode.toggle"></el-button>
          <el-button disabled v-else>{{ smsCode.sec }}</el-button>
        </template>
      </el-input>
      <el-input v-model="smsCode.code" class="phone-input">
        <template #append>
          <el-button icon="el-icon-coordinate" @click="smsLogin"></el-button>
        </template>
      </el-input>
    </div>
  </home-setting-container>
  <home-setting-container v-else>
    <home-setting-item text="退出登录" hide>
      <el-popconfirm
        confirmButtonText='好的'
        cancelButtonText='不用了'
        @confirm="logout"
        title="是否退出登录？"
      >
        <template #reference>
          <el-button>退出</el-button>
        </template>
      </el-popconfirm>

    </home-setting-item>
  </home-setting-container>
</template>

<script>
import HomeSettingContainer from './setting-container'
import { onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import PublicApi from '@/api/module/public-api'
import { showMessage, storageCache, TimerSimulateInterval } from '@/utils'
import HomeSettingItem from '@/views/home/components/home-setting/setting-item'
import { HomeEventBus } from '@/views/hooks'

const publicApi = new PublicApi()

export default {
  name: 'home-setting-user-setting',
  components: { HomeSettingItem, HomeSettingContainer },
  setup () {
    const SEC = 60 * 10
    const store = useStore()
    const qrLink = ref('')
    const showMask = ref(true)
    const smsCode = reactive({
      phone: '',
      code: '',
      toggle: true,
      sec: SEC,
    })
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
          await storageCache.removeQRCode()
          // 重新刷新主题图片列表
          HomeEventBus.emit('RefreshTheme')
          // 重新获取用户链接列表
          HomeEventBus.emit('RefreshLinks')
        }
      }

      timerSi.simulateInterval(checkLoginRequest, 1000)
    }

    onUnmounted(() => {
      timerSi.simulateClearInterval()
    })

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

    const logout = async () => {
      const res = await publicApi.logout()
      showMessage(res.message, 'success')
      await store.dispatch('user/removeUserDataAction')
      // 暂不刷新主题列表，节省流量
    }

    const sendSMS = async () => {
      const phone = smsCode.phone
      const reg = /^[1][3-9][0-9]{9}$/
      if (!reg.test(phone)) return
      const tsi = new TimerSimulateInterval()
      sendSMS.tsi = tsi
      try {
        smsCode.toggle = false
        await publicApi.sendLoginSms({ phone, type: 1 })
        tsi.simulateInterval(() => smsCode.sec--, 1000)
        setTimeout(() => {
          if (sendSMS.tsi.timer) {
            tsi.simulateClearInterval()
            smsCode.toggle = true
            smsCode.sec = SEC
          }
        }, 1000 * 60 * 5)
      } catch (err) {
        smsCode.sec = SEC
        smsCode.toggle = true
        tsi.simulateClearInterval()
      }
    }

    const smsLogin = async () => {
      const { phone, code } = smsCode
      if (!phone && !code) return
      const res = await publicApi.loginSms({ phone, code })
      await handlerLogin(res)
      if (sendSMS.tsi.timer) sendSMS.tsi.simulateClearInterval()
    }

    async function handlerLogin (res) {
      const { token, userInfo } = res
      if (token) {
        clearCheckLogin()
        await store.dispatch('user/setTokenAction', token)
        await store.dispatch('user/setUserInfoAction', userInfo)
        await storageCache.removeQRCode()
        // 重新刷新主题图片列表
        HomeEventBus.emit('RefreshTheme')
        // 重新获取用户链接列表
        HomeEventBus.emit('RefreshLinks')
      }
    }

    return {
      qrLink, getQRCode, showMask, getters: store.getters, logout, smsCode, sendSMS, smsLogin,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../hooks/var";

.qr-code {
  width: 100%;
  height: p2r(230);
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

.input-box {
  width: p2r(390);

  .phone-input {
    margin-top: p2r(10);
  }
}
</style>
