import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

const modules = {}
const requireModule = require.context('./modules', false, /.js$/)
requireModule.keys().forEach(fileName => {
  modules[fileName.slice(2, -3)] = requireModule(fileName).default
})

export default createStore({
  modules,
  getters,
  plugins: [createPersistedState()],
})
