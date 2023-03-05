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

// Create Vue app instance
const app = createApp(App)

// Plugins
app.use(store)
app.use(router)

// Global components
app.component('pulse-loader', PulseLoader);
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount Vue app
app.mount('#app')
