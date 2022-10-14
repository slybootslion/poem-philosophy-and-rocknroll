import { http } from '@/utils/http'
import { getUuid, StorageCache } from "@/utils/tools";

export const httpLoginQrcode = async () => {
  return http({
    url: '/common/qrcode',
    params: {
      uuid: getUuid()
    }
  })
}

export const httpGetCaptcha = async () => {
  return http({
    url: '/common/captcha',
    params: {
      uuid: getUuid()
    }
  })
}

export const httpPostPwdLogin = async data => {
  return http({
    url: '/auth/login/password',
    method: 'post',
    data
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
