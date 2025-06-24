<template>
  <ThemeProvider>
    <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ThemeProvider>
</template>

<script setup>
// 使用 Nuxt 3 的布局系统
// 页面将自动使用 /layouts/default.vue 作为默认布局
// 可以在页面中使用 definePageMeta 来覆盖默认布局
import ThemeProvider from '~/components/style/ThemeProvider.vue';
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
