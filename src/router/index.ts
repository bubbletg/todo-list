import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
// import admin from './modules/admin'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/HomeIndex.vue'),
        meta: {
          title: '待办',
          icon: 'icon-todo_list'

        }
      },
      {
        path: '/concentration',
        name: 'Concentration',
        component: () => import('@/views/concentration/ConcentrationIndex.vue'),
        meta: {
          title: '专注',
          icon: 'icon-gongjulan_dingshi'

        }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/HomeIndex.vue'),
        meta: {
          title: '统计',
          icon: 'icon-tongjifenxi'

        }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/HomeIndex.vue'),
        meta: {
          title: '个人',
          icon: 'icon-geren'

        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginIndex.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
    // 每个路由都必须声明
    requiresAuth?: boolean
    // 标题
    title?: string,
    // 图标
    icon?: string
  }
}
