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
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Index.vue')
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
        path: '/home',
        name: 'ProjectList',
        meta: {
          title: '项目列表',
          needLogin: true
        },
        component: () => import('../views/project-list/Index.vue')
      },
      {
        // 模板库
        path: 'my-template',
        name: 'MyTemplate',
        meta: {
          title: '我的模板',
          needLogin: true
        },
        component: () => import('../views/my-template/Index.vue')
      },
      {
        // 模板库
        path: 'template-list',
        name: 'TemplateList',
        meta: {
          title: '模板市场',
          needLogin: true
        },
        component: () => import('../views/template-list/Index.vue')
      }
    ]
  },
  {
    path: '/editor',
    name: 'Editor',
    meta: {
      needLogin: true
    },
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
