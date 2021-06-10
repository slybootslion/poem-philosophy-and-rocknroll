const state = {
  themeShowList: [],
  changeBgTime: 3,
}

const mutations = {
  SET_THEME_SHOW_LIST (state, list) {
    state.themeShowList = list
  },
  SET_CHANGE_BG_TIME (state, time) {
    state.changeBgTime = time
  },
}

const actions = {
  setThemeShowListAction ({ commit }, list) {
    commit('SET_THEME_SHOW_LIST', list)
  },
  setChangeBgTimeAction ({ commit }, time) {
    commit('SET_CHANGE_BG_TIME', time)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
