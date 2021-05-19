const state = {
  themeShowList: [],
}

const mutations = {
  SET_THEME_SHOW_LIST (state, list) {
    state.themeShowList = list
  },
}

const actions = {
  setThemeShowListAction ({ commit }, list) {
    commit('SET_THEME_SHOW_LIST', list)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
