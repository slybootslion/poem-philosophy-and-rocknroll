import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '诗歌、哲学与摇滚乐 | 最好的起始页网站',
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/home'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '诗歌、哲学与摇滚乐 | 关于',
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/about'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = to.meta.title
})

export default router
