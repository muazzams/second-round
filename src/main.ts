import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from  './components/Home.vue';
import Login from  './components/Login.vue';


const router = createRouter({
  history: createWebHistory(),
  routes:  [
    { path: '/', component: Home },
    { path: '/login', component: Login },
  ]
})

const app = createApp(App)
  .use(router)
  .mount('#app');