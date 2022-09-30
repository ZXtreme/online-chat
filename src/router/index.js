import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/router/MainPage.vue'
import AlterInfo from '@/router/AlterInfo.vue'
import ChatBox from '@/router/ChatBox.vue'
import GlobalContainer from '@/router/GlobalContainer.vue'
import GlobalLogin from '@/router/GlobalLogin.vue'
import GlobalRegister from '@/router/GlobalRegister.vue'
import AddFriend from '@/router/AddFriend.vue'
import DeleteFriend from '@/router/DeleteFriend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main',
    components: {
      app: GlobalContainer
    },
    children: [
      { path: 'main', component: MainPage },
      { path: 'alter', component: AlterInfo },
      {
        path: 'chat',
        component: ChatBox,
        beforeEnter: (to, from, next) => {
          if (router.app.$options.store.state.receiver.account === 0) next('/main')
          else next()
        }
      },
      { path: 'add', component: AddFriend },
      { path: 'delete', component: DeleteFriend }
    ]
  },
  {
    path: '/login',
    components: {
      app: GlobalLogin
    }
  },
  {
    path: '/register',
    components: {
      app: GlobalRegister
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    const token = localStorage.getItem(router.app.$options.store.state.self.account)
    if (token) next()
    else next('/login')
  }
})

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
