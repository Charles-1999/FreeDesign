import Vue from 'vue';
import App from './App.vue';

// 路由
import routerFn from './router';
import { routerTitle } from './plugins/router.plugins';

// vuex
import store from './store';

// config
import config from '@config';

// utils
import http from '@utils/http.service';
import { storage } from '@utils/localStorage.service';

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Animate.css
import 'animate.css';

// styles
import './assets/styles/index.less';

// lib components
import libComponents from './components/lib';
// common components
import commonComponents from './components/common';

Vue.use(libComponents);
Vue.use(commonComponents);

Vue.use(ElementUI);

const pagesRouters = require.context(
  './views', true, /router\.js$/
);

const router = routerFn({ pagesRouters });
routerTitle(router);

Vue.config.productionTip = false;

// init define
Object.defineProperties(Vue.prototype, {
  $http: {
    value: http,
    writable: false
  },
  $storage: {
    value: storage,
    writable: false
  },
  $config: {
    value: config,
    writable: false
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
