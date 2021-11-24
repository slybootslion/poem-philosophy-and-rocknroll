import http from '@/api/axios'
import { createUuid, storageCache } from '@/utils'

class PublicApi {
  constructor () {
    this.prefix = '/sys/public'
  }

  sendLoginSms (data) {
    return http({
      url: `${this.prefix}/sms`,
      method: 'POST',
      data,
    })
  }

  loginSms (data) {
    return http({
      url: `${this.prefix}/sms-login`,
      method: 'post',
      data,
    })
  }

  getQRCode () {
    let uuid = storageCache.getUuid()
    if (!uuid) {
      uuid = createUuid()
      storageCache.setUuid(uuid)
    }

    return http({
      url: `${this.prefix}/qrcode`,
      params: { uuid },
    })
  }

  checkLogin () {
    const uuid = storageCache.getUuid()
    if (!uuid) return false
    return http({
      url: `${this.prefix}/check-login`,
      params: { uuid },
    })
  }

  logout () {
    return http({
      url: `${this.prefix}/logout`,
    })
  }
}

export default PublicApi
