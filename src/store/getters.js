const getters = {
  isLogin: state => !!state.user.token,
}

export default getters
