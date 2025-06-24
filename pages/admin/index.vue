<template>
  <div class="py-6">
    <!-- Page Header -->
    <div class="max-w-7xl mx-auto px-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
        <h2 class="text-2xl font-bold text-gray-900">控制台</h2>
        <p class="mt-1 text-sm text-gray-500">系统概览和快速操作</p>
      </div>
      <div class="mt-4 md:mt-0">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          @click="refreshDashboard"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          刷新数据
        </button>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="max-w-7xl mx-auto px-6">
      <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <!-- Total APIs -->
      <div class="bg-white overflow-hidden shadow rounded-xl transition-all duration-200 hover:shadow-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">API 总数</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ stats.totalApis || 0 }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <NuxtLink to="/admin/api" class="font-medium text-blue-600 hover:text-blue-500">
              查看所有 API
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Total Users -->
      <div class="bg-white overflow-hidden shadow rounded-xl transition-all duration-200 hover:shadow-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">用户总数</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers || 0 }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <NuxtLink to="/admin/users" class="font-medium text-green-600 hover:text-green-500">
              查看所有用户
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Today's Requests -->
      <div class="bg-white overflow-hidden shadow rounded-xl transition-all duration-200 hover:shadow-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">今日请求数</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ stats.todayRequests || 0 }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <span class="text-yellow-600 font-medium">实时更新</span>
          </div>
        </div>
      </div>

      <!-- Error Rate -->
      <div class="bg-white overflow-hidden shadow rounded-xl transition-all duration-200 hover:shadow-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">错误率</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ stats.errorRate || 0 }}%</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <span class="text-red-600 font-medium">最近24小时</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white shadow overflow-hidden rounded-xl mb-8">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">最近活动</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">系统最近的操作记录</p>
      </div>
      <div class="bg-white overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="(activity, index) in recentActivities" :key="index" class="px-6 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                  <span class="text-blue-600">{{ activity.user ? activity.user.charAt(0).toUpperCase() : 'A' }}</span>
                </span>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
                <p class="text-sm text-gray-500">
                  {{ activity.timestamp }} · {{ activity.details }}
                </p>
              </div>
            </div>
          </li>
          <li v-if="recentActivities.length === 0" class="px-6 py-4 text-center text-gray-500">
            暂无活动记录
          </li>
        </ul>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink to="/admin/api/new" class="relative bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex items-center space-x-4 hover:border-blue-500 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-all duration-200">
        <div class="flex-shrink-0 bg-blue-500 p-3 rounded-md">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900">添加新 API</p>
          <p class="text-sm text-gray-500">创建新的 API 接口</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/api" class="relative bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex items-center space-x-4 hover:border-green-500 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 transition-all duration-200">
        <div class="flex-shrink-0 bg-green-500 p-3 rounded-md">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900">添加用户</p>
          <p class="text-sm text-gray-500">创建新的用户账号</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/users" class="relative bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex items-center space-x-4 hover:border-purple-500 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 transition-all duration-200">
        <div class="flex-shrink-0 bg-purple-500 p-3 rounded-md">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900">导入 API</p>
          <p class="text-sm text-gray-500">从文件导入 API 定义</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/settings" class="relative bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex items-center space-x-4 hover:border-yellow-500 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500 transition-all duration-200">
        <div class="flex-shrink-0 bg-yellow-500 p-3 rounded-md">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900">系统设置</p>
          <p class="text-sm text-gray-500">配置系统参数</p>
        </div>
      </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTodayStatistics } from '~/utils/api';

const router = useRouter();
const loading = ref(false);

// Mock data - replace with actual API calls
const stats = ref({
  totalApis: 0,
  totalUsers: 0,
  todayRequests: 0,
  errorRate: 0
});

const recentActivities = ref([
  {
    user: 'Admin',
    action: '创建了新API',
    details: '用户管理API',
    timestamp: '刚刚'
  },
  {
    user: 'Test User',
    action: '更新了个人资料',
    details: '更新了头像',
    timestamp: '10分钟前'
  },
  {
    user: 'System',
    action: '系统更新',
    details: '更新到 v1.2.0',
    timestamp: '1小时前'
  }
]);

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    loading.value = true;
    
    // Get user token from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;
    
    // Fetch today's statistics
    if (token) {
      const statsData = await getTodayStatistics(token);
      if (statsData && statsData.code === 200) {
        stats.value.todayRequests = statsData.data?.totalRequests || 0;
      }
    }
    
    // TODO: Replace other stats with actual API calls
    stats.value = {
      ...stats.value,
      totalApis: 24,
      totalUsers: 156,
      errorRate: 1.2
    };
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  } finally {
    loading.value = false;
  }
};

const refreshDashboard = () => {
  fetchDashboardData();
};

// Set page title
useHead({
  title: '控制台 - 管理后台'
});

// Fetch data on component mount
onMounted(() => {
  fetchDashboardData();
});
</script>
