<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          注册新账号
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          已有账号？
          <NuxtLink to="/user/login" class="font-medium text-blue-600 hover:text-blue-500">
            去登录
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="account" class="sr-only">账号</label>
            <input
              id="account"
              v-model="form.account"
              name="account"
              type="text"
              required
              minlength="4"
              maxlength="16"
              class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="账号 (4-16位字母或数字)"
            >
          </div>
          <div>
            <label for="email" class="sr-only">邮箱</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="邮箱"
            >
          </div>
          <div class="flex space-x-2">
            <div class="flex-1">
              <label for="emailCode" class="sr-only">邮箱验证码</label>
              <input
                id="emailCode"
                v-model="form.emailCode"
                name="emailCode"
                type="text"
                required
                maxlength="6"
                class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="邮箱验证码"
              >
            </div>
            <button
              type="button"
              @click="sendCode"
              :disabled="codeCountdown > 0 || sendingCode"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ sendingCode ? '发送中...' : (codeCountdown > 0 ? codeCountdown + 's' : '获取验证码') }}
            </button>
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              minlength="6"
              maxlength="20"
              class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="密码 (6-20位，需包含字母和数字)"
            >
          </div>
          <div>
            <label for="password2" class="sr-only">重复密码</label>
            <input
              id="password2"
              v-model="form.password2"
              name="password2"
              type="password"
              required
              minlength="6"
              maxlength="20"
              class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="重复密码"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{'opacity-50 cursor-not-allowed': loading}"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </div>
      </form>
    </div>
    <MessageModal v-model="messageModal.show" :message="messageModal.text" :type="messageModal.type" />
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MessageModal from '~/components/MessageModal.vue'
import { register, sendEmailCode } from '~/utils/api/index.js'
import { debounce } from '~/utils/debounce'
const router = useRouter()
const form = ref({ account: '', email: '', emailCode: '', password: '', password2: '' })
const loading = ref(false)
const sendingCode = ref(false)
const codeCountdown = ref(0)
const messageModal = ref({ show: false, text: '', type: 'info' })
let timer = null
function showMessage(text, type = 'info', duration = 2000) {
  messageModal.value = { show: false, text: '', type }
  setTimeout(() => {
    messageModal.value = { show: true, text, type }
    setTimeout(() => { messageModal.value.show = false }, duration)
  }, 10)
}
function validateEmail(email) {
  return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)
}
function validateAccount(account) {
  return /^[a-zA-Z0-9]{4,16}$/.test(account)
}
function validatePassword(pw) {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=]{6,20}$/.test(pw)
}
function validateCode(code) {
  return /^\d{4,8}$/.test(code)
}
// 发送验证码处理
const handleSendCode = async () => {
  if (sendingCode.value) return;
  
  if (!form.value.email) {
    showMessage('请输入邮箱', 'warn');
    return;
  }
  if (!validateEmail(form.value.email)) {
    showMessage('邮箱格式不正确', 'warn');
    return;
  }
  
  sendingCode.value = true;
  try {
    await sendEmailCode(form.value.email);
    codeCountdown.value = 60;
    timer = setInterval(() => {
      codeCountdown.value--;
      if (codeCountdown.value <= 0) clearInterval(timer)
    }, 1000)
    showMessage('验证码已发送', 'success');
  } catch (error) {
    showMessage(error.message || '发送验证码失败', 'error');
  } finally {
    sendingCode.value = false;
  }
};

// 使用防抖包装发送验证码函数
const sendCode = debounce(handleSendCode, 1000, true);

// 注册处理
const handleRegister = async () => {
  if (loading.value) return;
  
  if (!validateAccount(form.value.account)) {
    showMessage('账号需4-16位字母或数字', 'warn');
    return;
  }
  if (!validateEmail(form.value.email)) {
    showMessage('邮箱格式不正确', 'warn');
    return;
  }
  if (!validateCode(form.value.emailCode)) {
    showMessage('验证码为6位数字', 'warn');
    return;
  }
  if (!validatePassword(form.value.password)) {
    showMessage('密码需6-20位且包含字母和数字', 'warn');
    return;
  }
  if (form.value.password !== form.value.password2) {
    showMessage('两次输入的密码不一致', 'warn');
    return;
  }
  
  loading.value = true;
  try {
    await register({
      account: form.value.account,
      email: form.value.email,
      emailCode: form.value.emailCode,
      passwd: form.value.password,
    });
    showMessage('注册成功，请登录', 'success');
    router.push('/user/login');
  } catch (error) {
    showMessage(error.message || '注册失败', 'error');
  } finally {
    loading.value = false;
  }
};

// 使用防抖包装注册处理函数
const onRegister = debounce(handleRegister, 500, true);

// 组件卸载时取消防抖函数
onUnmounted(() => {
  onRegister.cancel?.();
  sendCode.cancel?.();
});
</script>

<style scoped>
/* 按钮禁用状态样式 */
button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* 输入框聚焦样式 */
input:focus {
  @apply ring-2 ring-blue-500 border-transparent;
}

/* 加载动画 */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
