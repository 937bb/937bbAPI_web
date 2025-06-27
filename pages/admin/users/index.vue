<template>
  <div class="w-full px-4 py-4">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 px-2">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">用户管理</h2>
        <p class="mt-1 text-sm text-gray-500">管理系统用户账户和权限</p>
      </div>
      <div class="mt-4 md:mt-0">
        <button
            @click="goAddUser"
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
            新增用户
          </button>
      </div>
    </div>

    <!-- User Table -->
    <div class="bg-white shadow rounded-xl overflow-hidden">
      <!-- Desktop Table -->
      <div class="hidden sm:block w-full">
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead class="bg-gray-50">
              <tr class="border-b border-gray-200">
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">昵称</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="users.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                  暂无数据
                </td>
              </tr>
              <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-50 align-middle">
                <td class="px-4 py-3 text-sm text-gray-900">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span class="text-gray-600 text-sm font-medium">{{ user.username?.charAt(0)?.toUpperCase() || 'U' }}</span>
                    </div>
                    <div class="truncate">
                      <div class="font-medium text-gray-900">{{ user.username }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">
                  {{ user.nickname || '未设置' }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">
                  {{ user.email || '未设置' }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <span :class="{
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap': true,
                    'bg-blue-100 text-blue-800': user.role === 'admin',
                    'bg-gray-100 text-gray-800': user.role !== 'admin',
                  }">
                    {{ user.role === 'admin' ? '管理员' : '用户' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <span :class="{
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap': true,
                    'bg-green-100 text-green-800': user.status === 0,
                    'bg-red-100 text-red-800': user.status !== 0,
                  }">
                    {{ user.status === 0 ? "正常" : "禁用" }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center justify-end space-x-2">
                    <NuxtLink 
                      :to="`/admin/users/${user.id}`" 
                      class="text-sm text-blue-600 hover:text-blue-800 px-2.5 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
                    >
                      编辑
                    </NuxtLink>
                    <button 
                      @click="openDeleteDialog(user)" 
                      class="text-sm text-red-600 hover:text-red-800 px-2.5 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors whitespace-nowrap"
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

      <!-- Mobile List View -->
      <div class="sm:hidden space-y-3 p-4">
        <div v-if="users.length === 0" class="text-center p-6 text-base text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="mt-2 text-base font-medium text-gray-900">暂无用户</h3>
          <p class="mt-1 text-sm text-gray-500">点击上方按钮添加新用户</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="user in users" :key="user.id" class="border border-gray-200 rounded-lg p-4 space-y-3 bg-white shadow-sm">
            <div class="flex justify-between items-start">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span class="text-gray-600 font-medium">{{ user.username?.charAt(0)?.toUpperCase() || 'U' }}</span>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ user.username }}</h3>
                  <div class="flex items-center space-x-2 mt-1">
                    <span :class="{
                      'px-2 py-0.5 text-xs font-medium rounded-full': true,
                      'bg-blue-100 text-blue-800': user.role === 'admin',
                      'bg-gray-100 text-gray-800': user.role !== 'admin',
                    }">
                      {{ user.role === 'admin' ? '管理员' : '用户' }}
                    </span>
                    <span :class="{
                      'px-2 py-0.5 text-xs font-medium rounded-full': true,
                      'bg-green-100 text-green-800': user.status === 0,
                      'bg-red-100 text-red-800': user.status !== 0,
                    }">
                      {{ user.status === 0 ? '正常' : '禁用' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-2 pt-2 border-t border-gray-100">
              <div class="flex items-center">
                <span class="text-gray-500 w-16 flex-shrink-0">昵称:</span>
                <span class="text-gray-800">{{ user.nickname || '未设置' }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-16 flex-shrink-0">邮箱:</span>
                <span class="text-gray-800 break-all">{{ user.email || '未设置' }}</span>
              </div>
            </div>
            
            <div class="pt-2 flex justify-end space-x-3">
              <button 
                @click="$router.push(`/admin/users/${user.id}`)" 
                class="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
              >
                编辑
              </button>
              <button 
                @click="openDeleteDialog(user)" 
                class="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="handlePageChange(pagination.currentPage - 1)"
            :disabled="pagination.currentPage <= 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <button
            @click="handlePageChange(pagination.currentPage + 1)"
            :disabled="pagination.currentPage * pagination.pageSize >= pagination.total"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示
              <span class="font-medium">
                {{ (pagination.currentPage - 1) * pagination.pageSize + 1 }}
              </span>
              到
              <span class="font-medium">
                {{ Math.min(pagination.currentPage * pagination.pageSize, pagination.total) }}
              </span>
              条，共
              <span class="font-medium">{{ pagination.total }}</span>
              条
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="handlePageChange(pagination.currentPage - 1)"
                :disabled="pagination.currentPage <= 1"
                :class="{
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium': true,
                  'text-gray-500 hover:bg-gray-50': pagination.currentPage > 1,
                  'text-gray-300 cursor-not-allowed': pagination.currentPage <= 1
                }"
              >
                <span class="sr-only">上一页</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Page numbers -->
              <template v-for="page in visiblePages" :key="page">
                <button
                  v-if="page === '...'"
                  disabled
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  {{ page }}
                </button>
                <button
                  v-else
                  @click="handlePageChange(page)"
                  :class="{
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium': true,
                    'z-10 bg-blue-50 border-blue-500 text-blue-600': page === pagination.currentPage,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== pagination.currentPage
                  }"
                >
                  {{ page }}
                </button>
              </template>
              
              <button
                @click="handlePageChange(pagination.currentPage + 1)"
                :disabled="pagination.currentPage * pagination.pageSize >= pagination.total"
                :class="{
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium': true,
                  'text-gray-500 hover:bg-gray-50': pagination.currentPage * pagination.pageSize < pagination.total,
                  'text-gray-300 cursor-not-allowed': pagination.currentPage * pagination.pageSize >= pagination.total
                }"
              >
                <span class="sr-only">下一页</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Page Size Selector -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1"></div>
        <div class="flex items-center space-x-2">
          <label for="page-size" class="text-sm text-gray-700">每页显示:</label>
          <select
            id="page-size"
            v-model="pagination.pageSize"
            @change="handlePageSizeChange(pagination.pageSize)"
            class="block w-20 pl-3 pr-8 py-1.5 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="deleteDialogVisible" class="fixed z-50 inset-0 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
                确定要删除用户 "{{ deleteTarget?.username }}"
                吗？此操作不可撤销。
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
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
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MessageModal from "~/components/MessageModal.vue";
import { getUserList } from "~/utils/api/index";

