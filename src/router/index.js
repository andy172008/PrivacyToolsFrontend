import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

// 定义静态路由
export const constantRoutes = [
  {
    path: '/',
    children: [
      {
        path: '',
        component: ()=> import('@/views/privacytools/privacytools.vue'),
        name: 'privacytools',
        meta: { 
          title: 'PrivacyTools' ,
          icon: 'star' ,
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/test.vue'),
        name: 'test',
        meta: { title: 'test', icon: 'dashboard' }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
