const Koa = require('koa');
const httpRequest = require('./request');

const app = new Koa();

const port = '8085';
const host = '0.0.0.0';

app.use(async ctx => {
  httpRequest();
  ctx.body = 'Hello World';
});

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
