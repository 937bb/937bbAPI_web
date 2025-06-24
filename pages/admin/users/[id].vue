<template>
  <div class="py-6 px-4 sm:px-6 lg:px-8">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ isNew ? '添加用户' : '编辑用户' }}</h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ isNew ? '创建新用户账号' : '更新用户信息' }}
          </p>
        </div>
        <button
          @click="$router.push('/admin/users')"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
          </svg>
          返回用户列表
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-md bg-red-50 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            加载用户信息失败: {{ error }}
          </h3>
          <div class="mt-2 text-sm text-red-700">
            <p>请检查网络连接后重试，或联系管理员获取帮助。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- User Form -->
    <form v-else @submit.prevent="submitEdit" class="space-y-6 bg-white shadow overflow-hidden rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="space-y-6">
          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              用户名 <span class="text-red-500">*</span>
            </label>
            <div class="mt-1">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                maxlength="32"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-300': errors.username }"
                :disabled="!isNew"
              />
              <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                {{ errors.username }}
              </p>
            </div>
          </div>

          <!-- Nickname -->
          <div>
            <label for="nickname" class="block text-sm font-medium text-gray-700">
              昵称
            </label>
            <div class="mt-1">
              <input
                id="nickname"
                v-model="form.nickname"
                type="text"
                maxlength="32"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                maxlength="64"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-300': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ isNew ? '密码' : '新密码' }} <span v-if="isNew" class="text-red-500">*</span>
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                :required="isNew"
                minlength="6"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-300': errors.password }"
                :placeholder="isNew ? '' : '留空则不修改密码'"
              />
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password }}
              </p>
              <p class="mt-1 text-xs text-gray-500">
                {{ isNew ? '密码至少需要6个字符' : '留空则不修改密码' }}
              </p>
            </div>
          </div>

          <!-- Confirm Password -->
          <div v-if="isNew || form.password">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              {{ isNew ? '确认密码' : '确认新密码' }} <span class="text-red-500">*</span>
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                :required="isNew || form.password"
                minlength="6"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                :class="{ 'border-red-300': errors.confirmPassword }"
              />
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">
              角色
            </label>
            <select
              id="role"
              v-model="form.role"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">
              状态
            </label>
            <select
              id="status"
              v-model.number="form.status"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option :value="0">正常</option>
              <option :value="1">禁用</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="button"
          @click="$router.push('/admin/users')"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
        >
          取消
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ saving ? '保存中...' : '保存' }}
        </button>
      </div>
    </form>

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
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MessageModal from '~/components/MessageModal.vue'
import { 
  getUserDetail as fetchUserDetailApi,
  updateUser as updateUserApi,
  createApi as createUserApi
} from '~/utils/api'

const route = useRoute()
const router = useRouter()

const isNew = !route.params.id || route.params.id === 'add'
const loading = ref(false)
const saving = ref(false)
const error = ref(null)
const userData = ref(null)

// Form data
const form = reactive({
  id: '',
  username: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
  status: 0
})

// Form errors
const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Message modal
const messageModal = reactive({
  show: false,
  text: '',
  type: 'info' // 'info', 'success', 'warning', 'error'
})

// Show message
function showMessage(text, type = 'info', duration = 3000) {
  messageModal.text = text
  messageModal.type = type
  messageModal.show = true
  
  if (duration > 0) {
    setTimeout(() => {
      messageModal.show = false
    }, duration)
  }
}

// Fetch user details
async function fetchUserDetails() {
  if (isNew) {
    userData.value = {}
    return
  }

  loading.value = true
  error.value = null
  
  try {
    // Get token from localStorage
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const token = user?.token || "";
    if (!token) {
      console.error('No token found in localStorage')
      throw new Error('用户未登录或登录已过期')
    }
    
    // Call the API to get user details
    
    const res = await fetchUserDetailApi(route.params.id, token)
    
    console.log('User details API response:', res)
    
    if (res.code === 200 && res.data) {
      userData.value = {
        id: res.data.id,
        username: res.data.account || '',
        nickname: res.data.nickname || res.data.account || '',
        email: res.data.email || '',
        role: res.data.isAdmin === 1 ? 'admin' : 'user',
        status: res.data.status || 0
      }
      
      // Update form with user data
      Object.assign(form, userData.value)
    } else {
      throw new Error(res.msg || '获取用户信息失败')
    }
  } catch (err) {
    console.error('Failed to fetch user:', err)
    error.value = err.message || '加载用户信息失败'
    showMessage(error.value, 'error')
  } finally {
    loading.value = false
  }
}

// Validate form
function validateForm() {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Validate username
  if (!form.username.trim()) {
    errors.username = '用户名不能为空'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]{4,20}$/.test(form.username)) {
    errors.username = '用户名只能包含字母、数字和下划线，长度4-20位'
    isValid = false
  }
  
  // Validate email if provided
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '邮箱格式不正确'
    isValid = false
  }
  
  // Validate password for new users
  if (isNew) {
    if (!form.password) {
      errors.password = '请输入密码'
      isValid = false
    } else if (form.password.length < 6) {
      errors.password = '密码至少需要6个字符'
      isValid = false
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = '两次输入的密码不一致'
      isValid = false
    }
  } else if (form.password && form.password !== form.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }
  
  return isValid
}

// Submit form
async function submitEdit() {
  if (!validateForm()) {
    return
  }
  
  saving.value = true
  
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token') || ''
    
    // Prepare user data according to API requirements
    const userData = {
      id: form.id,
      account: form.username,
      nickname: form.nickname || form.username,
      email: form.email || '',
      isAdmin: form.role === 'admin' ? 1 : 0,
      status: form.status,
      // Only include password for new users or when changing password
      ...(isNew || form.password ? { password: form.password } : {})
    }
    
    // Call the appropriate API based on whether it's a new user or an update
    const res = isNew 
      ? await createUserApi(userData, token)
      : await updateUserApi(userData, token)
    
    if (res.code === 200) {
      showMessage(isNew ? '用户创建成功' : '用户信息已更新', 'success')
      
      // Redirect to user list after a short delay
      setTimeout(() => {
        router.push('/admin/users')
      }, 1500)
    } else {
      throw new Error(res.msg || (isNew ? '创建用户失败' : '更新用户信息失败'))
    }
  } catch (err) {
    console.error('Failed to save user:', err)
    showMessage(err.message || (isNew ? '创建用户失败' : '更新用户信息失败'), 'error')
  } finally {
    saving.value = false
  }
}

// Load user data when component mounts
onMounted(() => {
  fetchUserDetails()
})
</script>

<style scoped>
/* Custom styles that can't be easily achieved with Tailwind */
</style>
