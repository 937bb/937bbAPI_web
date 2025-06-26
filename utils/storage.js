/**
 * 本地存储工具类
 * 提供对 localStorage 的封装，处理 JSON 序列化和错误处理
 */

/**
 * 存储组合式函数
 * @returns {Object} 存储操作方法
 */
export function useStorage() {
  /**
   * 获取存储项
   * @param {string} key - 存储键名
   * @param {*} defaultValue - 默认值（可选）
   * @returns {*|null} 存储的值或默认值
   */
  const getItem = (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return defaultValue;
    }
  };

  /**
   * 设置存储项
   * @param {string} key - 存储键名
   * @param {*} value - 要存储的值（会自动进行 JSON 序列化）
   * @returns {boolean} 是否设置成功
   */
  const setItem = (key, value) => {
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
      return true;
    } catch (error) {
      console.error(`Error setting item to localStorage: ${error}`);
      return false;
    }
  };

  /**
   * 移除存储项
   * @param {string} key - 要移除的键名
   * @returns {boolean} 是否移除成功
   */
  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
      return false;
    }
  };

  /**
   * 清空所有存储项
   * @returns {boolean} 是否清空成功
   */
  const clear = () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
      return false;
    }
  };

  /**
   * 获取 token
   * @returns {string} 返回存储的 token 或空字符串
   */
  const getToken = () => getItem('token') || '';

  /**
   * 设置 token
   * @param {string} token - 要存储的 token
   * @returns {boolean} 是否设置成功
   */
  const setToken = (token) => setItem('token', token);

  /**
   * 移除 token
   * @returns {boolean} 是否移除成功
   */
  const removeToken = () => removeItem('token');

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    getToken,
    setToken,
    removeToken
  };
}

// 保持向后兼容的默认导出
const storage = useStorage();
export default storage;
