import { ref } from 'vue'

/**
 * 全局加载状态管理
 */
export function useLoading() {
  const isLoading = ref(false)
  const loadingText = ref('加载中...')
  const loadingProgress = ref(0)

  /**
   * 开始加载
   * @param {string} text - 加载提示文本
   */
  const startLoading = (text = '加载中...') => {
    isLoading.value = true
    loadingText.value = text
    loadingProgress.value = 0
    
    // 模拟进度条
    if (process.client) {
      const timer = setInterval(() => {
        loadingProgress.value = Math.min(loadingProgress.value + 10, 90)
        if (loadingProgress.value >= 90) clearInterval(timer)
      }, 300)
    }
  }

  /**
   * 结束加载
   */
  const finishLoading = () => {
    loadingProgress.value = 100
    if (process.client) {
      setTimeout(() => {
        isLoading.value = false
        loadingText.value = '加载中...'
        loadingProgress.value = 0
      }, 300)
    }
  }

  /**
   * 更新加载文本
   * @param {string} text - 新的加载提示文本
   */
  const updateLoadingText = (text) => {
    loadingText.value = text
  }

  /**
   * 更新加载进度
   * @param {number} progress - 进度值 (0-100)
   */
  const updateProgress = (progress) => {
    loadingProgress.value = Math.min(100, Math.max(0, progress))
  }

  return {
    isLoading,
    loadingText,
    loadingProgress,
    startLoading,
    finishLoading,
    updateLoadingText,
    updateProgress
  }
}

// 创建全局单例
const loading = useLoading()

export default () => loading
