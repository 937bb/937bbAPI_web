<template>
  <Transition name="fade">
    <div 
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
    >
      <div class="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm flex items-center space-x-2">
        <div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm text-gray-700">{{ loadingText }}</span>
        <span v-if="loadingProgress > 0" class="text-xs text-gray-500">
          {{ Math.round(loadingProgress) }}%
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLoading } from '~/composables/useLoading'
import { onMounted, onBeforeUnmount } from 'vue'

const { 
  isLoading, 
  loadingText, 
  loadingProgress 
} = useLoading()

// 防止滚动
onMounted(() => {
  if (process.client && isLoading.value) {
    document.body.style.overflow = 'hidden'
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 加载动画 */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>