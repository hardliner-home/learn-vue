import MainPage from '@/pages/MainPage'
import PostsPage from '@/pages/PostsPage'
import PostPage from '@/pages/PostPage'
import PostWithStorePage from '@/pages/PostWithStorePage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostPage
  },
  {
    path: '/store',
    component: PostWithStorePage
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
