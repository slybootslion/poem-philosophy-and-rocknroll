const getters = {
  isLogin: state => !!state.user.token,
  isPageLoading: state => state.sys.isLoading,
  isAutoNightModel: state => state.sys.autoNightModel,
  isNightModel: state => state.sys.nightModel,
  isNight: state => state.sys.night,
}

export default getters
