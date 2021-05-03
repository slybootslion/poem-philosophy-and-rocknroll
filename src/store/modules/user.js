const state = {
  token: '',
  userInfo: {},
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  REMOVE_USER_DATA () {
    state.token = ''
    state.userInfo = {}
  },
}

const actions = {
  setTokenAction ({ commit }, data) {
    commit('SET_TOKEN', data)
  },

  setUserInfoAction ({ commit }, data) {
    commit('SET_USER_INFO', data)
  },

  removeUserDataAction ({ commit }) {
    commit('REMOVE_USER_DATA')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
