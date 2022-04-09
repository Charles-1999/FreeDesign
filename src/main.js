import Vue from 'vue';
import App from './App.vue';

// 路由
import routerFn from './router';
import { routerHandler } from './plugins/router.plugin';

// vuex
import store from './store';

// config
import config from '@config';

// utils
import http from '@utils/http.service';
import { storage } from '@utils/localStorage.service';

// ElementUI
import ElementUI from 'element-ui';

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
routerHandler(router, store);

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
