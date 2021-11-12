import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // 首页
  // {
  //   path: '/',
  //   name: 'Index',
  //   component: Index
  // },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录页'
    },
    component: () => import(/* webpackChunkName: "editor" */ '../views/login/Index.vue')
  },
  {
    path: '/home',
    component: () => import('../views/home/Index.vue'),
    meta: {
      needLogin: true
    },
    children: [
      // 项目列表
      {
        path: '',
        name: 'ProjectList',
        meta: {
          title: '项目列表',
          needLogin: true
        },
        component: () => import('../views/project-list/Index.vue')
      },
      {
        // 模板库
        path: 'template-list',
        name: 'TemplateList',
        meta: {
          title: '模板库',
          needLogin: true
        },
        component: () => import('../views/template-list/Index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "editor" */ '../views/editor/Index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    component: () => import('../views/not-found/Index.vue')
  }
];

export default (options) => {
  const { pagesRouters } = options;
  console.log(`pagesRouters: ${pagesRouters}`);
  return new VueRouter({
    routes: [
      ...routes
    ]
  });
};
