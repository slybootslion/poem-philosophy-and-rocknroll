const state = {
  isLoading: true,
  autoNightModel: true,
  nightModel: false,
  night: true,
}

const mutations = {
  SET_LOADING (state, status) {
    state.isLoading = status
  },
  SET_AUTO_NIGHT_MODEL (state, status) {
    state.autoNightModel = status
  },
  SET_NIGHT_MODEL (state, status) {
    state.nightModel = status
  },
  SET_NIGHT (state, status) {
    state.night = status
  },
}

const actions = {
  setIsLoadingAction ({ commit }, status) {
    commit('SET_LOADING', status)
  },
  setAutoNightAction ({ commit }, status) {
    commit('SET_AUTO_NIGHT_MODEL', status)
  },
  setNightAction ({ commit }, status) {
    commit('SET_NIGHT_MODEL', status)
  },
  nightAction ({ commit }, status) {
    commit('SET_NIGHT', status)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
