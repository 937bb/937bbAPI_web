<template>
  <Transition name="fade">
    <div 
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="$event.stopPropagation()"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <!-- 加载动画 -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- 加载文本 -->
        <div class="text-center mb-4">
          <p class="text-lg font-medium text-gray-900 dark:text-white">{{ loadingText }}</p>
          <p v-if="loadingProgress > 0" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            加载中... {{ Math.round(loadingProgress) }}%
          </p>
        </div>
        
        <!-- 进度条 -->
        <div v-if="loadingProgress > 0" class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            :style="{ width: `${loadingProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLoading } from '~/composables/useLoading';
import { onMounted, onBeforeUnmount } from 'vue';

const { 
  isLoading, 
  loadingText, 
  loadingProgress,
  startLoading,
  finishLoading
} = useLoading();

// 组件挂载时确保加载状态可见
onMounted(() => {
  if (process.client && isLoading.value) {
    document.body.classList.add('loading-active');
    document.body.style.overflow = 'hidden';
  }
});

// 组件卸载时清理
onBeforeUnmount(() => {
  if (process.client) {
    document.body.classList.remove('loading-active');
    document.body.style.overflow = '';
  }
  finishLoading();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 防止滚动 */
body.loading-active {
  overflow: hidden;
  height: 100vh;
}
</style>
