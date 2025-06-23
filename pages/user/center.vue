<template>
  <div class="user-center-bg">
    <div class="user-center-main" v-if="user">
      <div class="user-center-title">
        用户中心
        <span v-if="user.isAdmin==1" class="admin-badge">系统管理员</span>
      </div>
      <div class="user-info-block">
        <div class="user-info-row"><span>账号：</span>{{ user.account }}</div>
        <div class="user-info-row"><span>邮箱：</span>{{ user.email }}</div>
        <div class="user-info-row user-key-row">
          <span>API Key：</span>
          <span class="user-key">{{ user.key }}</span>
          <button class="copy-btn" @click="copyKey">复制</button>
        </div>
      </div>
      <!-- 新增：API Key 使用方式说明 -->
      <div class="api-key-usage" style="width:100%;margin-bottom:18px;">
        <b>API Key 使用方式：</b>
        <div style="margin: 6px 0 0 0; font-size: 0.98rem;">
          调用 API 时，请在请求头（headers）中添加 <code>x-api-key</code>，值为您的 API Key。
          <br>
          <b>示例：</b>
          <pre style="background:#f8fafc;border-radius:6px;padding:8px 12px;margin:6px 0 0 0;">
fetch('/api/xxx', {
  headers: { 'x-api-key': '{{ user.key }}' }
})
          </pre>
        </div>
      </div>
      <NuxtLink v-if="user.isAdmin==1" to="/admin" class="admin-link">进入后台管理</NuxtLink>
      <div v-if="copyTip" class="copy-tip">已复制到剪贴板</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const user = ref(null)
const copyTip = ref(false)
function copyKey() {
  if (!user.value?.key) return
  navigator.clipboard.writeText(user.value.key)
  copyTip.value = true
  setTimeout(() => copyTip.value = false, 1200)
}
onMounted(() => {
  const u = localStorage.getItem('user')
  if (u) {
    user.value = JSON.parse(u)
  } else {
    router.push('/user/login')
  }
})
</script>

<style scoped>
.user-center-bg { min-height: 100vh; background: linear-gradient(120deg, #e0e7ff 0%, #f0f9ff 100%); display: flex; align-items: center; justify-content: center; }
.user-center-main { background: #fff; border-radius: 18px; box-shadow: 0 4px 24px 0 rgba(56,189,248,0.10); padding: 38px 32px 28px 32px; min-width: 320px; max-width: 98vw; display: flex; flex-direction: column; align-items: center; }
.user-center-title { font-size: 1.6rem; font-weight: bold; color: #6366f1; margin-bottom: 28px; display: flex; align-items: center; gap: 12px; }
.admin-badge { background: #6366f1; color: #fff; border-radius: 8px; padding: 2px 12px; font-size: 1rem; margin-left: 8px; }
.admin-link { margin-top: 18px; color: #fff; background: #6366f1; border-radius: 8px; padding: 8px 24px; font-size: 1.08rem; font-weight: 600; text-decoration: none; transition: background 0.2s; display: inline-block; }
.admin-link:hover { background: #38bdf8; }
.user-info-block { width: 100%; margin-bottom: 18px; }
.user-info-row { font-size: 1.13rem; color: #222; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.user-key-row { align-items: center; }
.user-key { font-family: monospace; background: #f1f5f9; color: #6366f1; border-radius: 6px; padding: 2px 10px; font-size: 1.08rem; margin-right: 8px; }
.copy-btn { background: #e0e7ff; color: #6366f1; border: none; border-radius: 8px; padding: 6px 18px; font-size: 1.02rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.copy-btn:hover { background: #6366f1; color: #fff; }
.copy-tip { color: #16a34a; font-size: 1.08rem; margin-top: 12px; text-align: center; }
.api-key-usage { font-size: 0.95rem; color: #444; background: #f8fafc; border-radius: 6px; padding: 12px; margin-top: 12px; width: 100%; }
.api-key-usage code { background: #e0f2fe; padding: 2px 6px; border-radius: 4px; }
@media (max-width: 600px) { .user-center-main { padding: 18px 6vw 18px 6vw; min-width: 0; } }
</style>
