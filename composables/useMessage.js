import { ref } from 'vue'

/**
 * 全局消息提示管理
 * 提供统一的消息提示方法，支持 success/error/warning/info 四种类型
 */
export function useMessage() {
  const message = ref({
    show: false,
    text: '',
    type: 'info', // success | error | warning | info
    duration: 3000
  })

  /**
   * 显示消息
   * @param {string} text - 消息内容
   * @param {string} type - 消息类型
   * @param {number} duration - 显示时长(ms)
   */
  const showMessage = (text, type = 'info', duration = 3000) => {
    message.value = {
      show: true,
      text,
      type,
      duration
    }

    // 自动关闭
    if (duration > 0) {
      setTimeout(() => {
        message.value.show = false
      }, duration)
    }
  }

  // 快捷方法
  const success = (text, duration) => showMessage(text, 'success', duration)
  const error = (text, duration) => showMessage(text, 'error', duration)
  const warning = (text, duration) => showMessage(text, 'warning', duration)
  const info = (text, duration) => showMessage(text, 'info', duration)

  return {
    message,
    showMessage,
    success,
    error,
    warning,
    info
  }
}

// 创建全局单例
const message = useMessage()

export default () => message
