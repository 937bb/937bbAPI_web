/**
 * 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {number} wait 等待时间，单位毫秒
 * @param {boolean} immediate 是否立即执行
 * @returns {Function} 返回防抖后的函数
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout = null;
  
  return function(...args) {
    const context = this;
    
    // 清除之前的定时器
    if (timeout) clearTimeout(timeout);
    
    // 如果是立即执行
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      // 非立即执行
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 带加载状态的防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {Object} loadingRef 响应式加载状态引用
 * @param {number} wait 等待时间，单位毫秒
 * @returns {Promise<Function>} 返回防抖后的异步函数
 */
export function asyncDebounce(func, loadingRef, wait = 300) {
  let timeout = null;
  
  return function(...args) {
    return new Promise((resolve, reject) => {
      if (loadingRef.value) return;
      
      loadingRef.value = true;
      
      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(async () => {
        try {
          const result = await func.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          loadingRef.value = false;
        }
      }, wait);
    });
  };
}
