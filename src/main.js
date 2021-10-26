import Vue from 'vue';
import App from './App.vue';
import routerFn from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// lib components
import libComponents from './components/lib';
import commonComponents from './components/common';
Vue.use(libComponents);
Vue.use(commonComponents);
Vue.use(ElementUI);

const pagesRouters = require.context(
  './views', true, /router\.js$/
);

const router = routerFn({ pagesRouters });
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
