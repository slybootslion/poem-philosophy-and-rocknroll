const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV && NODE_ENV.trim() === 'production'

const baseURL = isProduction ? 'http://cyberpunk.slybootslion.com/' : 'http://localhost:39100'

export {
  NODE_ENV,
  isProduction,
  baseURL,
}
