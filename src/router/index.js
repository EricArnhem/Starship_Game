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
      path: '/manage-starships',
      name: 'manageStarships',
      component: () => import('../views/ManageStarshipsView.vue'),
      children: [
        {
          path: 'create',
          component: () => import('../views/ManageStarshipsView.vue')
        }
      ]
    }
  ]
})

export default router
