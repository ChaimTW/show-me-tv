import { createRouter, createWebHistory } from 'vue-router'
import TheHomePage from '../components/pages/TheHomePage.vue'
import TheWatchListPage from '../components/pages/TheWatchListPage.vue'
import TheShowDetailsPage from '../components/pages/TheShowDetailsPage.vue'
import TheSearchPage from '../components/pages/TheSearchPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/', component: TheHomePage },
    { path: '/details/:showId', component: TheShowDetailsPage, props: true },
    { path: '/watchlist', component: TheWatchListPage },
    { path: '/search', component: TheSearchPage },
    { path: "/:catchAll(.*)", redirect: "/" }
  ]
})

export default router