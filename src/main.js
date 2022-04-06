import { createApp } from 'vue'
import router from './router.js'
import store from './store'
import App from './App.vue'

// TODO: alias
import './main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
