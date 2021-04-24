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
}

export default ThemeApi
