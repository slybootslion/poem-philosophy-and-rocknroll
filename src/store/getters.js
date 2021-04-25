const getters = {
  isLogin: state => !!state.user.token,
  isPageLoading: state => state.sys.isLoading,
}

export default getters
