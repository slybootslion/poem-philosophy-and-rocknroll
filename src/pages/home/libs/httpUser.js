import { http } from '../../../utils/http'
import { StorageCache } from "../../../utils/tools";
import { v4 } from "uuid";

export const httpLoginQrcode = async () => {
  let uuid = StorageCache.get('uuid')
  if (!uuid) uuid = v4()
  StorageCache.set('uuid', uuid)
  return http({
    url: '/common/qrcode',
    params: {
      uuid
    }
  })
}

export const httpLoginQrcodeCheck = async () => {
  let uuid = StorageCache.get('uuid')
  if (!uuid) throw new Error('no uuid in localstorage')
  return http({
    url: '/auth/login/qrcode_check',
    method: 'post',
    data: {
      uuid
    }
  })
}

export const httpLogout = async () => http({ url: '/auth/logout' })
