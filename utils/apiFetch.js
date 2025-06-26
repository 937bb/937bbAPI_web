/*
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-23 08:44:15
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-27
 */
// 封装通用请求方法，自动拼接 baseUrl，支持 get/post
// 通过环境变量获取 baseUrl，兼容 Nuxt3/前端

import storage from './storage';

const baseUrl = import.meta.env.VITE_BASE_URL || process.env.VITE_BASE_URL || ''

export async function $apiFetch(path, options = {}) {
  // 支持 path 以 / 开头
  const url = path.startsWith('http') ? path : baseUrl + path
  
  // 添加认证token（如果存在）
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  const token = storage.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // 处理请求体
  let body = options.body;
  if (body && typeof body !== 'string') {
    body = JSON.stringify(body);
  }
  
  try {
    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      ...(body ? { body } : {})
    });
    
    // 处理 401 未授权
    if (res.status === 401) {
      storage.removeToken();
      storage.removeItem('user');
      window.location.href = '/user/login';
      return Promise.reject(new Error('登录已过期，请重新登录'));
    }
    
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      const error = new Error(data.msg || `请求失败: ${res.status}`);
      error.status = res.status;
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('API请求出错:', error);
    throw error;
  }
}
