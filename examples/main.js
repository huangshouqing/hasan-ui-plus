import { createApp } from 'vue'
import App from './App.vue'
import hNotice from '../packages/notice/index.js'
import hMessage from '../packages/message/index.js'
const app = createApp(App)
app.use(hNotice)
app.use(hMessage)
app.mount('#app')
