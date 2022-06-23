import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: '/manage-starships',
      name: 'manageStarships',
      component: () => import('../views/ManageStarshipsView.vue'),
      meta: {
        title: 'Manage your Starships'
      },
      children: [
        {
          path: 'create',
          component: () => import('../views/ManageStarshipsView.vue'),
          meta: {
            title: 'Create a Starship'
          }
        }
      ]
    }
  ]
})

// Changes the page title everytime we access a new page
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Starship Game`;
  next();
});

export default router
