// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

Vue.use(VueI18n)

const messages = {
  en: require('../static/lang/en'),
  zh: require('../static/lang/zh')
}
const i18n = new VueI18n({
  locale: 'zh',
  messages: messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
