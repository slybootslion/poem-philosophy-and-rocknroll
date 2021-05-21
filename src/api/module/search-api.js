import http from '@/api/axios'

class SearchApi {
  constructor () {
    this.prefix = '/ppr/search/client'
  }

  getHotKeyByBing (str) {
    return http({
      url: `${this.prefix}/hotkey-bing`,
      method: 'post',
      data: { str },
    })
  }
}

// const getHotKeyByBing = hotkey => {
//   // https://cn.bing.com/AS/Suggestions?mkt=zh-cn&qry=hotkey&cvid=1
//   return axios.get(`https://cn.bing.com/AS/Suggestions?mkt=zh-cn&qry=${hotkey}&cvid=1`)
// }

export default SearchApi
