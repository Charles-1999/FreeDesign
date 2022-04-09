// import Koa from 'koa';
// import cors from '@koa/cors';
// import bodyParser from 'koa-bodyparser';
// import { logger } from './src/logger.js';
// import router from './src/routes.js';
// import views from 'koa-views';
// import path from 'path';

const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const logger = require('./src/logger');
const router = require('./src/routes');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

// 初始化 Koa 应用实例
const app = new Koa();
// 注册中间件
app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(koaStatic(path.resolve(__dirname, './public')));
// 响应用户请求
app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}));
app.use(router.routes()).use(router.allowedMethods());

// 运行服务器
app.listen(3007);

// const Koa = require('koa');
// const views = require('koa-views');
// const path = require('path');
// const app = new Koa();

// // 加载模板引擎
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }));

// app.use(async (ctx) => {
//   const title = 'hello koa2';
//   await ctx.render('index', {
//     title
//   });
// });

// app.listen(3000);
