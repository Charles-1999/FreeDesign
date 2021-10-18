import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // 首页
  // {
  //   path: '/',
  //   name: 'Index',
  //   component: Index
  // },
  {
    path: '/home',
    component: () => import('../views/home/Index.vue'),
    children: [
      // 项目列表
      {
        path: '',
        name: 'ProjectList',
        component: () => import('../views/project-list/Index.vue')
      },
      {
        // 模板库
        path: 'template-list',
        name: 'TemplateList',
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
    redirect: '/home'
  },
  {
    path: '*',
    component: () => import('../views/not-found/Index.vue')
  }
];

export default (options:any = {}):any => {
  const { pagesRouters } = options;
  console.log(`pagesRouters: ${pagesRouters}`);
  return new VueRouter({
    routes: [
      ...routes
    ]
  });
};
