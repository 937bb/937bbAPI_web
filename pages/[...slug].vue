<!--
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-26 17:20:18
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-26 17:21:13
-->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- 主要内容 -->
    <main class="flex-grow flex items-center justify-center px-4">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p class="text-2xl font-medium text-gray-700 mb-8">页面未找到</p>
        <p class="text-gray-500 mb-8">抱歉，您访问的页面不存在或已被移除</p>
        <NuxtLink to="/" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          返回首页
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useGlobalConfig } from '~/utils/globalConfig';

const { siteName } = useGlobalConfig();

// 设置页面标题
useHead({
  title: `页面未找到 - ${siteName}`,
  meta: [
    { name: 'description', content: '抱歉，您访问的页面不存在或已被移除' },
    { name: 'robots', content: 'noindex, nofollow' } // 防止搜索引擎索引404页面
  ]
});

// 设置响应状态码为404
setResponseStatus(404);
</script>

<style scoped>
/* 添加响应式样式 */
@media (max-width: 640px) {
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.125rem;
  }
}
</style>
