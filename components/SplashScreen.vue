<template>
  <Transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800"
    >
      <!-- Animated Logo -->
      <div class="relative mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-pulse opacity-70"></div>
        <div class="relative w-32 h-32 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
          <span class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            937bb
          </span>
        </div>
      </div>
      
      <!-- Loading Text -->
      <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center px-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {{ loadingText }}
        </span>
      </h1>
      
      <!-- Progress Bar -->
      <div class="w-72 max-w-full mx-8 h-2.5 bg-gray-200 rounded-full overflow-hidden mb-8 shadow-inner">
        <div 
          class="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
          :style="{ 
            width: `${progress}%`,
            backgroundSize: '200% 100%',
            animation: 'progressGradient 2s ease infinite'
          }"
        ></div>
      </div>
      
      <!-- Loading Animation -->
      <div class="flex space-x-3">
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-4 h-4 rounded-full animate-bounce"
          :style="{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.8s',
            background: `linear-gradient(135deg, 
              hsl(${200 + i * 40}, 90%, 70%), 
              hsl(${220 + i * 40}, 90%, 60%)
            )`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }"
        ></div>
      </div>
      
      <!-- Version Info -->
      <div class="absolute bottom-8 text-sm text-white/50">
        {{ version }}
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRuntimeConfig } from '#app';

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  version: {
    type: String,
    default: 'v1.0.0'
  }
});

const progress = ref(0);
let interval;

// 模拟进度条
const startProgress = () => {
  progress.value = 0;
  clearInterval(interval);
  
  interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 15;
    }
  }, 300);
};

// 完成加载
const finishProgress = () => {
  progress.value = 100;
  clearInterval(interval);
  
  // 延迟隐藏，确保动画完成
  setTimeout(() => {
    if (progress.value >= 100) {
      emit('loaded');
    }
  }, 500);
};

const emit = defineEmits(['loaded']);

onMounted(() => {
  startProgress();
  
  // 确保至少显示1.5秒
  setTimeout(() => {
    finishProgress();
  }, 1500);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

defineExpose({
  startProgress,
  finishProgress
});
</script>

<style scoped>
@keyframes progressGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Smooth transitions for the progress bar */
.progress-bar {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Subtle shadow for depth */
.shadow-soft {
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.05), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
