import store from '@/store';

export const routerHandler = router => {
  router.beforeEach(async (to, from, next) => {
    const loginStatus = await checkLogin(to);
    console.log(loginStatus);
    if (loginStatus) {
      next('/login');
      return;
    }
    changeTitle(to);
    next();
  });
};

/**
 * 修改网页标题
 */
const changeTitle = to => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
};

/**
 * 判断是否需要登录
 * @returns {Boolean} true表示需要登录
 */
const checkLogin = async to => {
  if (!to.meta.needLogin) return false;
  if (store.getters.isLogged) return false;
  await store.dispatch('getMe');
  if (store.getters.isLogged) return false;
  return true;
};
