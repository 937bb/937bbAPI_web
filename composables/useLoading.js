/*
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-26 17:32:12
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-27 13:28:07
 */
import { ref } from 'vue'

// 创建全局状态
const state = {
  isLoading: ref(false),
  loadingText: ref('加载中...'),
  loadingProgress: ref(0)
}

export function useLoading() {
  const startLoading = (text = '加载中...') => {
    state.isLoading.value = true
    state.loadingText.value = text
    state.loadingProgress.value = 0
    
    if (process.client) {
      const timer = setInterval(() => {
        state.loadingProgress.value = Math.min(state.loadingProgress.value + 10, 90)
        if (state.loadingProgress.value >= 90) clearInterval(timer)
      }, 300)
    }
  }

  const finishLoading = () => {
    state.loadingProgress.value = 100
    if (process.client) {
      setTimeout(() => {
        state.isLoading.value = false
        state.loadingText.value = '加载中...'
        state.loadingProgress.value = 0
      }, 300)
    }
  }

  return {
    isLoading: state.isLoading,
    loadingText: state.loadingText,
    loadingProgress: state.loadingProgress,
    startLoading,
    finishLoading
  }
}

// 创建全局单例
const loading = useLoading()

export default () => loading