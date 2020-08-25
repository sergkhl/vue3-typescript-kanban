import { createRouter, createWebHistory } from 'vue-router'

interface RoutesType {
  path: string
  name: string
  component: () => {}
  meta?: {
    index?: number
    keepAlive?: boolean
  }
  children?: RoutesType[]
}

const routes: RoutesType[] = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Board',
        component: () =>
          import(/* webpackChunkName: "board" */ '../pages/board/index.vue'),
        meta: {
          index: 1,
          keepAlive: false,
        },
      },
      {
        path: 'board/:slug',
        name: 'Card',
        component: () =>
          import(/* webpackChunkName: "card" */ '../pages/board/_slug.vue'),
        meta: {
          index: 0,
          keepAlive: false,
        },
      },
    ],
  },
  // {
  //   path: '/notify',
  //   name: 'Notify',
  //   component: () =>
  //     import(/* webpackChunkName: "notify" */ '../views/notify/notify.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
