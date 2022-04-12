import { defineStore } from "pinia";
import { reactive } from "vue";
import { StorageCache } from "../utils/tools";

export const useUserInfo = defineStore('userState', () => {

  const initUserInfo = () => {
    const userInfo = StorageCache.get('userInfo')
    if (!userInfo) return {}
    return JSON.parse(userInfo)
  }

  const user = reactive({
    userInfo: initUserInfo(),
    token: StorageCache.get('token') || '',
    isLogin: !!StorageCache.get('token')
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
