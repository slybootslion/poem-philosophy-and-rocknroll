import http from '@/api/axios'

class LinkApi {
  constructor () {
    this.prefix = '/ppr/link/client'
  }

  getLinkList () {
    return http({
      url: `${this.prefix}`,
    })
  }

  getAllList () {
    return http({
      url: `${this.prefix}/all`,
    })
  }
}

export default LinkApi
