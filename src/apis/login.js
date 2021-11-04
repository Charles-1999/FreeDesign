/*
 * @Author: your name
 * @Date: 2021-11-04 17:20:08
 * @LastEditTime: 2021-11-05 00:09:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /FreeDesign/src/apis/login.js
 */
import { get, post } from '../utils/http/index';

export const UserRegiser = params => get('/api/account/register/email', params);

export const UserLogin = params => post('/api/account/login/email', params);

export const VaildCode = params => get('/api/account/email/code', params);
