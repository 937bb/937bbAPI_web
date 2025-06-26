<template>
  <ThemeProvider>
    <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
      <!-- Splash Screen -->
      <SplashScreen 
        v-if="showSplash" 
        :loading-text="splashLoadingText"
        :version="appVersion"
        @loaded="onSplashLoaded"
      />
      
      <!-- Main Content -->
      <div :class="{ 'opacity-0': showSplash, 'opacity-100': !showSplash, 'transition-opacity duration-500': true }">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
      
      <GlobalLoading />
      <GlobalMessage />
    </div>
  </ThemeProvider>
</template>

<script setup>
// 使用 Nuxt 3 的布局系统
// 页面将自动使用 /layouts/default.vue 作为默认布局
// 可以在页面中使用 definePageMeta 来覆盖默认布局
import { onMounted, watch, ref, computed } from 'vue';
import { useNuxtApp, useRuntimeConfig } from '#app';
import ThemeProvider from '~/components/style/ThemeProvider.vue';
import GlobalLoading from '~/components/GlobalLoading.vue';
import GlobalMessage from '~/components/GlobalMessage.vue';
import SplashScreen from '~/components/SplashScreen.vue';
import { useLoading } from '~/composables/useLoading';

// 获取运行时配置
const config = useRuntimeConfig();

// 应用信息
const appName = config.public.VITE_APP_NAME || 'App';
const appVersion = config.public.VITE_APP_VERSION || '1.0.0';
const enableSplash = config.public.VITE_ENABLE_SPLASH_SCREEN === 'true';

// 启动画面状态
const showSplash = ref(enableSplash);
const splashLoadingText = ref(`Welcome to ${appName}`);

// 启动画面加载完成
const onSplashLoaded = () => {
  showSplash.value = false;
  document.body.style.overflow = '';
};

// 如果禁用启动画面，立即显示主内容
if (!enableSplash) {
  showSplash.value = false;
}

// 初始化全局 loading 状态
const loading = useLoading();
const { isLoading, loadingText } = toRefs(loading);

// 提供全局 loading 状态
const nuxtApp = useNuxtApp();
nuxtApp.provide('loading', loading);

// 监听加载状态，添加/移除 body 类
watch(isLoading, (newVal) => {
  if (process.client) {
    if (newVal) {
      document.body.classList.add('loading-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('loading-active');
      document.body.style.overflow = '';
    }
  }
}, { immediate: true });

// 组件卸载时确保移除类
onBeforeUnmount(() => {
  if (process.client) {
    document.body.classList.remove('loading-active');
    document.body.style.overflow = '';
  }
});
</script>

<style>
/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  background-color: #f3f4f6;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}

/* 移除按钮默认样式 */
button {
  outline: none;
}

button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
  --tw-ring-offset-width: 2px;
}

/* 链接样式 */
a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  color: #1e40af;
  text-decoration: underline;
}

/* 表单元素样式 */
input,
textarea,
select {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
  --tw-ring-offset-width: 2px;
  border-color: transparent;
}

/* 禁用状态 */
.disabled,
[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
