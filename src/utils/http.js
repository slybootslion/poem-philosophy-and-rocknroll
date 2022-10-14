import axios from 'axios'
import { showMessage, StorageCache } from "./tools";
import { useUserInfo } from '@/store/user-info'

const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('remove request')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}

const config = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  baseURL: import.meta.env.MODE && import.meta.env.MODE === 'development' ?
    'https://py1.uniformfox.com/' :
    'https://api.slybootslion.com',
  timeout: 10 * 1000, // 请求超时时间设置
  crossDomain: true,
  validateStatus (status) {
    return status >= 200 && status < 510
  },
  responseType: 'json',
}

const http = axios.create(config)

http.interceptors.request.use(
  config => {
    if (!config.url) {
      showMessage('request must have URL')
      throw new Error('axiosException: request must have URL')
    }
    config.method = config.method.toLowerCase()
    // 拦截重复请求(即当前正在进行的相同请求)
    const requestData = getRequestIdentify(config, true)
    removePending(requestData, true)
    config.cancelToken = new CancelToken(c => {
      pending[requestData] = c
    })
    // 添加token
    const { user: { token, isLogin } } = useUserInfo()
    if (isLogin) config.headers.Authorization = `Bearer ${token}`
    return config
  }, error => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  response => {
    const requestData = getRequestIdentify(response.config)
    removePending(requestData)
    const { code, message, error_code } = response.data
    // 没有异常
    if (code.toString().charAt(0) === '2' && error_code === 0) return response.data.data
    // 主动错误处理
    return handleServerActiveException(code, message, response, error_code)
  },
  // 服务器异常处理
  error => {
    if (!error.response) {
      showMessage('server error')
    } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      showMessage('server error，check network connection')
    }
    return Promise.reject(error)
  },
)

function handleServerActiveException (code, message, res, error_code) {
  return new Promise((resolve, reject) => {
    // token异常，没有权限，需要重新登录
    const { clearUserInfo, setToken } = useUserInfo()
    if (error_code === 10040 || error_code === 10060) {
      clearUserInfo()
      return
    } else if (error_code === 10050) {
      // token刷新，重发请求
      const { config } = res
      const token = res.data.data.token
      setToken(token)
      StorageCache.set('token', token)
      http(config).then(result => resolve(result)).catch(console.log)
      return
    }

    if (message.trim()) showMessage(message.trim())
    reject(message)
  })
}

export { http }
