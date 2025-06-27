<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 错误提示 -->
    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 my-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 顶部横幅 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ siteName }}</h1>
        <p class="text-gray-600 mb-6">最全、最易用的免费API接口导航站</p>

        <!-- 统计信息 -->
        <div class="flex flex-wrap gap-4 mb-6">
          <div class="bg-blue-50 px-4 py-3 rounded-lg">
            <p class="text-sm text-gray-500">API总数</p>
            <p class="text-2xl font-bold text-blue-600">{{ apiCount }}</p>
          </div>
          <div class="bg-green-50 px-4 py-3 rounded-lg">
            <p class="text-sm text-gray-500">总调用次数</p>
            <p class="text-2xl font-bold text-green-600">
              {{ totalRequestCount }}
            </p>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="relative max-w-2xl mb-6">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            v-model="searchText"
            type="text"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="输入关键词搜索API..."
          />
        </div>

        <!-- 分组标签 -->
        <div class="flex flex-wrap gap-2 mb-6" v-if="groupNames.length > 0">
          <button
            @click="activeGroup = ''"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full',
              activeGroup === ''
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            全部
          </button>
          <button
            v-for="g in groupNames"
            :key="g.id"
            @click="activeGroup = g.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full',
              activeGroup === g.id
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ g.title }}
          </button>
        </div>
      </div>

      <!-- API列表 -->
      <div
        v-if="filteredApis.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="api in filteredApis"
          :key="api.id"
          @click="goDetail(api.id)"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
          <div class="px-6 py-5">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 truncate">
                {{ api.title }}
              </h3>
              <span
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  {
                    'bg-green-100 text-green-800': api.method === 'GET',
                    'bg-blue-100 text-blue-800': api.method === 'POST',
                    'bg-yellow-100 text-yellow-800': api.method === 'PUT',
                    'bg-red-100 text-red-800': api.method === 'DELETE',
                    'bg-purple-100 text-purple-800': ![
                      'GET',
                      'POST',
                      'PUT',
                      'DELETE',
                    ].includes(api.method),
                  },
                ]"
              >
                {{ api.method }}
              </span>
            </div>
            <p class="mt-2 text-sm text-gray-600 line-clamp-2">
              {{ api.summary || "暂无描述" }}
            </p>
            <div class="mt-4 flex items-center justify-between">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ getGroupTitle(api.groupId) || "未分类" }}
              </span>
              <div class="flex items-center text-sm text-gray-500">
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v4.586l2.293 2.293a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ api.requestCount || 0 }} 次调用
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 无数据提示 -->
      <div v-else class="text-center py-12 bg-white rounded-lg shadow-sm">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">
          没有找到匹配的API
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          尝试调整搜索关键词或选择其他分组
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @description: 首页组件
 * @author: 937bb Team
 * @lastUpdate: 2025-06-27
 */

// 设置页面元数据，指定使用默认布局
definePageMeta({
  layout: "default",
});

import { ref, computed, onMounted } from "vue";
import { useGlobalConfig } from "~/utils/globalConfig";
import { useRouter } from "vue-router";
import { getApiList, getGroupList } from "~/utils/api";
import { useMessage } from "~/composables/useMessage";

// 网站名称
const { siteName } = useGlobalConfig();
// 路由实例
const router = useRouter();
// 用户认证token
const token = ref("");

/**
 * 跳转到API详情页
 * @param {string} id - API的唯一标识符
 */
const goDetail = (id) => {
  navigateTo(`/api/${id}`);
};

// 搜索关键词
const searchText = ref("");
// API列表
const apis = ref([]);
// 分组列表
const groups = ref([]);
// 错误信息
const error = ref(null);

/**
 * 获取API列表数据
 * 从服务器获取所有API及其分组信息
 */
// 在组件顶部，与其它组合式函数一起调用
const { error: showError } = useMessage();

