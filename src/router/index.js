import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
Vue.use(Router)
const routers = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new Router({
  routes: routers
})

// router.beforeEach(async (to, from, next) => {
//   const { name, meta } = to
//   const { requireLogin } = meta
//   if (name === 'login') {
//     return next()
//   }
//   const needLogin = requireLogin && !store.getters.user.isLogin
//   if (needLogin) {
//     return next({
//       name: 'login',
//       params: {back: to}
//     })
//   }
//   return next()
// })

// function loginSuccess () {
//   const { params: { back } } = this.$route
//   const route = back || {name: 'home'}
//   const { name, params, query } = route
//   this.$router.replace({ name, params, query })
// }

export default router
