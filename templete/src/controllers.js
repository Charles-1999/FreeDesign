// import axios from '../utils/request.js';
const axios = require('axios');

async function getInfo(ctx) {
  const data = 121;
  // await axios
  //   .post('http://120.24.151.34:8000/account/login/email', {
  //     email: '895530239@qq.com',
  //     password: 'htc1382980123'
  //   })
  //   .then(async res => {
  //     // console.log(res.headers['set-cookie']);
  //     await axios.get(`http://120.24.151.34:8000/page/${ctx.request.body.id}`, {
  //       headers: {
  //         Cookie: res.headers['set-cookie']
  //       }
  //     }).then(async (res) => {
  //       data = res.data;
  //     });
  //   });
  console.log(ctx.request.body.id, ctx.request.body.value);
  ctx.body = data;
}

async function view(ctx) {
  const data = await axios.get(`http://120.24.151.34:8000/view/${ctx.params.id || 36}`);
  const pageDataFree = data.data;
  const pageMode = {
    h5: 'h5-swiper',
    longPage: 'h5-long',
    relativePage: 'h5-relative',
    pc: 'pc'
  };
  ctx.status = 200;
  await ctx.render(pageMode.h5, { pageDataFree: pageDataFree });
}
async function register(ctx) {
  ctx.body = 'Register controller';
}

const AuthController = {};
AuthController.getInfo = getInfo;
AuthController.register = register;
AuthController.view = view;

module.exports = AuthController;
