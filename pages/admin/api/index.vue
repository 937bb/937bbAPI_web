<template>
  <div class="py-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">API 接口管理</h2>
        <p class="mt-1 text-sm text-gray-500">管理系统中的所有API接口</p>
      </div>
      <div class="mt-4 md:mt-0">
        <button
          @click="showGroupManage = true"
          class="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          分组管理
        </button>
        <button
          @click="goAddApi"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新增API
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-xl p-4 mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
        <div class="w-full sm:w-48">
          <label for="method-filter" class="block text-sm font-medium text-gray-700 mb-1">请求方法</label>
          <select
            id="method-filter"
            v-model="methodFilter"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">全部方法</option>
            <option v-for="m in methodOptions" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
        <div class="w-full sm:w-48">
          <label for="group-filter" class="block text-sm font-medium text-gray-700 mb-1">分组</label>
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
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">路径</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分组</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求次数</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="api in filteredApis" :key="api.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ api.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-mono text-gray-500">{{ api.url }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="{
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                    'bg-green-100 text-green-800': api.method === 'GET',
                    'bg-blue-100 text-blue-800': api.method === 'POST',
                    'bg-yellow-100 text-yellow-800': api.method === 'PUT' || api.method === 'PATCH',
                    'bg-red-100 text-red-800': api.method === 'DELETE'
                  }"
                >
                  {{ api.method }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ getGroupTitle(api.groupId) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ api.requestCount || 0 }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(api.createTime) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink :to="`/admin/api/${api.id}`" class="text-blue-600 hover:text-blue-900 mr-4">编辑</NuxtLink>
                <button @click="openDeleteDialog(api)" class="text-red-600 hover:text-red-900">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredApis.length === 0" class="text-center py-8 text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p class="mt-2 text-sm font-medium text-gray-700">暂无API数据</p>
        <p class="mt-1 text-sm text-gray-500">点击右上角"新增API"按钮添加</p>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="deleteDialogVisible" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeDeleteDialog"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  确认删除
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    确定要删除 API <span class="font-medium">{{ deleteTarget?.title }}</span> 吗？此操作不可撤销。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="doDelete" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              删除
            </button>
            <button type="button" @click="closeDeleteDialog" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分组管理弹窗 -->
    <div v-if="showGroupManage" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeGroupManage"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  分组管理
                </h3>
                <div class="mt-4">
                  <div class="mb-6">
                    <label for="new-group" class="block text-sm font-medium text-gray-700 mb-1">新增分组</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="new-group"
                        v-model="newGroupName"
                        maxlength="16"
                        class="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                        placeholder="输入分组名称"
                      />
                      <button
                        type="button"
                        @click="addGroupHandler"
                        class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        添加
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">已有分组</label>
                    <div class="bg-gray-50 rounded-md -space-y-px">
                      <div v-for="(g, idx) in groupOptions" :key="g.id" class="relative border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center hover:bg-gray-100 focus:outline-none">
                        <input
                          v-model="g.title"
                          maxlength="16"
                          class="bg-transparent border-0 p-0 focus:ring-0 focus:outline-none block w-full sm:text-sm"
                          :disabled="true"
                        />
                        <button
                          @click="() => removeGroupHandler(idx)"
                          class="text-red-600 hover:text-red-800"
                        >
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p v-if="groupError" class="mt-2 text-sm text-red-600">{{ groupError }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="closeGroupManage"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>

    <MessageModal
      v-model="messageModal.show"
      :message="messageModal.text"
      :type="messageModal.type"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

const methodOptions = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const groupOptions = ref([]); // [{id, title, description}]
const methodFilter = ref("");
const groupFilter = ref("");
const showGroupManage = ref(false);
const newGroupName = ref("");
const groupError = ref("");
const apis = ref([]);

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
  try {
    const res = await getApiList(token);
    if (res.code === 200 && Array.isArray(res.data)) {
      apis.value = res.data;
    } else {
      apis.value = [];
    }
  } catch (e) {
    apis.value = [];
  }
}
fetchApis();

async function fetchGroups() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = user?.token || "";
  try {
    const res = await getGroupList(token);
    if (res.code === 200 && Array.isArray(res.data)) {
      groupOptions.value = res.data;
    } else {
      groupOptions.value = [];
    }
  } catch {
    groupOptions.value = [];
  }
}
fetchGroups();

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
async function removeGroupHandler(idx) {
  if (groupOptions.value.length <= 1) {
    showMessage("至少保留一个分组", "warn");
    return;
  }
  const id = groupOptions.value[idx].id;
  if (!confirm(`确定删除分组“${groupOptions.value[idx].title}”？`)) return;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = user?.token || "";
  try {
    const res = await deleteGroup(id, token);
    if (res.code !== 200) {
      showMessage(res.msg || "删除失败", "error");
      return;
    }
    showMessage("删除成功", "success");
    fetchGroups();
  } catch (e) {
    showMessage(e.message || "删除失败", "error");
  }
}
function closeGroupManage() {
  showGroupManage.value = false;
  groupError.value = "";
}
</script>

<!-- Remove all custom styles as we're using Tailwind CSS -->
<style scoped>
/* Custom styles can be added here if needed */

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
  .admin-section-title { font-size: 1rem; }
  .add-btn { font-size: 0.98rem; padding: 7px 10px; }
  .admin-table th, .admin-table td { font-size: 0.95rem; padding: 7px 4px; }
  .admin-table { border-radius: 6px; }
  .admin-filter-bar { flex-wrap: wrap; gap: 8px; }
  .admin-filter-select { font-size: 0.98rem; padding: 5px 8px; }
  .edit-btn, .group-manage-btn { font-size: 0.95rem; padding: 5px 10px; }
  .modal-dialog { padding: 14px 6px 10px 6px; min-width: 90vw; }
}
@media (max-width: 700px) {
  .admin-section-title { font-size: 0.98rem; }
  .add-btn { font-size: 0.92rem; padding: 6px 6px; }
  .admin-table th, .admin-table td { font-size: 0.9rem; padding: 5px 2px; }
  .admin-table { border-radius: 4px; }
  .admin-filter-bar { flex-direction: column; align-items: stretch; gap: 6px; }
  .admin-filter-select { font-size: 0.92rem; padding: 4px 6px; }
  .edit-btn, .group-manage-btn { font-size: 0.9rem; padding: 4px 7px; margin-right: 4px; }
  .modal-dialog { padding: 8px 2px 6px 2px; min-width: 98vw; }
  .modal-title { font-size: 1rem; }
  .modal-form-item label { font-size: 0.95rem; }
  .modal-form-item input, .modal-form-item select { font-size: 0.95rem; }
  .modal-form-actions { gap: 8px; }
  .admin-empty { font-size: 0.95rem; }
}
</style>