const router = useRouter();
const users = ref([]);
const messageModal = ref({ show: false, text: "", type: "info" });
const deleteDialogVisible = ref(false);
const deleteTarget = ref(null);

// 分页相关状态
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

function goAddUser() {
  router.push("/admin/users/new");
}

// 计算可见页码
const visiblePages = computed(() => {
  const totalPages = Math.ceil(pagination.value.total / pagination.value.pageSize);
  const current = pagination.value.currentPage;
  const range = 2; // 显示当前页前后各2页
  
  // 如果总页数较少，直接返回所有页码
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  let start = Math.max(1, current - range);
  let end = Math.min(totalPages, current + range);
  
  // 调整页码范围，确保显示足够的页码
  if (current - range <= 1) {
    end = Math.min(1 + range * 2, totalPages);
  }
  if (current + range >= totalPages) {
    start = Math.max(1, totalPages - range * 2);
  }
  
  const pages = [];
  
  // 添加第一页
  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push('...');
    }
  }
  
  // 添加中间页码
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  // 添加最后一页
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }
  
  return pages;
});

// 监听分页变化
const handlePageChange = (page) => {
  pagination.value.currentPage = page;
  fetchUsers();
};

const handlePageSizeChange = (size) => {
  pagination.value.pageSize = Number(size);
  pagination.value.currentPage = 1; // 重置到第一页
  fetchUsers();
};

// 显示消息提示
function showMessage(text, type = "info", duration = 3000) {
  messageModal.value = { show: true, text, type };
  if (duration > 0) {
    setTimeout(() => {
      messageModal.value.show = false;
    }, duration);
  }
}

