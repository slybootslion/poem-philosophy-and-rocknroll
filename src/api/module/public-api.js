import http from '@/api/axios'
import { createUuid, storageCache } from '@/utils'

class PublicApi {
  constructor () {
    this.prefix = '/sys/public'
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
}

export default PublicApi
