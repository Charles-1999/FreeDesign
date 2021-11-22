// src/routes.ts
import Router from '@koa/router';

import AuthController from './controllers.js';

const router = new Router();

// auth 相关的路由
router.post('/auth/getInfo', AuthController.getInfo);

export default router;
