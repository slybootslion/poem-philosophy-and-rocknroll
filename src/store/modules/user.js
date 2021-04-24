const state = {
  token: 'abc',
  userInfo: {},
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
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
