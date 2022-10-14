<script setup>
import BackgroundImage from "@/pages/home/components/background-image.vue";
import { reactive } from "vue";
import { httpGetCaptcha, httpPostPwdLogin } from "@/pages/home/libs/httpUser";
import { getUuid, StorageCache } from "@/utils/tools";
import { useUserInfo } from "@/store/user-info";
import { useRouter } from "vue-router";
import { useHomeState } from "@/store/home-theme";

const router = useRouter()
const { setUserInfo, setIsLogin, setToken, user } = useUserInfo()
if (user.isLogin) router.back()

const formData = reactive({
  username: '',
  password: '',
  captcha: ''
})
const captchaData = reactive({ text: '', captcha: '', loading: true })
const getCaptcha = async () => {
  captchaData.loading = true
  const res = await httpGetCaptcha()
  captchaData.loading = false
  captchaData.captcha = res.captcha
  captchaData.text = res.text
}
getCaptcha()

const { changeTimeState } = useHomeState()
const login = async () => {
  const data = { ...formData }
  data.uuid = getUuid()
  const res = await httpPostPwdLogin(data)
  if (res && res.token) {
    setUserInfo(res.user)
    setToken(res.token)
    setIsLogin()
    StorageCache.set('token', res.token)
    StorageCache.set('userInfo', JSON.stringify(res.user))
    changeTimeState(true)
    await router.replace({ name: 'home' })
  }
}
</script>

<template>
  <background-image />
  <div class="container">
    <div class="board centerXY">
      <div
        v-if="captchaData.text"
        style="width: 20px;height: 20px;position:absolute;top: 0;left: 0;"
        @click="formData.captcha = captchaData.text"
      />
      <var-form ref="form">
        <var-space direction="column" :size="[14, 0]">
          <var-input
            placeholder="用户名"
            :rules="[v => !!v || '用户名不能为空']"
            v-model="formData.username"
          />
          <var-input
            type="password"
            placeholder="密码"
            :rules="[v => !!v || '密码不能为空']"
            v-model="formData.password"
          />
          <div style="position:relative;">
            <var-input
              placeholder="验证码"
              :rules="[v => !!v || '验证码不能为空']"
              v-model="formData.captcha"
            />
            <var-loading type="circle" :loading="captchaData.loading">
              <div class="captcha-img">
                <img :src="captchaData.captcha" @click="getCaptcha">
              </div>
            </var-loading>
          </div>
        </var-space>
      </var-form>
      <var-button class="btn" block type="primary" @click="login">
        登 录
      </var-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/style/index';

.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .board {
    width: p2r(400);
    height: p2r(300);
    background-color: #fff;
    border-radius: p2r(20);
    padding: p2r(20) p2r(40);
    box-sizing: border-box;
  }

  .btn {
    margin-top: p2r(20);
  }

  .captcha-img {
    width: 80px;
    height: 46px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>
