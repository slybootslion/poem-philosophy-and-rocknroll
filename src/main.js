import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css/normalize.css'
import './assets/style/index.scss'
import './assets/iconfont/iconfont.scss'
import { initVarletUI } from "./utils/varlet-ui";
import { pinia } from "./store";

const app = createApp(App)
initVarletUI(app)
app.use(router).use(pinia).mount('#app')
