import axios from '../utils/request.js';

async function getInfo(ctx) {
  let data = 121;
  await axios
    .post('http://120.24.151.34:8000/account/login/email', {
      email: '895530239@qq.com',
      password: 'htc1382980123'
    })
    .then(async res => {
      // console.log(res.headers['set-cookie']);
      await axios.get(`http://120.24.151.34:8000/page/${ctx.request.body.id}`, {
        headers: {
          Cookie: res.headers['set-cookie']
        }
      }).then(async (res) => {
        data = res.data;
      });
    });
  ctx.body = data;
}

async function register(ctx) {
  ctx.body = 'Register controller';
}

const AuthController = {};
AuthController.getInfo = getInfo;
AuthController.register = register;

export default AuthController;
