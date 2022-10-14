import { createRouter, createWebHashHistory } from 'vue-router'

import home from '../pages/home/home.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: home,
    meta: {
      title: '最好的起始页网站',
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../pages/login/login.vue'),
    meta: {
      title: '用户名密码登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  document.title = `诗歌、哲学与摇滚乐 | ${to.meta.title}`
})

export default router
