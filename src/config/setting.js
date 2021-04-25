const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV && NODE_ENV.trim() === 'production'

const baseURL = isProduction ? 'https://cyberpunk.slybootslion.com/' : 'http://localhost:39100'

const baseOssURL = 'https://slybootslion.oss-cn-chengdu.aliyuncs.com/'

export {
  NODE_ENV,
  isProduction,
  baseURL,
  baseOssURL,
}
