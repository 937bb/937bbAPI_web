/**
 * @file 封装通用请求方法
 * @description 自动处理 baseUrl、认证、错误处理和加载状态
 */

import storage from './storage';
import { useLoading } from '../composables/useLoading';
import { useMessage } from '../composables/useMessage';

// 基础URL
const baseUrl = import.meta.env.VITE_BASE_URL || process.env.VITE_BASE_URL || '';

// 不需要显示加载状态的接口路径
const EXCLUDE_LOADING_PATHS = [
  '/api/auth/checkToken',
  '/api/web/getTodayStatistics',
  '/api/web/getApiList',
  '/api/web/getUserList'
];

// 是否应该显示加载状态
function shouldShowLoading(path) {
  return !EXCLUDE_LOADING_PATHS.some(p => path.includes(p));
}

/**
 * 封装的 fetch 请求方法
 * @param {string} path - 请求路径
 * @param {Object} options - 请求选项
 * @returns {Promise<any>} 返回 Promise 对象
 */
export async function $apiFetch(path, options = {}) {
  // 支持 path 以 http 开头
  const url = path.startsWith('http') ? path : (baseUrl + path);
  const showLoading = shouldShowLoading(path);
  const { startLoading, finishLoading } = useLoading();
  
  // 添加认证 token（如果存在）
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  const token = storage.getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // 处理请求体
  let body = options.body;
  if (body && typeof body !== 'string') {
    body = JSON.stringify(body);
  }
  
  // 显示加载状态
  if (showLoading) {
    startLoading(options.loadingText || '加载中...');
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
    
    const res = await fetch(url, {
      ...options,
      method: (options.method || 'GET').toUpperCase(),
      headers,
      ...(body ? { body } : {}),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // 处理 401 未授权
    if (res.status === 401) {
      storage.removeToken();
      storage.removeItem('user');
      window.location.href = '/user/login?redirect=' + encodeURIComponent(window.location.pathname);
      throw new Error('登录已过期，请重新登录');
    }
    
    // 处理响应
    const data = await res.json();
    
    // 如果返回状态码不是 200，抛出错误
    if (res.status !== 200) {
      throw new Error(data.message || `请求失败: ${res.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('API 请求错误:', error);
    
    // 处理不同类型的错误
    let errorMessage = '请求失败';
    
    if (error.name === 'AbortError') {
      errorMessage = '请求超时，请检查网络连接';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = '网络连接失败，请检查网络设置';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // 显示错误提示
    if (process.client) {
      console.error('API Error:', errorMessage);
      try {
        const { error } = useMessage();
        error(errorMessage);
      } catch (e) {
        console.error('Failed to show error message:', e);
      }
    }
    
    throw new Error(errorMessage);
  } finally {
    // 确保总是关闭加载状态
    if (showLoading) {
      finishLoading();
    }
  }
}
