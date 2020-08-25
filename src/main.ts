import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vconsole from 'vconsole'
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  new Vconsole()
}

const app = createApp(App as any)
app.use(router)
app.mount('#app')
