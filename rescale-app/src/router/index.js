import { createRouter, createWebHistory } from 'vue-router'
import Rescaler from '../views/Rescaler.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rescaler',
      component: Rescaler
    }
  ]
})

export default router
