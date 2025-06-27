<template>
  <Transition name="message-fade">
    <div 
      v-if="message.show"
      class="fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform"
      :class="messageClasses"
      @click="message.show = false"
    >
      <div class="flex items-center">
        <!-- 图标 -->
        <div class="mr-2">
          <svg 
            v-if="message.type === 'success'" 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg 
            v-else-if="message.type === 'error'" 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg 
            v-else-if="message.type === 'warning'" 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <svg 
            v-else 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <!-- 消息内容 -->
        <div class="flex-1">
          <p class="text-sm font-medium">{{ message.text }}</p>
        </div>
        
        <!-- 关闭按钮 -->
        <button 
          class="ml-2 text-white/70 hover:text-white focus:outline-none"
          @click.stop="message.show = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/**
 * @description: 全局消息提示组件
 * @author: 937bb Team
 * @lastUpdate: 2025-06-27
 */

import { useMessage } from '~/composables/useMessage'

// 使用消息钩子
const { message } = useMessage()

// 根据消息类型返回对应的样式类
const messageClasses = computed(() => ({
  'bg-green-500': message.type === 'success',  // 成功消息
  'bg-red-500': message.type === 'error',      // 错误消息
  'bg-yellow-500': message.type === 'warning', // 警告消息
  'bg-blue-500': message.type === 'info',      // 提示消息
  'opacity-0 translate-y-[-20px]': !message.show, // 隐藏状态
  'opacity-100 translate-y-0': message.show      // 显示状态
}))
</script>

<style scoped>
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) !important;
}
</style>
