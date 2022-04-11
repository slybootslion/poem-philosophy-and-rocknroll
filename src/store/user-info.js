import { defineStore } from "pinia";
import { reactive } from "vue";
import { StorageCache } from "../utils/tools";

export const useUserInfo = defineStore('userState', () => {
  const user = reactive({
    userInfo: {},
    token: StorageCache.get('token') || '',
    isLogin: false
  })

  function setUserInfo (userInfo) {
    user.userInfo = userInfo
  }

  function setIsLogin (value = true) {
    user.isLogin = value
  }

  function setToken (token) {
    user.token = token
  }

  function clearUserInfo () {
    user.token = ''
    user.isLogin = false
    user.userInfo = {}
    StorageCache.clear()
  }

  return { user, setUserInfo, setIsLogin, setToken, clearUserInfo }
})
