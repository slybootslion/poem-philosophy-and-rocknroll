import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css/normalize.css'
import './assets/style/index.scss'
import './assets/iconfont/iconfont.scss'

const app = createApp(App)

app.use(router).mount('#app')
