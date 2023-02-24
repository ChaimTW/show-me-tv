import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import router from './router/router.js'
import store from './store/mainStore'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import '../public/styles.css'

library.add(fas)
const app = createApp(App)
app.use(store)
app.use(router)
app.component('pulse-loader', PulseLoader);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
