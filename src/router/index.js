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
    path: '/',
    name: 'Index',
    meta: {
      title: 'Free Design'
    },
    component: () => import(/* webpackChunkName: "Index" */ '../views/index/Index.vue')
  },
  {
    path: '/home',
    redirect: '/home/template-list',
    component: () => import('../views/home/Index.vue'),
    children: [
      // 工作台
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: '工作台',
          needLogin: true
        },
        component: () => import('../views/dashboard/Index.vue')
      },
      // 我的作品
      {
        path: 'projectList',
        name: 'ProjectList',
        meta: {
          title: '我的作品',
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
          title: '模板市场'
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
