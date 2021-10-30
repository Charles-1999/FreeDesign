import Vue from 'vue';
import App from './App.vue';

import routerFn from './router';

import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

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
  './views', true, /router\.ts$/
);

const router = routerFn({ pagesRouters });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
