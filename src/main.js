import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import VueCookies from 'vue-cookies';

createApp(App).use(VueCookies).mount('#app');
