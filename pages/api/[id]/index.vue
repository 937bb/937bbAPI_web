<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[50vh]">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">加载中，请稍候...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-[50vh]"
    >
      <div class="text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
        >
          <svg
            class="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 class="mt-3 text-lg font-medium text-gray-900">加载失败</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <!-- API Header -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex flex-col space-y-4">
            <!-- Title and Method -->
            <div class="flex flex-wrap items-start justify-between gap-4">
              <h1 class="text-2xl font-bold text-gray-900">{{ api.title }}</h1>
              <div class="flex items-center space-x-3">
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-md text-xs font-medium',
                    getMethodBadgeClass(api.method),
                  ]"
                >
                  {{ api.method }}
                </span>
                <span :class="getStatusBadgeClass(api.status)">
                  {{ getStatusText(api.status) }}
                </span>
              </div>
            </div>

            <!-- API URL -->
            <div
              class="bg-gray-50 rounded-md border border-gray-200 overflow-hidden"
            >
              <div class="flex items-center justify-between p-3">
                <code class="text-sm text-gray-800 break-all font-mono flex-1">
                  {{ api.url }}
                </code>
                <button
                  @click="copyToClipboard(api.url)"
                  class="ml-2 p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :title="copyButtonText"
                >
                  <svg
                    v-if="!isCopied"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Description -->
            <div v-if="api.description" class="text-gray-700">
              <p class="whitespace-pre-line">{{ api.description }}</p>
            </div>

            <!-- Metadata -->
            <div
              class="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100"
            >
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-500">分组：</span>
                <span class="text-sm text-gray-900">{{
                  getGroupName(api.groupId)
                }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-500">调用：</span>
                <span class="text-sm text-gray-900"
                  >{{ api.requestCount || 0 }} 次</span
                >
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-500">创建：</span>
                <span class="text-sm text-gray-900">{{
                  new Date(api.createTime).toLocaleDateString()
                }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-500">更新：</span>
                <span class="text-sm text-gray-900">{{
                  new Date(api.updateTime).toLocaleDateString()
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Request Parameters -->
      <div
        class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-6"
      >
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">请求参数</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  参数名
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  类型
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  是否必填
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  说明
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(param, index) in api.requestParams" :key="index">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ param.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                    :class="getParamTypeClass(param.type || 'string')">
                    {{ getParamTypeText(param.type || 'string') }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    :class="param.required ? 'text-red-600' : 'text-gray-500'"
                  >
                    {{ param.required ? "是" : "否" }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ param.description || "无" }}
                </td>
              </tr>
              <tr v-if="!api.requestParams || api.requestParams.length === 0">
                <td
                  colspan="3"
                  class="px-6 py-4 text-center text-sm text-gray-500"
                >
                  无请求参数
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Response Parameters -->
      <div
        class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-6"
      >
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">返回参数</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  参数名
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  类型
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  含义
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  说明
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(param, index) in api.responseStatus" :key="index">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ param.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ param.type }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ param.meaning }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ param.description || "无" }}
                </td>
              </tr>
              <tr v-if="!api.responseStatus || api.responseStatus.length === 0">
                <td
                  colspan="4"
                  class="px-6 py-4 text-center text-sm text-gray-500"
                >
                  无返回参数
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Request Example -->
      <div
        class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-6"
      >
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">请求示例</h3>
        </div>
        <div class="p-6">
          <pre
            class="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm"
          ><code>{{ api.requestExample || '无请求示例' }}</code></pre>
        </div>
      </div>

      <!-- Response Example -->
      <div
        class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
      >
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">返回示例</h3>
        </div>
        <div class="p-6">
          <pre
            class="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm"
          ><code>{{ api.responseExample || '无返回示例' }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getApiDetail, getGroupList } from "~/utils/api";

import { useGlobalConfig } from "~/utils/globalConfig";
const { apiBase } = useGlobalConfig();

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const groups = ref([]);
const isCopied = ref(false);
const copyButtonText = ref("复制链接");
const showToast = ref(false);
const toastTimeout = ref(null);
const api = ref({
  id: "",
  url: "",
  method: "",
  requestExample: "",
  responseExample: "",
  requestParams: [],
  responseStatus: [],
  summary: "",
  title: "",
  description: "",
  createTime: "",
  updateTime: "",
  requestCount: 0,
  groupId: "",
});

// Get method badge class
const getMethodBadgeClass = (method) => {
  const classes = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    PATCH: "bg-purple-100 text-purple-800",
    default: "bg-gray-100 text-gray-800",
  };
  return classes[method] || classes.default;
};

// Get status badge class
const getStatusBadgeClass = (status) => {
  const classes = {
    active:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
    inactive:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
    deprecated:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",
    default:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
  };
  return classes[status] || classes.default;
};

// Get status display text
const getStatusText = (status) => {
  const statusMap = {
    0: '已停用',
    1: '已上线',
    2: '开发中',
  };
  return statusMap[status] || '未知状态';
};

// Get parameter type display text
const getParamTypeText = (type) => {
  const typeMap = {
    'string': '字符串',
    'number': '数字',
    'integer': '整数',
    'boolean': '布尔值',
    'array': '数组',
    'object': '对象',
    'file': '文件',
  };
  return typeMap[type.toLowerCase()] || type || '字符串';
};

// Get parameter type badge class
const getParamTypeClass = (type) => {
  const typeLower = (type || 'string').toLowerCase();
  const classMap = {
    'string': 'bg-blue-100 text-blue-800',
    'number': 'bg-purple-100 text-purple-800',
    'integer': 'bg-indigo-100 text-indigo-800',
    'boolean': 'bg-green-100 text-green-800',
    'array': 'bg-yellow-100 text-yellow-800',
    'object': 'bg-pink-100 text-pink-800',
    'file': 'bg-gray-100 text-gray-800',
  };
  return classMap[typeLower] || 'bg-gray-100 text-gray-800';
};

// Load group list
const loadGroups = async () => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await getGroupList(token);
    if (response && response.code === 200 && Array.isArray(response.data)) {
      groups.value = response.data;
    }
  } catch (err) {
    console.error("Error loading groups:", err);
  }
};

// Get group name by ID
const getGroupName = (groupId) => {
  if (!groupId) return "未分组";
  const group = groups.value.find((g) => g.id === groupId);
  return group ? group.title : "未知分组";
};

// Copy URL to clipboard
const showNotification = (success = true) => {
  // Clear any existing timeout
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
  }
  
  // Show toast
  showToast.value = true;
  
  // Hide toast after 3 seconds
  toastTimeout.value = setTimeout(() => {
    showToast.value = false;
    toastTimeout.value = null;
  }, 3000);
};

