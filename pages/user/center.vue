<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900">用户中心</h1>
        <p class="mt-2 text-gray-600">管理您的账户信息和API凭证</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">加载用户信息中...</p>
      </div>

      <!-- Main Content -->
      <div v-else-if="user" class="bg-white shadow rounded-lg overflow-hidden">
        <!-- User Profile Section -->
        <div class="px-6 py-5 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-medium text-gray-900">个人信息</h2>
              <p class="mt-1 text-sm text-gray-500">查看和管理您的账户信息</p>
            </div>
            <span v-if="user?.isAdmin == 1" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              系统管理员
            </span>
          </div>
          
          <div class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">账号</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ user.account }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">邮箱</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ user.email }}</dd>
            </div>
          </div>
        </div>

        <!-- API Key Section -->
        <div class="px-6 py-5 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">API 凭证</h2>
          <p class="mt-1 text-sm text-gray-500">用于访问API的密钥，请妥善保管</p>
          
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-700">API Key</span>
                  <span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">保密</span>
                </div>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input 
                    type="text" 
                    :value="user.key" 
                    readonly 
                    class="block w-full pr-16 sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-700 font-mono"
                  >
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <button 
                      @click="copyKey"
                      class="h-full inline-flex items-center px-4 py-2 border-l border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-r-md"
                    >
                      {{ copyTip ? '已复制!' : '复制' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- API Usage Instructions -->
        <div class="px-6 py-5 bg-gray-50">
          <h3 class="text-md font-medium text-gray-900">API Key 使用说明</h3>
          <p class="mt-2 text-sm text-gray-600">
            调用 API 时，请在请求头（headers）中添加 <code class="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-mono">x-api-key</code>，值为您的 API Key。
          </p>
          
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">示例代码：</h4>
            <div class="bg-gray-800 rounded-lg overflow-hidden">
              <pre class="p-4 text-sm text-gray-200 overflow-x-auto"><code class="language-javascript">// 使用 Fetch API
fetch('/api/your-endpoint', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '{{ user.key }}'  // 您的 API Key
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</code></pre>
            </div>
          </div>
        </div>
        <!-- Admin Link -->
        <div class="px-6 py-5 text-center border-t border-gray-200" v-if="user?.isAdmin == 1">
          <h3 class="text-lg font-medium text-gray-900 mb-4">管理员功能</h3>
          <NuxtLink 
            to="/admin" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            进入后台管理
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Toast Notification -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showToast" class="fixed bottom-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">复制成功</p>
              <p class="mt-1 text-sm text-gray-500">API Key 已复制到剪贴板</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button @click="showToast = false" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                <span class="sr-only">关闭</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalConfig } from '~/utils/globalConfig.js'

const { siteName, icp, icpUrl } = useGlobalConfig();
const router = useRouter()
const user = ref(null)
const isLoading = ref(true)
const copyTip = ref(false)
const showToast = ref(false)
const toastTimeout = ref(null)
function copyKey() {
  if (!user.value?.key) return;
  // 优先使用 clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(user.value.key).then(() => {
      copyTip.value = true;
      setTimeout(() => copyTip.value = false, 1200);
    }).catch(() => {
      fallbackCopy();
    });
  } else {
    fallbackCopy();
  }
  function fallbackCopy() {
    const textarea = document.createElement('textarea');
    textarea.value = user.value.key;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      copyTip.value = true;
      setTimeout(() => copyTip.value = false, 1200);
    } catch (err) {
      // 可选：提示失败
    }
    document.body.removeChild(textarea);
  }
}
onMounted(() => {
  const u = localStorage.getItem('user')
  if (u) {
    try {
      user.value = JSON.parse(u)
    } catch (e) {
      console.error('Failed to parse user data:', e)
      router.push('/user/login')
    }
  } else {
    router.push('/user/login')
  }
  isLoading.value = false
})
</script>

<style scoped>
/* 基础样式 */
.bg-gray-50 {
  background-color: #f9fafb;
}

.bg-white {
  background-color: #ffffff;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 代码块样式 */
pre {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  line-height: 1.5;
  border-radius: 0.375rem;
  overflow-x: auto;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .user-center-main {
    margin: 0 0.5rem;
    padding: 1rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
