// import axios from 'axios';
// import { showMessage } from './message.service';

import axios from 'axios';

// axios 实例
const instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  },
  timeout: 50000,
  withCredentials: true
});

export default instance;
