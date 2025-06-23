<template>
  <div class="user-auth-bg">
    <div class="user-auth-card">
      <div class="user-auth-title">注册新账号</div>
      <form @submit.prevent="onRegister">
        <div class="form-group">
          <input v-model="form.account" type="text" placeholder="账号 (4-16位字母或数字)" required minlength="4" maxlength="16" />
        </div>
        <div class="form-group">
          <input v-model="form.email" type="email" placeholder="邮箱" required />
        </div>
        <div class="form-group form-group-code">
          <input v-model="form.emailCode" type="text" placeholder="邮箱验证码" required maxlength="6" />
          <button type="button" class="btn-code" :disabled="codeCountdown>0||sendingCode" @click="sendCode">
            {{ sendingCode ? '发送中...' : (codeCountdown>0 ? codeCountdown+'s' : '获取验证码') }}
          </button>
        </div>
        <div class="form-group">
          <input v-model="form.password" type="password" placeholder="密码 (6-20位，需包含字母和数字)" required minlength="6" maxlength="20" />
        </div>
        <div class="form-group">
          <input v-model="form.password2" type="password" placeholder="重复密码" required minlength="6" maxlength="20" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-main" :disabled="loading">{{ loading ? '注册中...' : '注册' }}</button>
          <NuxtLink to="/user/login" class="btn-link">已有账号？去登录</NuxtLink>
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
import { sendEmailCode, register } from '~/utils/api/index.js'
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
const sendCode = async () => {
  if (!form.value.email) return showMessage('请填写邮箱', 'warn')
  if (!validateEmail(form.value.email)) return showMessage('邮箱格式不正确', 'warn')
  sendingCode.value = true
  try {
    await sendEmailCode(form.value.email)
    codeCountdown.value = 60
    timer = setInterval(() => {
      codeCountdown.value--
      if (codeCountdown.value <= 0) clearInterval(timer)
    }, 1000)
    showMessage('验证码已发送', 'success')
  } catch (e) {
    showMessage(e.message || '验证码发送失败', 'error')
  } finally {
    sendingCode.value = false
  }
}
const onRegister = async () => {
  if (!validateAccount(form.value.account)) {
    showMessage('账号需4-16位字母或数字', 'warn')
    return
  }
  if (!validateEmail(form.value.email)) {
    showMessage('邮箱格式不正确', 'warn')
    return
  }
  if (!validateCode(form.value.emailCode)) {
    showMessage('验证码格式错误', 'warn')
    return
  }
  if (!validatePassword(form.value.password)) {
    showMessage('密码需6-20位且包含字母和数字', 'warn')
    return
  }
  if (form.value.password !== form.value.password2) {
    showMessage('两次密码输入不一致', 'warn')
    return
  }
  loading.value = true
  try {
    const res = await register({
      account: form.value.account,
      passwd: form.value.password,
      email: form.value.email,
      emailCode: form.value.emailCode
    })
    if (res.code === 200) {
      showMessage('注册成功', 'success')
      setTimeout(() => router.push('/user/login'), 800)
    } else {
      showMessage(res.msg || '注册失败', 'error')
    }
  } catch (e) {
    showMessage(e.message || '注册失败', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.user-auth-bg { min-height: 100vh; background: linear-gradient(120deg, #e0e7ff 0%, #f0f9ff 100%); display: flex; align-items: center; justify-content: center; }
.user-auth-card { background: #fff; border-radius: 18px; box-shadow: 0 4px 24px 0 rgba(56,189,248,0.10); padding: 38px 32px 28px 32px; min-width: 320px; max-width: 98vw; display: flex; flex-direction: column; align-items: center; }
.user-auth-title { font-size: 1.6rem; font-weight: bold; color: #6366f1; margin-bottom: 28px; }
.form-group { margin-bottom: 18px; width: 100%; }
.form-group input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 1.5px solid #e0e7ef; font-size: 1.08rem; outline: none; transition: border 0.2s; }
.form-group input:focus { border-color: #6366f1; }
.form-group-code { display: flex; gap: 10px; align-items: center; }
.btn-code { background: #e0e7ff; color: #6366f1; border: none; border-radius: 8px; padding: 10px 18px; font-size: 1.02rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-code:disabled { background: #f1f5f9; color: #bbb; cursor: not-allowed; }
.form-actions { display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 18px; }
.btn-main { background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%); color: #fff; border: none; border-radius: 8px; padding: 10px 32px; font-size: 1.08rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-main:hover { background: #6366f1; }
.btn-link { color: #6366f1; text-decoration: underline; font-size: 1.02rem; }
@media (max-width: 600px) { .user-auth-card { padding: 18px 6vw 18px 6vw; min-width: 0; } }
</style>
