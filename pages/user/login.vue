<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          用户登录
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          <NuxtLink to="/user/register" class="font-medium text-blue-600 hover:text-blue-500">
            注册新账号
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">账号/邮箱</label>
            <input
              id="email"
              v-model="form.account"
              name="email"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="账号/邮箱"
            >
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="密码"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-wait"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </div>
      </form>
    </div>
    <!-- 全局消息提示已由 GlobalMessage 组件处理 -->
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '~/utils/api/index.js'
import { useUser } from '~/composables/useUser'
import { debounce } from '~/utils/debounce'
import { useLoading } from '~/composables/useLoading'
import { useMessage } from '~/composables/useMessage'
const router = useRouter()
const { login: userLogin } = useUser()
const { success, error, warning } = useMessage()
const form = ref({ account: '', password: '' })
function validateAccount(account) {
  return /^[a-zA-Z0-9]{4,16}$/.test(account) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(account)
}
function validatePassword(pw) {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=]{6,20}$/.test(pw)
}
// 防抖的登录处理
const handleLogin = async () => {
  if (!validateAccount(form.value.account)) {
    warning('账号需4-16位字母或数字，或邮箱格式');
    return;
  }
  if (!validatePassword(form.value.password)) {
    warning('密码需6-20位且包含字母和数字');
    return;
  }
  
  try {
    const res = await login({
      account: form.value.account,
      passwd: form.value.password
    })
    if (res.code === 200 && res.data) {
      // 使用 useUser composable 更新用户状态
      userLogin(res.data)
      success('登录成功');
      setTimeout(() => router.push('/user/center'), 800)
    } else {
      error(res.msg || '登录失败');
    }
  } catch (e) {
    error(e.message || '登录失败');
  } finally {
  }
};

// 使用防抖包装登录处理函数
const onLogin = debounce(handleLogin, 500, true);

// 组件挂载时设置页面标题
useHead({
  title: '用户登录 - 937bbAPI',
  meta: [
    { name: 'description', content: '用户登录页面' },
    { name: 'keywords', content: '登录,用户登录,937bbAPI' }
  ]
});

// 组件卸载时取消防抖函数
onUnmounted(() => {
  onLogin.cancel?.();
});
</script>

<style scoped>
/* Styles are now handled by Tailwind CSS classes */
</style>