// 获取用户列表
async function fetchUsers() {
  try {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const token = user?.token || "";
    const res = await getUserList(token, {
      page: pagination.value.currentPage,
      pageSize: pagination.value.pageSize,
    });

    if (res.code === 200 && res.data) {
      // 确保 data 是数组，如果不是则转换为数组
      const userList = Array.isArray(res.data.list) ? res.data.list : [res.data];
      users.value = userList.map((u) => ({
        id: u.id,
        username: u.account,
        nickname: u.account, // 后端无昵称字段，默认用账号
        email: u.email || "",
        role: u.isAdmin === 1 ? "admin" : "user",
        status: u.status || 0,
      }));
      // 如果没有返回总数，使用数组长度作为总数
      pagination.value.total = res.data.total || userList.length;
    } else {
      users.value = [];
      pagination.value.total = 0;
      throw new Error(res.message || "获取用户列表失败");
    }
  } catch (error) {
    console.error("获取用户列表失败:", error);
    showMessage(error.message || "获取用户列表失败", "error");
  } finally {
  }
}

// 初始化加载数据
onMounted(() => {
  fetchUsers();
});

// 跳转到编辑用户页面
const editUser = (user) => {
  navigateTo(`/admin/users/${user.id}`);
};

// 打开删除确认弹窗
function openDeleteDialog(user) {
  deleteTarget.value = user;
  deleteDialogVisible.value = true;
}

// 关闭删除确认弹窗
function closeDeleteDialog() {
  deleteDialogVisible.value = false;
  deleteTarget.value = null;
}

// 执行删除操作
async function doDelete() {
  if (!deleteTarget.value) return;

  try {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const token = user?.token || "";

    if (!token) {
      throw new Error("用户未登录或登录已过期");
    }

    // const res = await deleteUser(deleteTarget.value.id, token);

    if (res.code === 200) {
      showMessage("删除用户成功", "success");

      // 如果当前页只有一条数据且不是第一页，则返回上一页
      if (users.value.length === 1 && pagination.value.currentPage > 1) {
        pagination.value.currentPage--;
      }

      // 重新获取用户列表以更新分页
      await fetchUsers();
    } else {
      throw new Error(res.message || "删除用户失败");
    }
  } catch (error) {
    console.error("删除用户失败:", error);
    showMessage(error.message || "删除用户失败", "error");
  } finally {
    closeDeleteDialog();
  }
}
</script>

<style scoped>
/* Responsive layout */
@media (max-width: 767px) {
  .container {
    width: 100%;
    max-width: 100%;
    padding: 0 0.5rem;
  }

  .overflow-x-auto {
    width: 100%;
    margin: 0 -0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 0.5rem;
  }

  table {
    min-width: 100%;
    width: max-content;
  }

  th,
  td {
    padding: 0.5rem 0.5rem;
    font-size: 0.8125rem;
  }

  th:first-child,
  td:first-child {
    padding-left: 1rem;
  }

  th:last-child,
  td:last-child {
    padding-right: 1rem;
  }

  .text-sm {
    font-size: 0.8125rem;
  }

  .text-xs {
    font-size: 0.75rem;
  }
}

/* Base styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Table styles */
.table-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.table {
  min-width: 100%;
  border-collapse: collapse;
}

.table thead th {
  background-color: #f9fafb;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1.5rem;
  text-align: left;
}

.table tbody tr {
  border-top: 1px solid #f3f4f6;
  transition: background-color 0.15s ease-in-out;
}

.table tbody tr:hover {
  background-color: #f9fafb;
}

.table tbody td {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  vertical-align: middle;
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

/* Action buttons */
.action-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.15s ease-in-out;
}

.action-btn + .action-btn {
  margin-left: 0.5rem;
}

.btn-edit {
  color: #2563eb;
  background-color: #eff6ff;
}

.btn-edit:hover {
  background-color: #dbeafe;
}

.btn-delete {
  color: #dc2626;
  background-color: #fef2f2;
}

.btn-delete:hover {
  background-color: #fee2e2;
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
  .table thead {
    display: none;
  }

  .table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem;
  }

  .table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border: none;
  }

  .table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
    margin-right: 1rem;
  }

  .table tbody td:last-child {
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid #f3f4f6;
  }

  .table tbody td:last-child::before {
    display: none;
  }
}
</style>