const fetchApis = async () => {
  try {
    error.value = null;

    // 获取API列表和分组列表
    const [apiResponse, groupResponse] = await Promise.all([
      getApiList(token.value),
      getGroupList(token.value),
    ]);

    // 处理API列表响应
    if (apiResponse?.code === 200) {
      apis.value = Array.isArray(apiResponse.data?.list)
        ? apiResponse.data.list
        : [];
    } else {
      throw new Error(apiResponse?.message || "获取API列表失败");
    }

    // 处理分组列表响应
    if (groupResponse?.code === 200) {
      groups.value = Array.isArray(groupResponse.data)
        ? groupResponse.data
        : [];
    } else {
      console.warn("获取分组列表失败:", groupResponse?.message);
      groups.value = [];
    }
  } catch (err) {
    console.error("获取数据失败:", err);
    error.value = err.message || "获取数据失败，请稍后重试";
    showError(error.value);
  } finally {
  }
};

/**
 * 组件挂载生命周期钩子
 * 初始化时获取API数据
 */
onMounted(() => {
  fetchApis();
});

// 计算属性
const apiCount = computed(() => apis.value.length);
const totalRequestCount = computed(() =>
  apis.value.reduce((acc, api) => acc + (api.requestCount || 0), 0)
);
const groupNames = computed(() => groups.value);
const activeGroup = ref("");

// 组件挂载时获取数据
onMounted(() => {
  // 从 storage 获取 token
  token.value = storage.getToken();
  fetchApis();
});

