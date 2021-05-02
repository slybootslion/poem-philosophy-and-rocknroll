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
}

export default PublicApi
