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

  putUserLink (data) {
    return http({
      url: `${this.prefix}/user-link`,
      method: 'put',
      data,
    })
  }
}

export default LinkApi