// 过滤API列表
const filteredApis = computed(() => {
  if (error.value) return [];

  let list = [...apis.value];

  // 按分组过滤
  if (activeGroup.value) {
    list = list.filter((a) => a.groupId === activeGroup.value);
  }

  // 搜索过滤
  if (searchText.value.trim()) {
    const kw = searchText.value.trim().toLowerCase();
    list = list.filter(
      (api) =>
        (api.name && api.name.toLowerCase().includes(kw)) ||
        (api.title && api.title.toLowerCase().includes(kw)) ||
        (api.summary && api.summary.toLowerCase().includes(kw)) ||
        (api.description && api.description.toLowerCase().includes(kw)) ||
        (api.path && api.path.toLowerCase().includes(kw)) ||
        (api.groupId && api.groupId.toLowerCase().includes(kw))
    );
  }

  return list;
});
const getGroupTitle = (id) => {
  const g = groups.value.find((g) => g.id === id);
  return g ? g.title : "";
};
const onSearch = () => {};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
.main-bg {
  background: linear-gradient(180deg, #f8fafc 0%, #eaf6ff 100%);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.hero {
  width: 100%;
  background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
  padding: 48px 0 32px 0;
  color: #fff;
  box-shadow: 0 4px 24px 0 rgba(56, 189, 248, 0.08);
}
.hero-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.hero-title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 2px;
}
.hero-slogan {
  font-size: 1.25rem;
  opacity: 0.92;
  margin-bottom: 8px;
}
.hero-stats {
  display: flex;
  gap: 32px;
  font-size: 1.1rem;
}
.hero-stat span {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 6px;
}
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -28px;
  margin-bottom: 32px;
}
.search-input {
  width: 100%;
  max-width: 420px;
  padding: 16px 24px;
  border-radius: 14px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.13rem;
  background: #fff;
  color: #222;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
}
.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #c7d2fe;
}
.group-tabs {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.group-tab {
  padding: 8px 22px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #6366f1;
  font-weight: 600;
  font-size: 1.08rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border: 1.5px solid transparent;
}
.group-tab.active,
.group-tab:hover {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}
.api-list {
  max-width: 1100px;
  margin: 0 auto 48px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px 28px;
}
.api-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 rgba(56, 189, 248, 0.07);
  border: 1.5px solid #e0e7ef;
  padding: 28px 24px 18px 24px;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s, transform 0.18s;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.api-card:hover {
  box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.13);
  border-color: #6366f1;
  transform: translateY(-4px) scale(1.025);
}
.api-card-title {
  font-size: 1.18rem;
  font-weight: bold;
  color: #22223b;
  display: flex;
  align-items: center;
  gap: 10px;
}
.api-card-method {
  display: inline-block;
  padding: 2px 14px;
  border-radius: 999px;
  font-size: 0.98rem;
  font-weight: 700;
  background: #e0f2fe;
  color: #0284c7;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 8px;
}
.api-card-method.get {
  background: #dcfce7;
  color: #16a34a;
}
.api-card-method.post {
  background: #fee2e2;
  color: #b91c1c;
}
.api-card-method.put {
  background: #fef9c3;
  color: #b45309;
}
.api-card-method.delete {
  background: #fee2e2;
  color: #b91c1c;
}
.api-card-summary {
  color: #6b7280;
  font-size: 1.05rem;
  min-height: 32px;
}
.api-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.98rem;
  color: #8b949e;
}
.api-card-group {
  margin-right: 10px;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 2px 10px;
  color: #6366f1;
  font-size: 0.98rem;
}
.api-card-count {
  color: #0284c7;
}
.api-empty {
  grid-column: 1/-1;
  text-align: center;
  color: #bbb;
  font-size: 1.1rem;
  padding: 32px 0;
}
.footer {
  width: 100%;
  background: #f8fafc;
  border-top: 1.5px solid #e0e7ef;
  padding: 32px 0 18px 0;
  margin-top: 32px;
  flex-shrink: 0;
  position: fixed;
  bottom: 0;
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.footer-text {
  color: #8b949e;
  font-size: 15px;
  text-align: center;
}
.footer-link {
  color: #0284c7;
  text-decoration: underline;
  margin-left: 8px;
}
@media (max-width: 1200px) {
  .api-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .hero-inner {
    max-width: 98vw;
  }
  .api-list {
    grid-template-columns: 1fr;
    gap: 18px 0;
  }
  .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 700px) {
  .main-bg {
    background: #f4f7fb;
    min-height: 100vh;
    width: 100vw;
  }
  .main-content {
    padding: 0 4vw;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
  }
  .search-bar {
    margin-top: 0;
    margin-bottom: 14px;
    padding: 0 0 6px 0;
    background: #fff;
    border-bottom: 1.5px solid #e0e7ef;
    box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.04);
    width: 100%;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
  }
  .search-input {
    font-size: 1rem;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1.5px solid #e0e7ef;
    background: #f8fafc;
    color: #222;
    box-shadow: 0 1px 4px 0 rgba(99, 102, 241, 0.04);
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
  }
  .group-tabs {
    gap: 6px;
    margin-bottom: 14px;
    flex-wrap: wrap;
    padding: 0;
    background: none;
    box-shadow: none;
    display: flex;
    width: 100%;
    border-bottom: 1.5px solid #e0e7ef;
    box-sizing: border-box;
  }
  .api-list {
    grid-template-columns: 1fr;
    gap: 0;
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    box-sizing: border-box;
    width: 100%;
  }
  .api-card {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 10px 12px 10px;
    border-radius: 14px;
    box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.06);
    margin-bottom: 14px;
    gap: 6px;
    border: 1.5px solid #f1f5f9;
    background: #fff;
    transition: box-shadow 0.2s, border 0.2s;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .api-card:not(:last-child)::after {
    content: "";
    display: block;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: -8px;
    height: 1px;
    background: #f1f5f9;
    border-radius: 1px;
  }
  .footer {
    position: static;
    padding: 8px 0 4px 0;
    margin-top: 8px;
    border-radius: 0;
    box-shadow: none;
    background: none;
    border-top: 1px solid #eee;
    width: 100%;
  }
  .footer-inner {
    padding: 0 4vw;
    gap: 2px;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
}
</style>
