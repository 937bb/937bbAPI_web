// 封装通用请求方法，自动拼接 baseUrl，支持 get/post
// 通过环境变量获取 baseUrl，兼容 Nuxt3/前端
const baseUrl = import.meta.env.VITE_API_BASE || process.env.VITE_API_BASE || ''

export async function $apiFetch(path, options = {}) {
  // 支持 path 以 / 开头
  const url = path.startsWith('http') ? path : baseUrl + path
  // 默认 get
  const method = options.method || 'GET'
  const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {})
  let body = options.body
  if (body && typeof body !== 'string') {
    body = JSON.stringify(body)
  }
  const fetchOptions = {
    method,
    headers,
    ...(method !== 'GET' && body ? { body } : {})
  }
  const res = await fetch(url, fetchOptions)
  let data
  try {
    data = await res.json()
  } catch (e) {
    data = null
  }
  if (!res.ok) {
    // 优先抛出后端msg
    if (data && data.msg) throw new Error(data.msg)
    throw new Error('请求失败: ' + res.status)
  }
  return data
}
