/**
 * 本地存储封装
 */

// 前缀
const prefix = 'fd';
// 默认有效时间2h
const defaultExpTime = 2 * 3600 * 1000;

export const storage = {
  /**
   * 组装key
   * @param {string} key key
   * @return {string} 组装后的key
   */
  key(key) {
    return [prefix, key].join('_');
  },

  /**
   * get 方法
   */
  get(key) {
    const getKey = storage.key(key);
    const dataJSON = window.localStorage.getItem(getKey);

    if (!dataJSON) return null;

    const data = JSON.parse(dataJSON);
    const { setTime, expTime, body } = data;

    // 如果过期，删除数据，返回null
    if (expTime !== false && Date.now() >= setTime + expTime) {
      storage.delete(key);
      return null;
    }

    return body;
  },

  /**
   * set 方法
   * @param {string}} key
   * @param {} val
   * @param {*} expTime
   */
  set(key, val, expTime) {
    const setKey = storage.key(key);
    const data = { setTime: Date.now(), body: val };

    // 过期时间
    if (expTime === false) data.expTime = false;
    else data.expTime = expTime || defaultExpTime;

    const dataJSON = JSON.stringify(data);
    window.localStorage.setItem(setKey, dataJSON);
  },

  /**
   * delete 方法
   * @param {string} key
   */
  delete(key) {
    const setKey = storage.key(key);

    window.localStorage.removeItem(setKey);
  },

  /**
   * clear 方法
   */
  clear() {
    window.localStorage.claer();
  }
};

export default {
  storage
};
