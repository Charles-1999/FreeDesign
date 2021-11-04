/*
 * @Author: your name
 * @Date: 2021-11-04 17:20:08
 * @LastEditTime: 2021-11-04 23:28:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /FreeDesign/src/apis/login.js
 */
import http from '../utils/http.service';

export const UserRegiser = params => http.get('/api/register/email', params);

export const UserLogin = params => http.get('/api/login/email', params);

export const VaildCode = params => http.get('/api/email/code', params);
