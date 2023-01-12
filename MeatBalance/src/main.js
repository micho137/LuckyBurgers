// Components
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia';
// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios';

const pinia = createPinia().use(piniaPluginPersistedstate)
const app = createApp(App).use(pinia).use(router).use(VueSweetalert2)

registerPlugins(app)

app.mount('#app')

