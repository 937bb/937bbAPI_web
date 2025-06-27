<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900">用户中心</h1>
        <p class="mt-2 text-gray-600">管理您的账户信息和API凭证</p>
      </div>


      <!-- Main Content -->
      <div v-if="user" class="bg-white shadow rounded-lg overflow-hidden">
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
                <div class="relative rounded-md shadow-sm">
                  <div class="relative">
                    <input 
                      :type="showApiKey ? 'text' : 'password'" 
                      :value="showApiKey ? user.key : '*'.repeat(user.key?.length || 0)" 
                      readonly 
                      class="block w-full pr-32 py-2.5 pl-3 sm:text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      :class="{'text-gray-400': !showApiKey, 'pr-28': copyTip}"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                      <button 
                        type="button"
                        @click="toggleApiKeyVisibility"
                        class="h-full inline-flex items-center px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
                        :class="showApiKey ? 'text-indigo-600 hover:bg-indigo-50' : 'text-gray-500 hover:bg-gray-100'"
                      >
                        <svg v-if="!showApiKey" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        <span class="ml-1 hidden sm:inline text-xs">{{ showApiKey ? '隐藏' : '显示' }}</span>
                      </button>
                      <div class="h-5 w-px bg-gray-300 mx-1"></div>
                      <button 
                        type="button"
                        @click="copyKey"
                        class="h-full inline-flex items-center px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
                        :class="{
                          'text-indigo-600 hover:bg-indigo-50': showApiKey,
                          'text-gray-400 cursor-not-allowed': !showApiKey,
                          'text-green-600': copyTip
                        }"
                        :disabled="!showApiKey"
                      >
                        <svg v-if="!copyTip" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="ml-1 hidden sm:inline text-xs">{{ copyTip ? '已复制!' : '复制' }}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  点击"显示"按钮查看完整API Key
                </p>
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
const user = ref({})
const copyTip = ref(false)
const showApiKey = ref(false)
const showToast = ref(false)
const toastTimeout = ref(null)

// 切换API密钥可见性
const toggleApiKeyVisibility = () => {
  showApiKey.value = !showApiKey.value
}

function copyKey() {
  if (!user.value?.key || !showApiKey.value) return;
  
  // 首先尝试使用现代剪贴板API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(user.value.key).then(() => {
      copyTip.value = true;
      setTimeout(() => {
        copyTip.value = false;
      }, 2000);
    }).catch(err => {
      console.error('复制失败:', err);
      fallbackCopyText(user.value.key);
    });
  } else {
    fallbackCopyText(user.value.key);
  }
}

// 旧版浏览器的回退方法
function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      copyTip.value = true;
      setTimeout(() => {
        copyTip.value = false;
      }, 2000);
    } else {
      console.error('复制失败: 浏览器不支持复制功能');
    }
  } catch (err) {
    console.error('复制失败:', err);
  }
  
  document.body.removeChild(textarea);
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
