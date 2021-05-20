import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { baseURL } from '@/config/setting'
import { showMessage } from '@/utils'

const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
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
  baseURL,
  timeout: 20 * 1000, // 请求超时时间设置
  crossDomain: true,
  validateStatus (status) {
    return status >= 200 && status < 510
  },
}

// 创建请求实例
const instanceAxios = axios.create(config)

// 请求拦截器
instanceAxios.interceptors.request.use(config => {
  if (!config.url) {
    showMessage('请求必须有url')
    throw new Error({ source: 'axiosInterceptors' })
  }
  config.method = config.method.toLowerCase()

  // 拦截重复请求(即当前正在进行的相同请求)
  const requestData = getRequestIdentify(config, true)
  removePending(requestData, true)

  config.cancelToken = new CancelToken(c => {
    pending[requestData] = c
  })

  // 判断是否包含文件类型
  if (config.method === 'post' && config.data) {
    let hasFile = false
    Object.keys(config.data).forEach(key => {
      if (typeof config.data[key] === 'object') {
        const item = config.data[key]
        if (item instanceof FileList ||
          item instanceof File ||
          item instanceof Blob) {
          hasFile = true
        }
      }
    })

    // 检测到存在文件使用FormData提交数据
    if (hasFile) {
      const formData = new FormData()
      Reflect.ownKeys(config.data).forEach(key => formData.append(key, config.data[key]))
      config.data = formData
    }
  }

  // 添加token
  // const token = (new TokenStorage()).getToken()
  if (store.getters.isLogin) {
    const token = store.state.user.token
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

instanceAxios.interceptors.response.use(response => {
  // 把已经完成的请求从 pending 中移除
  const requestData = getRequestIdentify(response.config)
  removePending(requestData)

  const { code, message } = response.data

  // 没有异常
  if (response.status.toString().charAt(0) === '2') {
    return response.data
  }

  // 主动错误处理
  return handleServerActiveException(code, message, response)
}, error => {
  // 服务器非主动异常
  // 没有返回错误内容
  if (!error.response) {
    showMessage('服务器错误')
  } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    showMessage('请求超时')
  }
  return Promise.reject(error)
})

function handleServerActiveException (code, message, res) {
  return new Promise((resolve, reject) => {
    // token异常，没有权限，需要重新登录
    if (code === 10040) {
      logout()
      showMessage('身份异常，需重新登录')
      return resolve(null)
    } else if (code === 10050 && res.status.toString() === '422') {
      // token刷新，重发请求
      const token = message
      if (token === '令牌过期') {
        logout()
        showMessage(token)
        reject(message)
        return
      }
      const { config } = res
      store.commit('user/SET_TOKEN', token)
      instanceAxios(config).then(result => {
        return resolve(result)
      }).catch(console.log)
      return true
    }

    if (message) {
      if (Array.isArray(message)) message = message[0]
      showMessage(message)
    }
    reject(message)
  })
}

function logout () {
  store.dispatch('user/removeUserDataAction').then(() => {
    // 跳转路由
    router.replace({ path: '/' })
  })
}

export default instanceAxios