const copyToClipboard = (path) => {
  // Prepend base URL if the path is relative
  const fullUrl = path.startsWith("http")
    ? path
    : `${apiBase}/${path.startsWith("/") ? path.substring(1) : path}`;

  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = fullUrl;
  textarea.style.position = "fixed"; // Avoid scrolling to bottom
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    // Execute the copy command
    const successful = document.execCommand("copy");
    if (successful) {
      isCopied.value = true;
      copyButtonText.value = "已复制!";
      showNotification(true);
      setTimeout(() => {
        isCopied.value = false;
        copyButtonText.value = "复制链接";
      }, 2000);
    } else {
      console.error("Copy command was unsuccessful");
      showNotification(false);
    }
  } catch (err) {
    console.error("Failed to copy:", err);
    // Fallback to modern clipboard API if execCommand fails
    try {
      navigator.clipboard.writeText(fullUrl).then(() => {
        isCopied.value = true;
        copyButtonText.value = "已复制!";
        showNotification(true);
        setTimeout(() => {
          isCopied.value = false;
          copyButtonText.value = "复制链接";
        }, 2000);
      }).catch(e => {
        console.error("Clipboard API failed:", e);
        showNotification(false);
      });
    } catch (e) {
      console.error("Both copy methods failed", e);
      showNotification(false);
    }
  } finally {
    // Clean up
    document.body.removeChild(textarea);
  }
};

// Load API details
const loadApi = async () => {
  try {
    loading.value = true;
    const apiId = route.params.id;

    try {
      // Get token from localStorage or wherever it's stored
      const token = localStorage.getItem("token") || "";
      await loadGroups(); // Load groups first
      const response = await getApiDetail(apiId, token);
      if (response && response.code === 200 && response.data) {
        api.value = {
          id: response.data.id || "",
          url: response.data.url || "",
          method: response.data.method || "GET",
          requestExample: response.data.requestExample || "",
          responseExample: response.data.responseExample || "",
          requestParams: Array.isArray(response.data.requestParams)
            ? response.data.requestParams
            : [],
          responseStatus: Array.isArray(response.data.responseStatus)
            ? response.data.responseStatus
            : [],
          summary: response.data.summary || "",
          title: response.data.title || "未命名API",
          description: response.data.description || "",
          createTime: response.data.createTime || new Date().toISOString(),
          updateTime: response.data.updateTime || new Date().toISOString(),
          requestCount: response.data.requestCount || 0,
          groupId: response.data.groupId || "",
        };
      } else {
        throw new Error(response?.msg || "Invalid API response format");
      }
    } catch (apiError) {
      console.error("Error fetching API details:", apiError);
      error.value = "加载API详情失败: " + (apiError.message || "未知错误");
      if (process.dev) {
        // Fallback mock data in development
        api.value = {
          id: "mock-id",
          title: "示例API",
          method: "GET",
          url: "/api/example",
          description: "这是一个示例API的描述信息",
          requestParams: [
            { name: "a", required: true, description: "" },
            { name: "b", required: false, description: "" },
          ],
          responseStatus: [
            {
              name: "name",
              type: "string",
              meaning: "名称",
              description: "可选",
            },
          ],
          summary: "测试",
          title: "测试API",
          description: "这是一个测试API",
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          requestCount: 0,
          groupId: "598d6557-1dd4-4331-9442-71ba69402a04",
        };
      }
    }
  } catch (err) {
    console.error("Error loading API:", err);
    error.value = "加载API详情时出错";
  } finally {
    loading.value = false;
  }
};

// Initialize
onMounted(() => {
  loadApi();
});
</script>
