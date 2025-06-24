<template>
  <div class="theme-provider">
    <slot />
  </div>
</template>

<style>
/* 全局样式变量 */
:root {
  /* 主色调 */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;
  
  /* 文字颜色 */
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-muted: #6b7280;
  
  /* 背景色 */
  --color-bg: #f9fafb;
  --color-bg-card: #ffffff;
  
  /* 边框 */
  --color-border: #e5e7eb;
  
  /* 状态色 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  /* 圆角 */
  --radius-sm: 0.25rem;  /* 4px */
  --radius: 0.375rem;    /* 6px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-2xl: 1.5rem;  /* 24px */
  --radius-full: 9999px;
}

/* 基础样式重置 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  background-color: #f1f5f9;
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

/* 全局字体设置 */
html {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-primary);
  background-color: var(--color-bg);
}

/* 链接样式 */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.15s ease-in-out;
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

/* 按钮基础样式 */
button,
[type='button'],
[type='reset'],
[type='submit'] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  user-select: none;
}

/* 主按钮 */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

/* 次要按钮 */
.btn-secondary {
  background-color: white;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

/* 危险按钮 */
.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover {
  background-color: #b91c1c;
}

/* 表单元素 */
input,
select,
textarea {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-text-primary);
  background-color: white;
  background-clip: padding-box;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--color-primary);
  outline: 0;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* 卡片 */
.card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

/* 工具类 */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
