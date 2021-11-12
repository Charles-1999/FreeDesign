export const routerHandler = (router, store) => {
  // 鉴权判断
  router.beforeEach(async (to, from, next) => {
    // 1. 如果路由不需要登录态，跳过
    if (!to.meta.needLogin) {
      next();
      return;
    }

    // 2. 直接通过接口鉴权
    // 鉴权失败跳到登录页面
    try {
      await store.dispatch('auth/getMe');
    } catch (err) {
      next({
        name: 'Login',
        query: {
          needRedirect: to
        }
      });
    }

    // 3. 执行跳转
    next();
  });

  // 修改网页标题
  router.beforeEach(async (to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }

    // 执行跳转
    next();
  });
};
