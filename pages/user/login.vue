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
        <div class="form-actions">
          <button type="submit" class="btn-main" :disabled="loading">{{ loading ? '登录中...' : '登录' }}</button>
          <NuxtLink to="/user/register" class="btn-link">注册新账号</NuxtLink>
        </div>
      </form>
    </div>
    <MessageModal v-model="messageModal.show" :message="messageModal.text" :type="messageModal.type" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MessageModal from '~/components/MessageModal.vue'
import { login } from '~/utils/api/index.js'
const router = useRouter()
const form = ref({ account: '', password: '' })
const loading = ref(false)
const messageModal = ref({ show: false, text: '', type: 'info' })
function showMessage(text, type = 'info', duration = 2000) {
  messageModal.value = { show: false, text: '', type }
  setTimeout(() => {
    messageModal.value = { show: true, text, type }
    setTimeout(() => { messageModal.value.show = false }, duration)
  }, 10)
}
function validateAccount(account) {
  return /^[a-zA-Z0-9]{4,16}$/.test(account) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(account)
}
function validatePassword(pw) {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=]{6,20}$/.test(pw)
}
const onLogin = async () => {
  if (!validateAccount(form.value.account)) {
    showMessage('账号需4-16位字母或数字，或邮箱格式', 'warn');
    return
  }
  if (!validatePassword(form.value.password)) {
    showMessage('密码需6-20位且包含字母和数字', 'warn');
    return
  }
  loading.value = true
  try {
    const res = await login({
      account: form.value.account,
      passwd: form.value.password
    })
    if (res.code === 200 && res.data) {
      localStorage.setItem('user', JSON.stringify(res.data))
      showMessage('登录成功', 'success');
      setTimeout(() => router.push('/user/center'), 800)
    } else {
      showMessage(res.msg || '登录失败', 'error');
    }
  } catch (e) {
    showMessage(e.message || '登录失败', 'error');
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
