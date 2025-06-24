<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 网站Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            {{ siteName }}
          </NuxtLink>
        </div>

        <!-- 桌面导航 -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === item.path }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- 用户认证按钮 (桌面版) -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <NuxtLink 
              to="/user/center" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              个人中心
            </NuxtLink>
            <button 
              @click="handleLogout"
              class="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              退出登录
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/user/login" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              登录
            </NuxtLink>
            <NuxtLink 
              to="/user/register" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              注册
            </NuxtLink>
          </template>
        </div>

        <!-- 移动端菜单 -->
        <div class="md:hidden">
          <div class="pt-2 pb-3 space-y-1">
            <NuxtLink 
              v-for="item in navItems" 
              :key="'mobile-' + item.path" 
              :to="item.path"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              @click="closeMobileMenu"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div v-if="isAuthenticated" class="space-y-1">
              <NuxtLink 
                to="/user/center" 
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                @click="closeMobileMenu"
              >
                个人中心
              </NuxtLink>
              <button 
                @click="handleLogout"
                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                退出登录
              </button>
            </div>
            <div v-else class="space-y-1">
              <NuxtLink 
                to="/user/login" 
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                @click="closeMobileMenu"
              >
                登录
              </NuxtLink>
              <NuxtLink 
                to="/user/register" 
                class="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                @click="closeMobileMenu"
              >
                注册
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden flex items-center">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
          >
            <span class="sr-only">打开主菜单</span>
            <!-- 菜单关闭时显示的图标 -->
            <svg 
              class="h-6 w-6" 
              :class="{'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- 菜单打开时显示的图标 -->
            <svg 
              class="h-6 w-6" 
              :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div 
      class="md:hidden transition-all duration-300 ease-in-out overflow-hidden" 
      :class="{ 'max-h-0': !isMobileMenuOpen, 'max-h-screen': isMobileMenuOpen }"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
        <NuxtLink 
          v-for="item in navItems" 
          :key="'mobile-' + item.path" 
          :to="item.path"
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          :class="{ 'bg-gray-50': $route.path === item.path }"
        >
          {{ item.name }}
        </NuxtLink>
        
        <!-- 移动端认证按钮 -->
        <div class="pt-4 pb-3 border-t border-gray-200 mt-2">
          <template v-if="isAuthenticated">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {{ user?.username?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ user?.username || '用户' }}</div>
                <div class="text-sm font-medium text-gray-500">{{ user?.email || '' }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <NuxtLink 
                to="/user/center"
                @click="closeMobileMenu"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                个人中心
              </NuxtLink>
              <button 
                @click="handleLogout"
                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                退出登录
              </button>
            </div>
          </template>
          <template v-else>
            <NuxtLink 
              to="/user/login"
              @click="closeMobileMenu"
              class="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              登录
            </NuxtLink>
            <p class="mt-3 text-center text-sm text-gray-600">
              还没有账号？
              <NuxtLink 
                to="/user/register"
                @click="closeMobileMenu"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                立即注册
              </NuxtLink>
            </p>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUser } from '~/composables/useUser';
import { useGlobalConfig } from '~/utils/globalConfig';

// 获取全局配置
const { siteName } = useGlobalConfig();
const route = useRoute();
const router = useRouter();

// 用户相关状态
const { user, logout: userLogout } = useUser();
const isMobileMenuOpen = ref(false);

// 导航菜单项
const navItems = computed(() => [
  { name: '首页', path: '/' },
  { name: 'API 列表', path: '/api' },
  { name: '文档', path: '/docs' },
  { name: '关于', path: '/about' },
]);

// 用户认证状态
const { isAuthenticated } = useUser();

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// 处理退出登录
const handleLogout = async () => {
  try {
    await userLogout();
    closeMobileMenu();
    router.push('/');
  } catch (error) {
    console.error('退出登录失败:', error);
  }
};
</script>
