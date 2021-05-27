import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '最好的起始页网站',
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/home'),
  },
  {
    path: '/link-setting',
    name: 'LinkSetting',
    meta: {
      title: '链接设置',
    },
    component: () => import(/* webpackChunkName: "link-setting" */ '@/views/link-setting/link-setting'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于',
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/about'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = `诗歌、哲学与摇滚乐 | ${to.meta.title}`
})

export default router
