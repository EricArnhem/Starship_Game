import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/create-starship',
      name: 'createStarship',
      component: () => import('../views/CreateStarshipView.vue')
    },
    {
      path: '/remove-starship',
      name: 'removeStarship',
      component: () => import('../views/RemoveStarshipView.vue')
    }
  ]
})

export default router
