<template>
  <div>
    <div class="admin-section-title">API接口管理</div>
    <div class="admin-filter-bar">
      <select v-model="methodFilter" class="admin-filter-select">
        <option value="">全部方法</option>
        <option v-for="m in methodOptions" :key="m" :value="m">{{ m }}</option>
      </select>
      <select v-model="groupFilter" class="admin-filter-select">
        <option value="">全部分组</option>
        <option v-for="g in groupOptions" :key="g.id" :value="g.id">
          {{ g.title }}
        </option>
      </select>
      <button class="group-manage-btn" @click="showGroupManage = true">
        分组管理
      </button>
    </div>
    <button class="add-btn" @click="goAddApi">新增API</button>
    <table class="admin-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>路径</th>
          <th>方法</th>
          <th>分组</th>
          <th>请求次数</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api in filteredApis" :key="api.id">
          <td>{{ api.title }}</td>
          <td class="mono">{{ api.url }}</td>
          <td>{{ api.method }}</td>
          <td>{{ getGroupTitle(api.groupId) }}</td>
          <td>{{ api.requestCount }}</td>
          <td>{{ formatDate(api.createTime) }}</td>
          <td>
            <NuxtLink :to="`/admin/api/${api.id}`" class="edit-btn"
              >编辑</NuxtLink
            >
            <button class="edit-btn delete" @click="openDeleteDialog(api)">
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="filteredApis.length === 0" class="admin-empty">暂无API</div>

    <!-- 删除确认弹窗 -->
    <div v-if="deleteDialogVisible" class="modal-mask">
      <div class="modal-dialog">
        <div class="modal-title">确认删除</div>
        <div class="modal-content">
          确定要删除 API <b>{{ deleteTarget?.title }}</b> 吗？此操作不可撤销。
        </div>
        <div class="modal-form-actions">
          <button class="edit-btn delete" @click="doDelete">删除</button>
          <button class="edit-btn cancel" @click="closeDeleteDialog">
            取消
          </button>
        </div>
      </div>
    </div>

    <!-- 分组管理弹窗 -->
    <div v-if="showGroupManage" class="modal-mask">
      <div class="modal-dialog" style="min-width: 340px; max-width: 96vw">
        <div class="modal-title">分组管理</div>
        <div class="modal-form-item">
          <label>新增分组</label>
          <div style="display: flex; gap: 10px; align-items: center">
            <input
              v-model="newGroupName"
              maxlength="16"
              placeholder="分组名"
              style="flex: 1"
            />
            <button class="edit-btn" @click="addGroupHandler">添加</button>
          </div>
        </div>
        <div class="modal-form-item">
          <label>已有分组</label>
          <div v-for="(g, idx) in groupOptions" :key="g.id" class="group-row">
            <input
              v-model="g.title"
              maxlength="16"
              style="width: 120px"
              disabled
            />
            <button
              class="edit-btn delete"
              @click="() => removeGroupHandler(idx)"
            >
              删除
            </button>
          </div>
          <div v-if="groupError" class="modal-error">{{ groupError }}</div>
        </div>
        <div class="modal-form-actions">
          <button class="edit-btn" @click="closeGroupManage">完成</button>
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

<style scoped>
.admin-section-title {
  font-size: 1.15rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 18px;
}
.add-btn {
  background: linear-gradient(90deg, #6366f1, #60a5fa);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 18px;
  box-shadow: 0 1.5px 8px 0 rgba(45, 140, 240, 0.07);
  transition: background 0.2s;
}
.add-btn:hover {
  background: linear-gradient(90deg, #60a5fa, #6366f1);
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1.5px 8px 0 rgba(45, 140, 240, 0.04);
}
.admin-table th,
.admin-table td {
  border: 1px solid #e6e6e6;
  padding: 12px 18px;
  text-align: left;
  font-size: 1.07rem;
}
.admin-table th {
  background: #f0f7ff;
  color: #0284c7;
  font-weight: 700;
}
.mono {
  font-family: monospace;
  color: #6366f1;
}
.edit-btn {
  background: #e0e7ff;
  color: #6366f1;
  border: none;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 1.02rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: #6366f1;
  color: #fff;
}
.edit-btn.cancel {
  background: #f1f5f9;
  color: #bbb;
}
.edit-btn.delete {
  background: #fee2e2;
  color: #ef4444;
}
.edit-btn.delete:hover {
  background: #ef4444;
  color: #fff;
}
.admin-empty {
  color: #bbb;
  font-size: 1.03rem;
  padding: 8px 0;
  text-align: center;
}
.admin-filter-bar {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-bottom: 12px;
}
.admin-filter-select {
  padding: 6px 18px;
  border-radius: 8px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.05rem;
  color: #6366f1;
  background: #f8fafc;
}
.group-manage-btn {
  background: #e0e7ff;
  color: #6366f1;
  border: none;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 1.01rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.group-manage-btn:hover {
  background: #6366f1;
  color: #fff;
}
.modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-dialog {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 18px 0 rgba(45, 140, 240, 0.13);
  padding: 28px 32px 18px 32px;
  min-width: 320px;
  max-width: 96vw;
}
.modal-title {
  font-size: 1.13rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 18px;
}
.modal-form-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.modal-form-item label {
  font-size: 1.01rem;
  color: #555;
}
.modal-form-item input,
.modal-form-item select {
  padding: 7px 12px;
  border-radius: 7px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.05rem;
  color: #6366f1;
  background: #f8fafc;
}
.modal-form-actions {
  display: flex;
  gap: 18px;
  justify-content: flex-end;
  margin-top: 12px;
}
.modal-error {
  color: #ef4444;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: right;
}
.modal-content {
  font-size: 1.05rem;
  color: #444;
  margin-bottom: 18px;
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
</style>
