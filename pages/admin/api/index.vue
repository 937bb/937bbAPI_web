<template>
  <div class="w-full px-4 py-4">
    <!-- Page Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 px-2"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">API 接口管理</h2>
        <p class="mt-1 text-sm text-gray-500">管理系统中的所有API接口</p>
      </div>
      <div class="mt-4 md:mt-0">
        <button
          @click="showGroupManage = true"
          class="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          分组管理
        </button>
        <button
          @click="goAddApi"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          新增API
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-xl p-4 mb-6">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0"
      >
        <div class="w-full sm:w-48">
          <label
            for="method-filter"
            class="block text-sm font-medium text-gray-700 mb-1"
            >请求方法</label
          >
          <select
            id="method-filter"
            v-model="methodFilter"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">全部方法</option>
            <option v-for="m in methodOptions" :key="m" :value="m">
              {{ m }}
            </option>
          </select>
        </div>
        <div class="w-full sm:w-48">
          <label
            for="group-filter"
            class="block text-sm font-medium text-gray-700 mb-1"
            >分组</label
          >
          <select
            id="group-filter"
            v-model="groupFilter"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">全部分组</option>
            <option v-for="g in groupOptions" :key="g.id" :value="g.id">
              {{ g.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- API List -->
    <div class="bg-white shadow rounded-xl overflow-hidden">
      <!-- Desktop Table -->
      <div class="hidden sm:block w-full">
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead class="bg-gray-50">
              <tr class="border-b border-gray-200">
                <th
                  class="px-4 py-3 w-1/6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  名称
                </th>
                <th
                  class="px-4 py-3 w-1/4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  路径
                </th>
                <th
                  class="px-4 py-3 w-16 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  方法
                </th>
                <th
                  class="px-4 py-3 w-1/6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  分组
                </th>
                <th
                  class="px-4 py-3 w-24 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  请求次数
                </th>
                <th
                  class="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  创建时间
                </th>
                <th
                  class="px-4 py-3 w-24 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td
                  colspan="7"
                  class="px-6 py-4 text-center text-sm text-gray-500"
                >
                  <div class="flex justify-center">
                    <div
                      class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
                    ></div>
                  </div>
                </td>
              </tr>
              <tr v-else-if="apis.length === 0">
                <td
                  colspan="7"
                  class="px-6 py-4 text-center text-sm text-gray-500"
                >
                  暂无数据
                </td>
              </tr>
              <tr
                v-else
                v-for="api in filteredApis"
                :key="api.id"
                class="hover:bg-gray-50 align-middle"
              >
                <td class="px-4 py-3 text-sm text-gray-900 align-middle">
                  <div class="font-medium truncate" :title="api.title">
                    {{ api.title }}
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-500 align-middle">
                  <div class="font-mono break-all max-w-xs">
                    {{ api.url }}
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 align-middle">
                  <span
                    :class="{
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md whitespace-nowrap': true,
                      'bg-green-100 text-green-800': api.method === 'GET',
                      'bg-blue-100 text-blue-800': api.method === 'POST',
                      'bg-yellow-100 text-yellow-800':
                        api.method === 'PUT' || api.method === 'PATCH',
                      'bg-red-100 text-red-800': api.method === 'DELETE',
                    }"
                  >
                    {{ api.method }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 align-middle">
                  <div class="truncate max-w-xs">
                    {{ getGroupTitle(api.groupId) }}
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 align-middle">
                  {{ api.requestCount || 0 }}
                </td>
                <td
                  class="px-4 py-3 text-sm text-gray-500 align-middle whitespace-nowrap"
                >
                  {{ formatDate(api.createdAt) }}
                </td>
                <td class="px-4 py-3 text-right text-sm font-medium">
                  <div class="flex space-x-3 justify-end">
                    <button
                      @click="$router.push(`/admin/api/${api.id}`)"
                      class="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      编辑
                    </button>
                    <button
                      @click="openDeleteDialog(api)"
                      class="text-red-600 hover:text-red-900 hover:underline"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile List -->
      <div class="sm:hidden space-y-3 p-4">
        <div v-if="loading" class="flex justify-center p-6">
          <div
            class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>
        <div
          v-else-if="apis.length === 0"
          class="text-center p-6 text-base text-gray-500"
        >
          暂无数据
        </div>
        <div
          v-else
          v-for="api in filteredApis"
          :key="api.id"
          class="border border-gray-200 rounded-lg p-4 space-y-3 bg-white shadow-sm text-base"
        >
          <div class="flex justify-between items-start">
            <h3 class="font-medium text-gray-900 break-words pr-2">
              {{ api.title }}
            </h3>
            <span
              :class="{
                'px-2 py-1 text-sm font-semibold rounded-full whitespace-nowrap': true,
                'bg-green-100 text-green-800': api.method === 'GET',
                'bg-blue-100 text-blue-800': api.method === 'POST',
                'bg-yellow-100 text-yellow-800':
                  api.method === 'PUT' || api.method === 'PATCH',
                'bg-red-100 text-red-800': api.method === 'DELETE',
              }"
            >
              {{ api.method }}
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex items-start">
              <span class="text-gray-600 w-16 flex-shrink-0">路径:</span>
              <span class="font-mono text-gray-800 break-all">{{
                api.url
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-16 flex-shrink-0">分组:</span>
              <span class="text-gray-800">{{
                getGroupTitle(api.groupId)
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-16 flex-shrink-0">请求数:</span>
              <span class="text-gray-800">{{ api.requestCount || 0 }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-16 flex-shrink-0">创建时间:</span>
              <span class="text-gray-800">{{ formatDate(api.createdAt) }}</span>
            </div>
          </div>

          <div class="pt-2 flex justify-end space-x-3">
            <button
              @click="$router.push(`/admin/api/${api.id}`)"
              class="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
            >
              编辑
            </button>
            <button
              @click="openDeleteDialog(api)"
              class="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
            >
              删除
            </button>
          </div>
        </div>
      </div>

      <!-- 分页控件 -->
      <div
        v-if="pagination.total > 0"
        class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="handlePageChange(pagination.currentPage - 1)"
            :disabled="pagination.currentPage <= 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            上一页
          </button>
          <button
            @click="handlePageChange(pagination.currentPage + 1)"
            :disabled="
              pagination.currentPage * pagination.pageSize >= pagination.total
            "
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            下一页
          </button>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700">
              显示
              <span class="font-medium">{{
                (pagination.currentPage - 1) * pagination.pageSize + 1
              }}</span>
              到
              <span class="font-medium">{{
                Math.min(
                  pagination.currentPage * pagination.pageSize,
                  pagination.total
                )
              }}</span>
              条，共
              <span class="font-medium">{{ pagination.total }}</span> 条
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="handlePageChange(pagination.currentPage - 1)"
                :disabled="pagination.currentPage <= 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">上一页</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- 页码按钮 -->
              <template
                v-for="page in Math.ceil(
                  pagination.total / pagination.pageSize
                )"
                :key="page"
              >
                <button
                  v-if="
                    Math.abs(page - pagination.currentPage) <= 2 ||
                    page === 1 ||
                    page === Math.ceil(pagination.total / pagination.pageSize)
                  "
                  @click="handlePageChange(page)"
                  :class="{
                    'bg-blue-50 border-blue-500 text-blue-600 z-10':
                      page === pagination.currentPage,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
                      page !== pagination.currentPage,
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium': true,
                  }"
                >
                  {{ page }}
                </button>
                <span
                  v-else-if="Math.abs(page - pagination.currentPage) === 3"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              </template>

              <button
                @click="handlePageChange(pagination.currentPage + 1)"
                :disabled="
                  pagination.currentPage * pagination.pageSize >=
                  pagination.total
                "
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">下一页</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- 每页显示数量选择器 -->
      <div
        class="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-end"
      >
        <div class="flex items-center">
          <label for="page-size" class="mr-2 text-sm text-gray-700"
            >每页显示:</label
          >
          <select
            id="page-size"
            v-model="pagination.pageSize"
            @change="handlePageSizeChange(pagination.pageSize)"
            class="block w-20 pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div
        v-if="filteredApis.length === 0"
        class="text-center py-8 text-gray-500"
      >
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p class="mt-2 text-sm font-medium text-gray-700">暂无API数据</p>
        <p class="mt-1 text-sm text-gray-500">点击右上角"新增API"按钮添加</p>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div
      v-if="deleteDialogVisible"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDeleteDialog"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  确认删除
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    确定要删除 API
                    <span class="font-medium">{{ deleteTarget?.title }}</span>
                    吗？此操作不可撤销。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="doDelete"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              删除
            </button>
            <button
              type="button"
              @click="closeDeleteDialog"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分组管理弹窗 -->
    <GroupManagementModal
      v-model="showGroupManage"
      :groups="groupOptions"
      :new-group-name="newGroupName"
      :error="groupError"
      @update:new-group-name="(val) => (newGroupName = val)"
      @add="addGroupHandler"
      @delete="removeGroupHandler"
    />

    <MessageModal
      v-model="messageModal.show"
      :message="messageModal.text"
      :type="messageModal.type"
    />
  </div>
</template>

<script setup>
import GroupManagementModal from "~/components/admin/GroupManagementModal.vue";

definePageMeta({
  layout: "admin",
});
import { ref, computed, onMounted } from "vue";
import MessageModal from "~/components/MessageModal.vue";
import {
  getApiList,
  deleteApi,
  getGroupList,
  deleteGroup,
  addGroup,
} from "~/utils/api/index.js";
import { useRouter } from "vue-router";
const router = useRouter();

// 分页相关状态
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

// 计算可见页码
const visiblePages = computed(() => {
  const totalPages = Math.ceil(
    pagination.value.total / pagination.value.pageSize
  );
  const current = pagination.value.currentPage;
  const range = 2; // 显示当前页前后各2页

  let start = Math.max(1, current - range);
  let end = Math.min(totalPages, current + range);

  // 确保显示足够的页码
  if (current - range <= 1) {
    end = Math.min(1 + range * 2, totalPages);
  }
  if (current + range >= totalPages) {
    start = Math.max(1, totalPages - range * 2);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// 监听分页变化
const handlePageChange = (page) => {
  pagination.value.currentPage = page;
  fetchApis();
};

const handlePageSizeChange = (size) => {
  pagination.value.pageSize = size;
  pagination.value.currentPage = 1; // 重置到第一页
  fetchApis();
};

const methodOptions = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const groupOptions = ref([]); // [{id, title, description}]
const methodFilter = ref("");
const groupFilter = ref("");
const showGroupManage = ref(false);
const newGroupName = ref("");
const groupError = ref("");
const apis = ref([]);
const loading = ref(false);

const messageModal = ref({ show: false, text: "", type: "info" });
function showMessage(text, type = "info", duration = 2000) {
  messageModal.value = { show: false, text: "", type };
  setTimeout(() => {
    messageModal.value = { show: true, text, type };
    setTimeout(() => {
      messageModal.value.show = false;
    }, duration);
  }, 10);
}

async function fetchApis() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = user?.token || "";
  loading.value = true;
  try {
    const res = await getApiList(token, {
      page: pagination.value.currentPage,
      pageSize: pagination.value.pageSize,
    });

    if (res.code === 200 && res.data) {
      apis.value = res.data.list.map((api) => ({
        ...api,
        // Ensure all required fields have default values
        title: api.title || "未命名",
        url: api.url || "",
        method: api.method || "GET",
        requestCount: api.requestCount || 0,
        // Use createTime for display, fallback to current time if not available
        createdAt: api.createTime || new Date().toISOString(),
        groupId: api.groupId || null,
      }));
      pagination.value.total = res.data.total || 0;
    } else {
      apis.value = [];
      pagination.value.total = 0;
      showMessage(res.msg || "获取API列表失败", "error");
    }
  } catch (e) {
    console.error("获取API列表失败:", e);
    apis.value = [];
    pagination.value.total = 0;
    showMessage("获取API列表失败，请稍后重试", "error");
  } finally {
    loading.value = false;
  }
}

// 初始化加载数据
onMounted(() => {
  fetchApis();
});

async function fetchGroups() {
  // Only run on client side
  if (process.client) {
    try {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      const token = user?.token || "";
      const res = await getGroupList(token);
      if (res.code === 200 && Array.isArray(res.data)) {
        groupOptions.value = res.data;
      } else {
        groupOptions.value = [];
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      groupOptions.value = [];
    }
  } else {
    groupOptions.value = [];
  }
}

// Call fetchGroups in onMounted to ensure it runs on client side
onMounted(() => {
  fetchGroups();
});

const filteredApis = computed(() => {
  return apis.value.filter(
    (api) =>
      (!methodFilter.value || api.method === methodFilter.value) &&
      (!groupFilter.value || api.groupId === groupFilter.value)
  );
});
function getGroupTitle(id) {
  const g = groupOptions.value.find((g) => g.id === id);
  return g ? g.title : "";
}
function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleString();
}
function goAddApi() {
  router.push("/admin/api/new");
}
// 删除弹窗逻辑
const deleteDialogVisible = ref(false);
const deleteTarget = ref(null);
function openDeleteDialog(api) {
  deleteTarget.value = api;
  deleteDialogVisible.value = true;
}
function closeDeleteDialog() {
  deleteDialogVisible.value = false;
  deleteTarget.value = null;
}
async function doDelete() {
  if (deleteTarget.value) {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const token = user?.token || "";
    try {
      const res = await deleteApi(deleteTarget.value.id, token);
      if (res.code !== 200) {
        alert(res.msg || "删除失败");
      } else {
        fetchApis();
      }
    } catch (e) {
      alert(e.message || "删除失败");
    }
  }
  closeDeleteDialog();
}
// 分组管理逻辑
async function addGroupHandler() {
  const title = newGroupName.value.trim();
  if (!title) {
    showMessage("分组名不能为空", "error");
    return;
  }
  const description = "";
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = user?.token || "";
  try {
    const res = await addGroup(title, description, token);
    if (res.code !== 200) {
      showMessage(res.msg || "添加失败", "error");
      return;
    }
    newGroupName.value = "";
    showMessage("添加成功", "success");
    fetchGroups();
  } catch (e) {
    showMessage(e.message || "添加失败", "error");
  }
}
async function removeGroupHandler(group) {
  try {
    if (!group || !group.id) {
      showMessage("无效的分组", "error");
      return;
    }
    
    if (groupOptions.value.length <= 1) {
      showMessage("至少保留一个分组", "warn");
      return;
    }
    
    if (!confirm(`确定删除分组"${group.title}"？`)) {
      return;
    }
    
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const token = user?.token || "";
    
    const res = await deleteGroup(group.id, token);
    if (res.code !== 200) {
      showMessage(res.msg || "删除失败", "error");
      return;
    }
    
    showMessage("删除成功", "success");
    fetchGroups();
  } catch (e) {
    console.error("删除分组失败:", e);
    showMessage(e.message || "删除失败，请重试", "error");
  }
}
function closeGroupManage() {
  showGroupManage.value = false;
  groupError.value = "";
}
</script>

<!-- Remove all custom styles as we're using Tailwind CSS -->
<style scoped>
/* Table styles */
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

/* Make table take full width of container */
.table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

thead {
  background-color: #f9fafb;
  position: sticky;
  top: 0;
  z-index: 10;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Allow URL to wrap */
td:nth-child(2) {
  white-space: normal;
  word-break: break-word;
  max-width: 300px;
  min-width: 200px;
}

/* Adjust column widths */
th:nth-child(1),
td:nth-child(1) {
  width: 180px;
}
th:nth-child(3),
td:nth-child(3) {
  width: 80px;
}
th:nth-child(4),
td:nth-child(4) {
  width: 120px;
}
th:nth-child(5),
td:nth-child(5) {
  width: 100px;
}
th:nth-child(6),
td:nth-child(6) {
  width: 140px;
}
th:nth-child(7),
td:nth-child(7) {
  width: 120px;
}

th {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  color: #6b7280;
  position: relative;
  font-weight: 500;
}

tbody tr:hover {
  background-color: #f9fafb;
}

/* Ensure URL wraps properly */
td:nth-child(2) {
  word-break: break-word;
  white-space: normal;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  white-space: nowrap;
}

.action-buttons button {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}

.action-buttons button:hover {
  text-decoration: underline;
}

td,
th {
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Allow URL to wrap */
td:nth-child(2) {
  white-space: normal;
  word-break: break-word;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Ensure no horizontal scrolling on mobile */
html,
body,
#__nuxt,
#__layout {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
  margin: 0;
  padding: 0;
}

/* Desktop styles */
@media (min-width: 768px) {
  /* Table container */
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    /* padding: 0 1rem; */
    width: 100%;
  }

  /* Table styles */
  table {
    display: table;
    min-width: 100%;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  /* Table structure */
  thead,
  tbody {
    display: table-row-group;
    width: 100%;
  }

  tr {
    display: table-row;
    width: 100%;
  }

  th,
  td {
    display: table-cell;
    vertical-align: middle;
    padding: 12px 8px;
    line-height: 1.5;
  }

  /* Table header styles */
  thead th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #4b5563;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    border-bottom: 2px solid #e5e7eb;
  }

  /* Table body styles */
  tbody td {
    border-bottom: 1px solid #e5e7eb;
    color: #1f2937;
    font-size: 0.875rem;
  }

  /* Hover effect */
  tbody tr:hover {
    background-color: #f9fafb;
  }

  /* Table header */
  thead th {
    position: sticky;
    top: 0;
    background-color: #f9fafb;
    z-index: 10;
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb;
  }

  /* Table rows */
  tbody tr {
    border-bottom: 1px solid #e5e7eb;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }

  /* Table cells */
  td,
  th {
    padding: 0.75rem 1rem;
    vertical-align: middle;
  }

  td {
    font-size: 0.875rem;
    color: #1f2937;
  }

  /* URL column */
  td:nth-child(2) {
    white-space: normal;
    word-break: break-word;
    font-family: monospace;
  }

  /* Method badge */
  .method-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  /* Action buttons */
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .action-buttons button {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Full width container */
  .w-full {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  }

  /* Hide data labels on desktop */
  td:before {
    display: none;
  }

  /* Make sure the table container doesn't cause horizontal scroll */

  /* Reset mobile styles */
  table {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }
}

/* Responsive container */
.py-6 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  width: 100%;
  box-sizing: border-box;
}

/* Table container */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  width: 100%;
  position: relative;
}

/* Table styles */
table {
  min-width: 100%;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}

/* Table cells */
td,
th {
  padding: 0.75rem 0.5rem;
  text-align: left;
  vertical-align: middle;
}

/* Mobile styles */
@media (max-width: 767px) {
  /* Reset body and html to ensure consistent margins */
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }

  /* Ensure proper text size on mobile */
  html {
    -webkit-text-size-adjust: 100%;
  }

  /* Fix select dropdowns on mobile */
  select,
  input,
  button,
  textarea {
    font-size: 16px !important; /* Prevent iOS zoom on focus */
  }

  /* Fix dropdown menu */
  .dropdown-menu {
    position: fixed;
    z-index: 1000;
    width: auto;
    min-width: 200px;
    font-size: 16px;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }

  .dropdown-divider {
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid #e9ecef;
  }

  /* Reset all table elements */
  table {
    width: 100% !important;
    max-width: 100% !important;
    table-layout: fixed;
  }

  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
  }
  /* Reset table layout */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    width: 100%;
  }

  /* Hide table header */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  /* Style table rows as cards */
  tbody tr {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  /* Style table cells */
  tbody td {
    border: none;
    border-bottom: 1px solid #f3f4f6;
    position: relative;
    padding: 0.75rem;
    padding-left: 35%;
    min-height: 3rem;
    display: flex;
    align-items: center;
  }

  /* Add labels */
  tbody td:before {
    content: attr(data-label);
    position: absolute;
    left: 0.75rem;
    width: 30%;
    font-weight: 500;
    color: #6b7280;
  }

  /* Remove border from last cell */
  tbody tr td:last-child {
    border-bottom: none;
  }

  /* Style action buttons */
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 0;
  }

  .action-buttons button {
    margin-left: 0.75rem;
  }

  /* Ensure content doesn't overflow */
  td > div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Special handling for URL */
  .break-all {
    word-break: break-word;
  }
}

/* Responsive table container */

/* Ensure table cells don't overflow on mobile */
@media (max-width: 767px) {
  .whitespace-nowrap {
    white-space: normal !important;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Make sure the table container doesn't cause horizontal scroll */
  .overflow-hidden {
    overflow: visible;
  }
}
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

/* Ensure tables don't overflow */
table {
  min-width: 100%;
  width: 100%;
  table-layout: auto;
}

/* Make sure modals don't cause overflow */
.modal-container {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

/* Responsive buttons */
@media (max-width: 640px) {
  .flex.flex-col.sm\:flex-row {
    flex-direction: column;
  }

  .space-y-3.sm\:space-y-0 {
    margin-top: 0.75rem;
  }

  .sm\:w-48 {
    width: 100%;
    margin-bottom: 0.75rem;
  }

  .sm\:space-x-4 {
    margin-left: 0;
    margin-right: 0;
  }

  .sm\:space-x-4 > * + * {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

/* Pagination fixes */
@media (max-width: 640px) {
  .hidden.sm\:flex-1 {
    display: none;
  }

  .space-x-2 {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .space-x-2 > * {
    margin: 0.25rem;
  }
}

/* Modal fixes */
@media (max-width: 640px) {
  .sm\:p-6 {
    padding: 1rem;
  }

  .sm\:px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .sm\:py-5 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

/* Ensure no content overflows */
* {
  box-sizing: border-box;
}

/* Fix for iOS viewport units */
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
}

/* Status badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Empty state */
.empty-state {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #6b7280;
}

.empty-state svg {
  margin: 0 auto 1rem;
  color: #d1d5db;
}

.empty-state h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* Add responsive styles here if needed */
}

/* Modal styles */
.modal-form-item {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-form-item label {
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}

.modal-form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.modal-content {
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.modal-error {
  color: #ef4444;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: right;
}

.param-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
}
.group-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}
textarea {
  resize: vertical;
}
@media (max-width: 900px) {
  .admin-section-title {
    font-size: 1rem;
  }
  .add-btn {
    font-size: 0.98rem;
    padding: 7px 10px;
  }
  .admin-table th,
  .admin-table td {
    font-size: 0.95rem;
    padding: 7px 4px;
  }
  .admin-table {
    border-radius: 6px;
  }
  .admin-filter-bar {
    flex-wrap: wrap;
    gap: 8px;
  }
  .admin-filter-select {
    font-size: 0.98rem;
    padding: 5px 8px;
  }
  .edit-btn,
  .group-manage-btn {
    font-size: 0.95rem;
    padding: 5px 10px;
  }
  .modal-dialog {
    padding: 14px 6px 10px 6px;
    min-width: 90vw;
  }
}
@media (max-width: 700px) {
  .admin-section-title {
    font-size: 0.98rem;
  }
  .add-btn {
    font-size: 0.92rem;
    padding: 6px 6px;
  }
  .admin-table th,
  .admin-table td {
    font-size: 0.9rem;
    padding: 5px 2px;
  }
  .admin-table {
    border-radius: 4px;
  }
  .admin-filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .admin-filter-select {
    font-size: 0.92rem;
    padding: 4px 6px;
  }
  .edit-btn,
  .group-manage-btn {
    font-size: 0.9rem;
    padding: 4px 7px;
    margin-right: 4px;
  }
  .modal-dialog {
    padding: 8px 2px 6px 2px;
    min-width: 98vw;
  }
  .modal-title {
    font-size: 1rem;
  }
  .modal-form-item label {
    font-size: 0.95rem;
  }
  .modal-form-item input,
  .modal-form-item select {
    font-size: 0.95rem;
  }
  .modal-form-actions {
    gap: 8px;
  }
  .admin-empty {
    font-size: 0.95rem;
  }
}
</style>
