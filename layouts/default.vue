<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- 顶部导航栏 -->
    <TheHeader />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <slot />
      </div>
    </main>

    <!-- 页脚 -->
    <TheFooter />
  </div>
</template>

<script setup>
// 导入布局组件
import TheHeader from '~/components/layout/TheHeader.vue';
import TheFooter from '~/components/layout/TheFooter.vue';
import { useUser } from '~/composables/useUser';

// 提供用户数据给所有子组件
const { user } = useUser();
provide('user', user);
</script>
