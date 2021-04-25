const state = {
  isLoading: true,
}

const mutations = {
  SET_LOADING (state, status) {
    state.isLoading = status
  },
}

const actions = {
  setIsLoadingActions ({ commit }, status) {
    commit('SET_LOADING', status)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
