import { RouteRecordRaw, RouterView } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/admin',
  component: RouterView,
  meta: {
    title: '管理员',
    icon: 'Avatar'
  },
  children: [
    {
      path: '/admin/add',
      name: 'AddAdmin',
      component: () => import('@/views/admin/AdminAdd.vue'),
      meta: {
        title: '添加管理员'
      }
    },
    {
      path: '/admin/edit',
      name: 'EditAdmin',
      component: () => import('@/views/admin/AdminAdd.vue'),
      meta: {
        title: '编辑管理员'
      }
    }
  ]
}

export default route
