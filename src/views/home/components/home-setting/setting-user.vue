<template>
  <home-setting-container>
    <div class="qr-code">
      <el-image class="qr-image"
                :src="qrLink"
                hide-on-click-modal
                :preview-src-list="[qrLink]" />
    </div>
  </home-setting-container>
</template>

<script>
import HomeSettingContainer from './setting-container'
import { ref } from 'vue'
import { useStore } from 'vuex'
import PublicApi from '@/api/module/public-api'
import { storageCache } from '@/utils'

const publicApi = new PublicApi()

export default {
  name: 'home-setting-user-setting',
  components: { HomeSettingContainer },
  setup () {
    const store = useStore()
    const qrLink = ref('')

    const getQRCode = async () => {
      if (store.getters.isLogin) return
      let qrcode = storageCache.getQRCode()
      if (storageCache.getQRCode()) {
        qrLink.value = qrcode
        return
      }
      const res = await publicApi.getQRCode()
      qrcode = res.qrcode
      if (qrcode) {
        qrLink.value = qrcode
        storageCache.setQRCode(qrcode)
      }
    }
    getQRCode()

    return {
      qrLink,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../var.scss";

.qr-code {
  width: 100%;
  height: p2r(360);
  display: flex;
  align-items: center;
  justify-content: center;

  .qr-image {
    width: 180px;
    height: 180px;
  }
}
</style>
