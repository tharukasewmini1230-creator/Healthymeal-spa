import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import WeeklyPlan from '../views/WeeklyPlan.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/favorites', name: 'favorites', component: FavoritesView },
    { path: '/weekly', name: 'weekly', component: WeeklyPlan }
  ]
})

export default router