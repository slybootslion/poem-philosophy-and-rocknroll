const getters = {
  isLogin: state => !!state.user.token,
  userInfo: state => state.user.userInfo,
  isPageLoading: state => state.sys.isLoading,
  isAutoNightModel: state => state.sys.autoNightModel,
  isNightModel: state => state.sys.nightModel,
  isNight: state => state.sys.night,
}

export default getters
