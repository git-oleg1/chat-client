// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          default: () => import(/* webpackChunkName: "chat" */ '@/views/Chat.vue'),
          navigation: () => import(/* webpackChunkName: "room-list" */ '@/views/RoomsList.vue'),
        },
      },
    ],
  },
  {
    path: '/playground',
    components: {
      default: () => import('@/layouts/playground/Playground.vue'),
    },
    children: [
      {
        path: 'user',
        name: 'Playground-User',
        components: {
          default: () => import(/* webpackChunkName: "playground_users-view" */ '@/views/playground/UsersView.vue'),
          navigation: () => import(/* webpackChunkName: "playground_navigation" */ '@/views/playground/Navigation.vue'),
        },
      },
      {
        path: 'chat',
        name: 'Playground-Chat',
        components: {
          default: () => import(/* webpackChunkName: "playground_chat-view" */ '@/views/playground/ChatsView.vue'),
          navigation: () => import(/* webpackChunkName: "playground_navigation" */ '@/views/playground/Navigation.vue'),
        },
      },
      {
        path: 'socket',
        name: 'Playground-Socket',
        components: {
          default: () => import(/* webpackChunkName: "playground_socket-view" */ '@/views/playground/SocketsView.vue'),
          navigation: () => import(/* webpackChunkName: "playground_navigation" */ '@/views/playground/Navigation.vue'),
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
