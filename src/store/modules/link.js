const state = {
  linkShowList: [],
}

const mutations = {
  SET_LINK_SHOW_LIST (state, list) {
    state.linkShowList = list
  },
}

const actions = {
  setLinkShowListAction ({ commit }, list) {
    commit('SET_LINK_SHOW_LIST', list)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
