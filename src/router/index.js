import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import server from '../../static/common'
Vue.use(Router)
const routers = [
  {
    path: '/',
    component: Home,
    meta: {requireLogin: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {requireLogin: true}
  }
]

const router = new Router({
  routes: routers,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  const { name, meta } = to
  const { requireLogin } = meta
  if (name === 'login' && (sessionStorage.getItem('auth') === server.auth)) {
    return next({
      name: 'home'
    })
  } else {
    const needLogin = requireLogin && (sessionStorage.getItem('auth') !== server.auth)
    if (needLogin) {
      return next({
        name: 'login',
        params: {back: to}
      })
    }
  }
  return next()
})

// function loginSuccess () {
//   const { params: { back } } = this.$route
//   const route = back || {name: 'home'}
//   const { name, params, query } = route
//   this.$router.replace({ name, params, query })
// }

export default router
