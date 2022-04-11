import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css/normalize.css'
import './assets/style/index.scss'
import './assets/iconfont/iconfont.scss'
import { createPinia } from 'pinia'
import { initVarletUI } from "./utils/varlet-ui";

const app = createApp(App)
initVarletUI(app)
app.use(router).use(createPinia()).mount('#app')
