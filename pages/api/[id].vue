<template>
  <div class="api-detail">
    <!-- 顶部信息卡片，悬浮阴影+渐变背景 -->
    <header class="detail-header modern-card">
      <h1>{{ api.title }}</h1>
      <p class="api-summary">{{ api.summary }}</p>
      <div class="api-meta">
        <span class="api-method" :class="api.method && api.method.toLowerCase()">{{ api.method }}</span>
        <!-- 复制按钮区域，图标+文字，动画提示 -->
        <span class="api-url-full copyable" @click="copyApiUrl" @mousedown="copyActive=true" @mouseup="copyActive=false" :class="{active: copyActive}">
          <svg class="copy-icon" viewBox="0 0 20 20" width="18" height="18"><path fill="currentColor" d="M7 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6.83A2 2 0 0 0 14.41 6L11.41 3A2 2 0 0 0 10.17 2H7zm0 2h3.17L15 6.83V14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path></svg>
          <span class="copy-url-text">{{ fullApiUrl }}</span>
          <span class="copy-btn-text">复制</span>
        </span>
        <span class="api-count"><svg width="16" height="16" viewBox="0 0 20 20" style="vertical-align:middle;margin-right:2px;"><circle cx="10" cy="10" r="8" fill="#faad14" opacity=".15"/><path d="M10 5v5l3 3" stroke="#faad14" stroke-width="2" fill="none" stroke-linecap="round"/></svg>请求次数：{{ api.requestCount }}</span>
        <span class="api-time"><svg width="16" height="16" viewBox="0 0 20 20" style="vertical-align:middle;margin-right:2px;"><path d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16z" fill="#aaa" opacity=".12"/><path d="M10 5v5l3 3" stroke="#aaa" stroke-width="2" fill="none" stroke-linecap="round"/></svg>创建时间：{{ formatDate(api.createTime) }}</span>
      </div>
      <!-- 复制成功气泡提示，渐变背景+icon -->
      <transition name="fade">
        <div v-if="copyTip" class="copy-tip-modern">
          <svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle;margin-right:6px;"><circle cx="10" cy="10" r="10" fill="#36d1c4" opacity=".18"/><path d="M6 10.5l3 3l5-5" stroke="#36d1c4" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>
          已复制到剪贴板
        </div>
      </transition>
    </header>

    <!-- 详情内容卡片 -->
    <div class="api-detail-card modern-card">
      <!-- 接口说明 -->
      <section class="api-section">
        <h2>接口说明</h2>
        <div class="api-desc-block">
          <span v-if="api.description" v-html="api.description"></span>
          <span v-else class="api-empty">暂无说明</span>
        </div>
      </section>
      <!-- 请求参数 -->
      <section class="api-section">
        <h2>请求参数</h2>
        <table v-if="api.requestParams && api.requestParams.length" class="api-table modern-table">
          <thead>
            <tr>
              <th>参数名</th>
              <th>必填</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="param in api.requestParams" :key="param.name">
              <td>{{ param.name }}</td>
              <td>{{ param.required ? '是' : '否' }}</td>
              <td>{{ param.description }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="api-empty">无参数</div>
      </section>
      <!-- 请求示例 -->
      <section class="api-section">
        <h2>请求示例</h2>
        <pre class="api-code modern-code" v-if="api.requestExample">{{ api.requestExample }}</pre>
        <div v-else class="api-empty">无</div>
      </section>
      <!-- 返回示例 -->
      <section class="api-section">
        <h2>返回示例</h2>
        <pre class="api-code modern-code" v-if="api.responseExample">{{ api.responseExample }}</pre>
        <div v-else class="api-empty">无</div>
      </section>
      <!-- 返回状态说明 -->
      <section class="api-section">
        <h2>返回状态说明</h2>
        <table v-if="api.responseStatus && api.responseStatus.length" class="api-table modern-table">
          <thead>
            <tr>
              <th>字段名</th>
              <th>必有</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="status in api.responseStatus" :key="status.name">
              <td>{{ status.name }}</td>
              <td>{{ status.required ? '是' : '否' }}</td>
              <td>{{ status.description }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="api-empty">无</div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
const route = useRoute()
const api = ref({})
const apiBase = import.meta.env.VITE_API_BASE || ''
const fullApiUrl = computed(() => {
  if (!api.value.url) return ''
  if (api.value.url.startsWith('http')) return api.value.url
  return apiBase.replace(/\/$/, '') + api.value.url
})
// 复制功能
const copyTip = ref(false)
const copyActive = ref(false)
function copyApiUrl() {
  if (!fullApiUrl.value) return
  navigator.clipboard.writeText(fullApiUrl.value)
  copyTip.value = true
  setTimeout(() => (copyTip.value = false), 1400)
}

// 日期格式化
function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}

onMounted(async () => {
  // TODO: 这里调用接口获取API详情，使用 route.params.id
  // const res = await $fetch(`/api/apis/${route.params.id}`)
  // api.value = res.data

  // 示例数据，实际开发时请替换为接口返回的数据
  api.value = {
    id: '1',
    title: '二维码生成API',
    summary: '快速生成二维码图片',
    url: '/api/qr',
    method: 'GET',
    requestExample: 'GET /api/qr?text=HelloWorld',
    responseExample: '{\n  "code": 200,\n  "msg": "success",\n  "imgUrl": "https://..."\n}',
    requestParams: [
      { name: 'text', required: true, description: '需要生成二维码的内容' }
    ],
    responseStatus: [
      { name: 'code', required: true, description: '状态码' },
      { name: 'msg', required: true, description: '提示信息' },
      { name: 'imgUrl', required: true, description: '二维码图片地址' }
    ],
    description: '通过本 API 可以快速生成二维码图片，支持自定义内容。',
    createTime: '2025-06-20T10:00:00',
    updateTime: '2025-06-21T10:00:00',
    requestCount: 1234
  }
})
</script>

<style scoped>
/* 现代高端卡片样式 */
.modern-card {
  box-shadow: 0 6px 32px 0 rgba(45,140,240,0.13), 0 1.5px 8px 0 rgba(54,209,196,0.08);
  border-radius: 22px;
  background: linear-gradient(90deg, #f8fbff 0%, #eaf6ff 100%);
  border: none;
}
.api-detail {
  max-width: 1200px;
  margin: 40px auto 0 auto;
  padding: 0 0 60px 0;
  background: none;
}
.detail-header {
  border-bottom: none;
  margin-bottom: 32px;
  padding-bottom: 18px;
  padding-top: 36px;
  position: relative;
}
.detail-header h1 {
  font-size: 2.5rem;
  color: #1a73e8;
  margin-bottom: 8px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-shadow: 0 2px 8px rgba(26,115,232,0.08);
}
.api-summary {
  color: #5a6d8a;
  font-size: 1.18rem;
  margin-bottom: 8px;
  font-weight: 500;
}
.api-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  font-size: 1.08rem;
  color: #666;
  margin-top: 8px;
  align-items: center;
}
.api-method {
  font-weight: 700;
  padding: 2px 14px;
  border-radius: 10px;
  background: #e3eaf2;
  color: #1a73e8;
  margin-left: 8px;
  box-shadow: 0 1px 4px 0 rgba(26,115,232,0.04);
  letter-spacing: 1px;
  font-size: 1.08rem;
}
.api-method.get {
  background: #e3f2fd;
  color: #1976d2;
}
.api-method.post {
  background: #fff7e6;
  color: #faad14;
}
.api-url-full.copyable {
  cursor: pointer;
  color: #36d1c4;
  background: linear-gradient(90deg, #e0f7fa 0%, #f0f7ff 100%);
  border-radius: 10px;
  padding: 4px 16px;
  margin-left: 8px;
  transition: background 0.18s, color 0.18s, transform 0.12s;
  user-select: all;
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 1.5px 8px 0 rgba(54,209,196,0.08);
}
.api-url-full.copyable:hover, .api-url-full.copyable.active {
  background: linear-gradient(90deg, #36d1c4 0%, #1a73e8 100%);
  color: #fff;
  transform: scale(1.06);
}
.copy-icon {
  margin-right: 7px;
  color: #36d1c4;
  transition: color 0.18s;
}
.api-url-full.copyable:hover .copy-icon, .api-url-full.copyable.active .copy-icon {
  color: #fff;
}
.copy-btn-text {
  margin-left: 10px;
  font-size: 0.98rem;
  background: #eaf6ff;
  color: #1a73e8;
  border-radius: 6px;
  padding: 2px 10px;
  transition: background 0.18s, color 0.18s;
}
.api-url-full.copyable:hover .copy-btn-text, .api-url-full.copyable.active .copy-btn-text {
  background: #36d1c4;
  color: #fff;
}
.copy-url-text {
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: middle;
}
.copy-tip-modern {
  position: absolute;
  right: 32px;
  top: 18px;
  background: linear-gradient(90deg, #36d1c4 0%, #1a73e8 100%);
  color: #fff;
  border-radius: 10px;
  padding: 7px 22px;
  font-size: 1.08rem;
  z-index: 10;
  box-shadow: 0 4px 18px 0 rgba(54,209,196,0.13);
  display: flex;
  align-items: center;
  font-weight: 700;
  animation: fadeInOut 1.4s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}
.api-detail-card {
  background: #fff;
  border-radius: 0 0 22px 22px;
  box-shadow: 0 4px 32px 0 rgba(45,140,240,0.10);
  padding: 38px 38px 38px 38px;
}
.api-section {
  margin-bottom: 36px;
}
.api-section h2 {
  font-size: 1.22rem;
  color: #1a2940;
  margin-bottom: 14px;
  border-left: 5px solid #36d1c4;
  padding-left: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
}
.api-desc-block {
  background: linear-gradient(90deg, #f8fbff 0%, #eaf6ff 100%);
  border-radius: 10px;
  padding: 18px 22px;
  color: #333;
  font-size: 1.12rem;
  margin-bottom: 8px;
  box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04);
}
.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 8px;
  background: #fafcff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04);
}
.modern-table th, .modern-table td {
  border: 1px solid #e6e6e6;
  padding: 10px 16px;
  text-align: left;
  font-size: 1.05rem;
}
.modern-table th {
  background: #f0f7ff;
  color: #2d8cf0;
  font-weight: 700;
}
.modern-code {
  background: linear-gradient(90deg, #f8f8f8 0%, #eaf6ff 100%);
  border-radius: 8px;
  padding: 14px;
  font-size: 1.04rem;
  color: #333;
  overflow-x: auto;
  box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04);
}
.api-empty {
  color: #bbb;
  font-size: 1rem;
  padding: 8px 0;
}
@media (max-width: 700px) {
  .api-detail {
    padding: 0 2vw 24px 2vw;
    border-radius: 0;
  }
  .detail-header h1 {
    font-size: 1.2rem;
  }
  .api-section h2 {
    font-size: 1rem;
    padding-left: 6px;
  }
  .modern-table th, .modern-table td {
    font-size: 0.92rem;
    padding: 6px 6px;
  }
  .modern-code {
    font-size: 0.92rem;
    padding: 8px;
  }
  .api-detail-card {
    padding: 12px 4px 12px 4px;
    border-radius: 0 0 14px 14px;
  }
  .copy-tip-modern {
    right: 10px;
    top: 10px;
    font-size: 0.98rem;
    padding: 5px 12px;
  }
}
</style>
