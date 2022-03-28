// src/routes.ts
// import Router from '@koa/router';

// import AuthController from './controllers.js';
const AuthController = require('./controllers');
const Router = require('@koa/router');

const router = new Router();

// auth 相关的路由
router.post('/auth/getInfo', AuthController.getInfo);
router.get('/auth/view/:id', AuthController.view);

// export default router;
module.exports = router;
