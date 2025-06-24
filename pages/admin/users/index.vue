<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">用户管理</h1>
        <p class="text-gray-600 mt-1">管理系统用户账户和权限</p>
      </div>
      <button 
        @click="openAddUser"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        新增用户
      </button>
    </div>

    <!-- User Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">加载中...</p>
      </div>
      
      <div v-else>
        <div v-if="users.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">暂无用户</h3>
          <p class="mt-1 text-gray-500">点击上方按钮添加新用户</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">昵称</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <NuxtLink :to="`/admin/users/${user.id}`" class="text-blue-600 hover:text-blue-800 font-medium">
                    {{ user.username }}
                  </NuxtLink>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.nickname || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.email || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-green-100 text-green-800': user.role === 'admin',
                      'bg-blue-100 text-blue-800': user.role !== 'admin'
                    }"
                  >
                    {{ user.role === 'admin' ? '管理员' : '普通用户' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-green-100 text-green-800': user.status === 0,
                      'bg-red-100 text-red-800': user.status !== 0
                    }"
                  >
                    {{ user.status === 0 ? '正常' : '禁用' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <NuxtLink 
                    :to="`/admin/users/${user.id}`" 
                    class="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    编辑
                  </NuxtLink>
                  <button 
                    @click="openDeleteDialog(user)"
                    class="text-red-600 hover:text-red-900"
                  >
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div v-if="showAddDialog" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ editingUser.id ? '编辑用户' : '添加用户' }}
              </h3>
              <button 
                @click="closeAddDialog"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">关闭</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="mt-2 space-y-4">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
                <input 
                  type="text" 
                  id="username"
                  v-model="addForm.username" 
                  :disabled="!!editingUser.id"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  maxlength="32"
                />
              </div>
              <div v-if="!editingUser.id">
                <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                <input 
                  type="password" 
                  id="password"
                  v-model="addForm.password" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :required="!editingUser.id"
                />
              </div>
              <div>
                <label for="nickname" class="block text-sm font-medium text-gray-700">昵称</label>
                <input 
                  type="text" 
                  id="nickname"
                  v-model="addForm.nickname" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  maxlength="32"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
                <input 
                  type="email" 
                  id="email"
                  v-model="addForm.email" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  maxlength="64"
                />
              </div>
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700">角色</label>
                <select 
                  id="role"
                  v-model="addForm.role"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
                <select 
                  id="status"
                  v-model="addForm.status"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="0">正常</option>
                  <option value="1">禁用</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="submitAdd"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ editingUser.id ? '更新' : '添加' }}
            </button>
            <button
              type="button"
              @click="closeAddDialog"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteDialogVisible" class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                确认删除
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  确定要删除用户 "{{ deleteTarget?.username }}" 吗？此操作不可撤销。
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
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Modal -->
    <MessageModal 
      v-model="messageModal.show" 
      :message="messageModal.text" 
      :type="messageModal.type"
      @close="messageModal.show = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MessageModal from '~/components/MessageModal.vue'
import { getUserList } from '~/utils/api/index.js'

const router = useRouter()
const users = ref([])
const loading = ref(false)
const showAddDialog = ref(false)
const editingUser = ref({ id: null, username: '', password: '', nickname: '', email: '', role: 'user', status: '0' })
const messageModal = ref({ show: false, text: '', type: 'info' })
const deleteDialogVisible = ref(false)
const deleteTarget = ref(null)

// 显示消息提示
function showMessage(text, type = 'info', duration = 3000) {
  messageModal.value = { show: false, text: '', type }
  setTimeout(() => {
    messageModal.value = { show: true, text, type }
    if (duration > 0) {
      setTimeout(() => { messageModal.value.show = false }, duration)
    }
  }, 10)
}

// 获取用户列表
async function fetchUsers() {
  loading.value = true
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const token = user?.token || ''
    const res = await getUserList(token)
    
    if (res.code === 200 && Array.isArray(res.data)) {
      users.value = res.data.map(u => ({
        id: u.id,
        username: u.account,
        nickname: u.account, // 后端无昵称字段，默认用账号
        email: u.email || '',
        role: u.isAdmin === 1 ? 'admin' : 'user',
        status: u.status || 0
      }))
    } else {
      users.value = []
      throw new Error(res.message || '获取用户列表失败')
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    showMessage(error.message || '获取用户列表失败', 'error')
  } finally {
    loading.value = false
  }
}

// 初始化加载数据
onMounted(() => {
  fetchUsers()
})

// 打开添加用户弹窗
function openAddUser() {
  editingUser.value = { id: null, username: '', password: '', nickname: '', email: '', role: 'user', status: '0' }
  showAddDialog.value = true
}

// 编辑用户
function editUser(user) {
  editingUser.value = { ...user, status: user.status.toString() }
  showAddDialog.value = true
}

// 关闭添加/编辑弹窗
function closeAddDialog() {
  showAddDialog.value = false
  editingUser.value = { id: null, username: '', password: '', nickname: '', email: '', role: 'user', status: '0' }
}

// 提交添加/编辑用户
async function submitAdd() {
  const form = editingUser.value
  
  // 表单验证
  if (!form.username.trim()) {
    showMessage('用户名不能为空', 'warn')
    return
  }
  
  if (!form.id && !form.password) {
    showMessage('密码不能为空', 'warn')
    return
  }
  
  if (form.email && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    showMessage('邮箱格式不正确', 'warn')
    return
  }
  
  try {
    // 这里调用实际的添加/更新用户接口
    if (form.id) {
      // 更新用户
      const index = users.value.findIndex(u => u.id === form.id)
      if (index !== -1) {
        const { password, ...userData } = form
        users.value[index] = { ...users.value[index], ...userData }
      }
      showMessage('更新成功', 'success')
    } else {
      // 添加用户
      if (users.value.some(u => u.username === form.username)) {
        showMessage('用户名已存在', 'warn')
        return
      }
      const newUser = {
        ...form,
        id: Date.now().toString(),
        createTime: new Date().toISOString()
      }
      users.value = [newUser, ...users.value]
      showMessage('添加成功', 'success')
    }
    closeAddDialog()
  } catch (error) {
    console.error('保存用户失败:', error)
    showMessage(error.message || '保存失败', 'error')
  }
}

// 打开删除确认弹窗
function openDeleteDialog(user) {
  deleteTarget.value = user
  deleteDialogVisible.value = true
}

// 关闭删除确认弹窗
function closeDeleteDialog() {
  deleteDialogVisible.value = false
  deleteTarget.value = null
}

// 执行删除操作
async function doDelete() {
  if (!deleteTarget.value) return
  
  try {
    // 这里调用实际的删除用户接口
    users.value = users.value.filter(u => u.id !== deleteTarget.value.id)
    showMessage('删除成功', 'success')
  } catch (error) {
    console.error('删除用户失败:', error)
    showMessage(error.message || '删除失败', 'error')
  } finally {
    closeDeleteDialog()
  }
}
</script>

<style scoped>
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
