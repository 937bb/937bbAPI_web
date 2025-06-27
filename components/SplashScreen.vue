<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);"
    >
      <!-- Subtle Background -->
      <div class="absolute inset-0 bg-white/30"></div>
      
      <!-- Main Content -->
      <div class="relative z-10 w-full max-w-2xl px-8 py-16 text-center">
        <!-- Animated Logo Container -->
        <div class="relative mb-12">
          <!-- Outer Glow -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div 
              class="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl animate-pulse"
              :class="{ 'animate-scale-in': show }"
            ></div>
          </div>
          
          <!-- Animated Rings -->
          <div class="relative z-10 flex items-center justify-center">
            <div 
              v-for="i in 3" 
              :key="i"
              class="absolute rounded-full border-2 border-opacity-20 border-white"
              :class="`ring-${i}`"
              :style="{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                animation: `pulse ${4 + i}s infinite ${i * 0.3}s`
              }"
            ></div>
            
            <!-- Logo -->
            <div 
              class="relative z-20 w-32 h-32 flex items-center justify-center rounded-3xl bg-white shadow-lg border border-gray-100"
              :class="{ 'animate-float': show }"
            >
              <img
                src="../assets/logo.jpg"
                alt="Logo"
                class="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>

        <!-- Loading Text -->
        <h1
          class="text-3xl font-medium text-gray-800 mb-6"
          :class="{ 'animate-fade-in-up': show }"
          style="animation-delay: 0.5s"
        >
          {{ siteName }}
        </h1>
        
        <p 
          class="text-gray-600 mb-8 opacity-0"
          :class="{ 'animate-fade-in-up': show }"
          style="animation-delay: 0.7s"
        >
          {{ loadingText }}
          <span class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>

        <!-- Progress Bar -->
        <div
          class="relative h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-xs mx-auto mb-8 opacity-0"
          :class="{ 'animate-fade-in-up': show }"
          style="animation-delay: 0.9s"
        >
          <div 
            class="absolute inset-0 bg-blue-500 transition-all duration-300 ease-out"
            :style="{ 
              width: `${progress}%`,
              boxShadow: 'none'
            }"
          >
            <div class="absolute right-0 top-1/2 w-2 h-2 -mt-1 -mr-1 bg-white rounded-full"></div>
          </div>
        </div>
        
        <!-- Progress Percentage -->
        <div 
          class="text-sm font-mono text-gray-500 opacity-0"
          :class="{ 'animate-fade-in-up': show }"
          style="animation-delay: 1s"
        >
          {{ Math.round(progress) }}% 加载中
        </div>
      </div>

      <!-- Version Info -->
      <div
        class="absolute bottom-8 text-sm text-gray-400 font-light tracking-wider opacity-0"
        :class="{ 'animate-fade-in-up': show }"
        style="animation-delay: 1.2s"
      >
        {{ version }} · {{ siteName }}
      </div>
      
      <!-- Loading Dots -->
      <div class="flex space-x-2 opacity-0 absolute bottom-16" :class="{ 'animate-fade-in-up': show }" style="animation-delay: 1s">
        <span v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full bg-gray-300" :style="{
          animation: `pulse 1.4s infinite ${i * 0.2}s`
        }"></span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/**
 * @description: 启动加载动画组件 - 炫彩星空主题
 * @author: 937bb Team
 * @lastUpdate: 2025-06-27
 */

import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteName = config.public.VITE_SITE_NAME || '937bbAPI';

// 组件属性定义
const props = defineProps({
  // 是否显示启动画面
  show: {
    type: Boolean,
    default: true,
  },
  // 加载中显示的文本
  loadingText: {
    type: String,
    default: "正在启动系统",
  },
  // 应用版本号
  version: {
    type: String,
    default: "v1.0.0",
  },
  // 最小显示时间(毫秒)
  minDisplayTime: {
    type: Number,
    default: 1500,
  },
  // 最大显示时间(毫秒)，超过后强制完成
  maxDisplayTime: {
    type: Number,
    default: 5000,
  },
});

// 组件事件定义
const emit = defineEmits(["loaded"]);

// 状态
const progress = ref(0);
const isLoading = ref(true);
const startTime = ref(Date.now());
let interval = null;
let timeout = null;

// 移除了粒子效果

// 根据进度获取加载提示
const loadingMessage = computed(() => {
  const p = progress.value;
  if (p < 20) return '正在初始化系统';
  if (p < 40) return '加载核心组件';
  if (p < 60) return '准备用户界面';
  if (p < 80) return '优化性能';
  if (p < 95) return '即将完成';
  return '欢迎使用';
});

/**
 * 启动进度条动画
 * 模拟加载进度，从0%到90%
 */
const startProgress = () => {
  progress.value = 0;
  isLoading.value = true;
  startTime.value = Date.now();
  clearInterval(interval);
  clearTimeout(timeout);

  // 平滑的进度条动画
  interval = setInterval(() => {
    if (progress.value < 90) {
      // 随着进度增加，增量逐渐减小
      const remaining = 90 - progress.value;
      const increment = Math.max(0.5, Math.min(remaining, remaining * 0.1 + Math.random() * 5));
      progress.value = Math.min(90, progress.value + increment);
    }
  }, 100);

  // 设置最大显示时间
  timeout = setTimeout(() => {
    finishProgress();
  }, props.maxDisplayTime);
};

/**
 * 完成加载
 * 将进度条填充到100%并触发加载完成事件
 */
const finishProgress = () => {
  clearInterval(interval);
  
  // 直接到100%
  progress.value = 100;
  
  // 计算剩余需要等待的时间，确保至少显示minDisplayTime
  const elapsed = Date.now() - startTime.value;
  const remainingTime = Math.max(0, props.minDisplayTime - elapsed);
  
  // 延迟隐藏，确保动画完成
  setTimeout(() => {
    if (progress.value >= 100) {
      isLoading.value = false;
      emit("loaded");
    }
  }, remainingTime);
};

// 初始化
onMounted(() => {
  startProgress();
});

// 清理
onBeforeUnmount(() => {
  clearInterval(interval);
  clearTimeout(timeout);
});

// 暴露方法
const reset = () => {
  progress.value = 0;
  startProgress();
};

defineExpose({
  startProgress,
  finishProgress,
  reset,
});
</script>

<style scoped>
/* 基础动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(100%) skewX(-15deg); }
}

@keyframes float-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes loadingDots {
  0%, 20% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}

/* 动画类 */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: float-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-scale-in {
  animation: scale-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .loading-content {
    padding: 2rem 1.5rem;
  }
  
  .loading-logo {
    width: 6rem;
    height: 6rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>
