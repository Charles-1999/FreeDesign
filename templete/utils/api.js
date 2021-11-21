import axios from './request';

axios
  .post('http://120.24.151.34:8000/account/login/email', {
    email: '895530239@qq.com',
    password: 'htc1382980123'
  })
  .then(res => {
    // console.log(res.headers['set-cookie']);
    axios.get('http://120.24.151.34:8000/account/me', {
      headers: {
        Cookie: res.headers['set-cookie']
      }
    }).then((res) => {
      console.log(res.data);
    });
    // console.log(res);
  });
