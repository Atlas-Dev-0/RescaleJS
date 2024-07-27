import { createRouter, createWebHistory } from 'vue-router'
import RescalerJs from '../views/RescalerJs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rescaler',
      component: RescalerJs
    }
  ]
})

export default router
