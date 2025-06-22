<template>
  <div class="user-auth-bg">
    <div class="user-auth-card">
      <div class="user-auth-title">用户登录</div>
      <form @submit.prevent="onLogin">
        <div class="form-group">
          <input v-model="form.account" type="text" placeholder="账号/邮箱" required />
        </div>
        <div class="form-group">
          <input v-model="form.password" type="password" placeholder="密码" required />
        </div>
        <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>
        <div class="form-actions">
          <button type="submit" class="btn-main" :disabled="loading">{{ loading ? '登录中...' : '登录' }}</button>
          <NuxtLink to="/user/register" class="btn-link">注册新账号</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { $apiFetch } from '~/utils/apiFetch.js'
const router = useRouter()
const form = ref({ account: '', password: '' })
const errorMsg = ref('')
const loading = ref(false)
function validateAccount(account) {
  return /^[a-zA-Z0-9]{4,16}$/.test(account) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(account)
}
function validatePassword(pw) {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=]{6,20}$/.test(pw)
}
const onLogin = async () => {
  errorMsg.value = ''
  if (!validateAccount(form.value.account)) {
    errorMsg.value = '账号需4-16位字母或数字，或邮箱格式'
    return
  }
  if (!validatePassword(form.value.password)) {
    errorMsg.value = '密码需6-20位且包含字母和数字'
    return
  }
  loading.value = true
  try {
    const res = await $apiFetch('http://192.168.0.101:3007/api/auth/login', {
      method: 'POST',
      body: {
        account: form.value.account,
        passwd: form.value.password
      }
    })
    if (res.code === 200 && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data))
      router.push('/user/center')
    } else {
      errorMsg.value = res.msg || '登录失败'
    }
  } catch (e) {
    errorMsg.value = e.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.user-auth-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #e0e7ff 0%, #f0f9ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-auth-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(56,189,248,0.10);
  padding: 38px 32px 28px 32px;
  min-width: 320px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-auth-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 28px;
}
.form-group {
  margin-bottom: 18px;
  width: 100%;
}
.form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.08rem;
  outline: none;
  transition: border 0.2s;
}
.form-group input:focus {
  border-color: #6366f1;
}
.form-error { color: #b91c1c; font-size: 1.02rem; margin-bottom: 10px; text-align: left; width: 100%; }
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 18px;
}
.btn-main {
  background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-main:hover {
  background: #6366f1;
}
.btn-link {
  color: #6366f1;
  text-decoration: underline;
  font-size: 1.02rem;
}
@media (max-width: 600px) {
  .user-auth-card {
    padding: 18px 6vw 18px 6vw;
    min-width: 0;
  }
}
</style>
