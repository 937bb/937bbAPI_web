/**
 * 全局加载状态插件
 * 1. 页面切换时显示加载状态
 * 2. 拦截 API 请求显示加载状态
 */

export default defineNuxtPlugin((nuxtApp) => {
  const { startLoading, finishLoading } = useLoading()
  const config = useRuntimeConfig()
  
  // 页面切换时的加载状态
  nuxtApp.hook('page:start', () => {
    startLoading('页面加载中...')
  })
  
  nuxtApp.hook('page:finish', () => {
    // 延迟关闭加载状态，避免闪烁
    setTimeout(finishLoading, 300)
  })
  
  // 错误处理
  nuxtApp.hook('vue:error', () => {
    finishLoading()
  })
  
  // 全局错误处理
  const error = nuxtApp.vueApp.config.errorHandler
  nuxtApp.vueApp.config.errorHandler = (err, context) => {
    finishLoading()
    if (error) error(err, context)
  }
  
  // 请求拦截器 - 显示加载状态
  const { $apiFetch } = nuxtApp
  nuxtApp.provide('apiFetch', async (...args) => {
    // 排除特定路由不显示加载状态
    const excludePaths = ['/api/auth/checkToken', '/api/web/getTodayStatistics']
    const shouldShowLoading = !excludePaths.some(path => args[0]?.includes?.(path))
    
    try {
      if (shouldShowLoading) {
        startLoading('加载中...')
      }
      
      const response = await $apiFetch(...args)
      return response
    } catch (error) {
      // 错误处理可以在 apiFetch 中统一处理
      throw error
    } finally {
      if (shouldShowLoading) {
        finishLoading()
      }
    }
  })
})
