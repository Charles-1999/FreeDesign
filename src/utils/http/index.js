/*
 * @Author: your name
 * @Date: 2021-11-05 00:07:22
 * @LastEditTime: 2021-11-05 00:12:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /FreeDesign/src/utils/http/index.js
 */

import axios from './http.service';

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
