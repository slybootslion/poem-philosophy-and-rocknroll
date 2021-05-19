import http from '@/api/axios'

class ThemeApi {
  constructor () {
    this.prefix = '/ppr/theme/client'
  }

  getTheme () {
    return http({
      url: `${this.prefix}/list`,
    })
  }

  getSettingTheme () {
    return http({
      url: `${this.prefix}/setting-list`,
    })
  }

  patchUserSettingTheme (data) {
    return http({
      url: `${this.prefix}/user-theme`,
      method: 'patch',
      data,
    })
  }
}

export default ThemeApi
