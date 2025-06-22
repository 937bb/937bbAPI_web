<template>
  <div class="detail-bg">
    <div class="detail-main">
      <!-- 顶部横幅 -->
      <header class="detail-hero">
        <div class="detail-hero-inner">
          <div class="detail-hero-title">{{ api.title }}</div>
          <div class="detail-hero-summary">{{ api.summary }}</div>
          <div class="detail-hero-meta">
            <span class="detail-method-badge" :class="api.method && api.method.toLowerCase()">{{ api.method }}</span>
            <span class="detail-hero-date">创建于 {{ formatDate(api.createTime) }}</span>
            <span class="detail-hero-count">{{ api.requestCount }} 次调用</span>
            <button class="detail-copy-btn" @click="copyApiUrl">
              <span v-if="copyActive">已复制</span>
              <span v-else>复制URL</span>
            </button>
          </div>
          <transition name="fade">
            <div v-if="copyTip" class="detail-copy-tip">已复制到剪贴板</div>
          </transition>
        </div>
      </header>
      <!-- 内容区 -->
      <div class="detail-content">
        <div class="detail-section-block">
          <div class="detail-section-title">📝 接口说明</div>
          <div class="detail-desc-block" v-if="api.description" v-html="api.description"></div>
          <div class="detail-empty" v-else>暂无说明</div>
        </div>
        <div class="detail-section-block">
          <div class="detail-section-title">请求参数</div>
          <table v-if="api.requestParams && api.requestParams.length" class="detail-table">
            <thead>
              <tr><th>参数名</th><th>必填</th><th>说明</th></tr>
            </thead>
            <tbody>
              <tr v-for="param in api.requestParams" :key="param.name">
                <td>{{ param.name }}</td>
                <td>{{ param.required ? '是' : '否' }}</td>
                <td>{{ param.description }}</td>
              </tr>
            </tbody>
          </table>
          <div class="detail-empty" v-else>无参数</div>
        </div>
        <div class="detail-section-block">
          <div class="detail-section-title">请求示例</div>
          <pre class="detail-code" v-if="api.requestExample"><code>{{ api.requestExample }}</code></pre>
          <div class="detail-empty" v-else>无</div>
        </div>
        <div class="detail-section-block">
          <div class="detail-section-title">返回示例</div>
          <pre class="detail-code" v-if="api.responseExample"><code>{{ api.responseExample }}</code></pre>
          <div class="detail-empty" v-else>无</div>
        </div>
        <div class="detail-section-block">
          <div class="detail-section-title">返回状态说明</div>
          <table v-if="api.responseStatus && api.responseStatus.length" class="detail-table">
            <thead>
              <tr><th>字段名</th><th>必有</th><th>说明</th></tr>
            </thead>
            <tbody>
              <tr v-for="status in api.responseStatus" :key="status.name">
                <td>{{ status.name }}</td>
                <td>{{ status.required ? '是' : '否' }}</td>
                <td>{{ status.description }}</td>
              </tr>
            </tbody>
          </table>
          <div class="detail-empty" v-else>无</div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-text">
          &copy; 2025 937bbAPI | <a href="mailto:hi@vvhan.com" class="footer-link">hi@vvhan.com</a>
          <span class="footer-link">
            <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023000000号</a>
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { $apiFetch } from '~/utils/apiFetch.js'
const route = useRoute()
const api = ref({})
const apiBase = import.meta.env.VITE_API_BASE || ''
const fullApiUrl = computed(() => {
  if (!api.value.url) return ''
  if (api.value.url.startsWith('http')) return api.value.url
  return apiBase.replace(/\/$/, '') + api.value.url
})
const copyTip = ref(false)
const copyActive = ref(false)
function copyApiUrl() {
  if (!fullApiUrl.value) return
  navigator.clipboard.writeText(fullApiUrl.value)
  copyActive.value = true
  copyTip.value = true
  setTimeout(() => {
    copyTip.value = false
    copyActive.value = false
  }, 1400)
}
function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}
onMounted(async () => {
  // TODO: 替换为真实接口
  // const res = await $apiFetch(`/api/apis/${route.params.id}`)
  // api.value = res.data
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
.detail-bg {
  background: linear-gradient(180deg, #f8fafc 0%, #eaf6ff 100%);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.detail-main {
  flex: 1 0 auto;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 40px 16px;
  display: flex;
  flex-direction: column;
}
.detail-hero {
  width: 100%;
  background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
  color: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(56,189,248,0.08);
  margin: 32px 0 32px 0;
  padding: 38px 0 18px 0;
}
.detail-hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 0 36px;
}
.detail-hero-title {
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: 1.5px;
}
.detail-hero-summary {
  font-size: 1.13rem;
  opacity: 0.92;
  margin-bottom: 2px;
}
.detail-hero-meta {
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
}
.detail-method-badge {
  display: inline-block;
  padding: 2px 14px;
  border-radius: 999px;
  font-size: 0.98rem;
  font-weight: 700;
  background: #e0f2fe;
  color: #0284c7;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 8px;
}
.detail-method-badge.get { background: #dcfce7; color: #16a34a; }
.detail-method-badge.post { background: #fee2e2; color: #b91c1c; }
.detail-method-badge.put { background: #fef9c3; color: #b45309; }
.detail-method-badge.delete { background: #fee2e2; color: #b91c1c; }
.detail-hero-date {
  color: #e0e7ef;
  font-size: 1.02rem;
}
.detail-hero-count {
  color: #bae6fd;
  font-size: 1.02rem;
}
.detail-copy-btn {
  background: linear-gradient(90deg, #bae6fd 0%, #f1f5f9 100%);
  color: #0284c7;
  border: none;
  border-radius: 8px;
  padding: 7px 22px;
  font-size: 1.05rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 4px 0 rgba(56,189,248,0.08);
}
.detail-copy-btn:hover {
  background: #38bdf8;
  color: #fff;
}
.detail-copy-tip {
  color: #16a34a;
  font-size: 1.08rem;
  margin-top: 12px;
  text-align: right;
}
.detail-content {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
  border: 1.5px solid #e0e7ef;
  padding: 38px 38px 28px 38px;
  margin-bottom: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.detail-section-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.detail-section-title {
  font-size: 1.13rem;
  color: #0284c7;
  font-weight: bold;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 6px;
}
.detail-desc-block {
  background: #f8fbff;
  border-radius: 10px;
  padding: 20px 26px;
  color: #333;
  font-size: 1.13rem;
  margin-bottom: 0;
  box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04);
}
.detail-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 0;
  background: #fafcff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04);
}
.detail-table th, .detail-table td {
  border: 1px solid #e6e6e6;
  padding: 12px 18px;
  text-align: left;
  font-size: 1.07rem;
}
.detail-table th {
  background: #f0f7ff;
  color: #0284c7;
  font-weight: 700;
}
.detail-code {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  font-size: 1.07rem;
  color: #22223b;
  overflow-x: auto;
  box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04);
  margin-bottom: 0;
}
.detail-empty {
  color: #bbb;
  font-size: 1.03rem;
  padding: 8px 0;
}
.footer {
  width: 100%;
  background: #f8fafc;
  border-top: 1.5px solid #e0e7ef;
  padding: 32px 0 18px 0;
  margin-top: 32px;
  flex-shrink: 0;
}
.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.footer-text {
  color: #8b949e;
  font-size: 15px;
  text-align: center;
}
.footer-link {
  color: #0284c7;
  text-decoration: underline;
  margin-left: 8px;
}
@media (max-width: 900px) {
  .detail-main { max-width: 98vw; padding: 0 2vw 24px 2vw; }
  .detail-hero-inner { max-width: 98vw; }
  .detail-content { padding: 16px 4px 10px 4px; border-radius: 10px; }
  .detail-hero-title { font-size: 1.15rem; }
  .detail-hero-summary { font-size: 1rem; }
  .detail-section-title { font-size: 1rem; }
  .detail-desc-block { font-size: 1rem; padding: 12px 8px; }
  .detail-table th, .detail-table td { font-size: 0.98rem; padding: 8px 6px; }
  .detail-code { font-size: 0.98rem; padding: 8px; }
  .footer-inner { max-width: 98vw; }
}
@media (max-width: 700px) {
  .detail-main {
    max-width: 100vw;
    padding-left: 8px;
    padding-right: 8px;
  }
  .detail-hero { padding: 18px 0 8px 0; margin: 16px 0 16px 0; }
  .detail-hero-title { font-size: 1rem; }
  .detail-hero-summary { font-size: 0.95rem; }
  .detail-hero-meta { gap: 8px; font-size: 0.92rem; }
  .detail-content { padding: 8px 2px 6px 2px; border-radius: 8px; gap: 16px; }
  .detail-section-block { gap: 4px; }
  .footer { padding: 14px 0 8px 0; margin-top: 18px; }
  .footer-inner { padding: 0 4px; gap: 4px; }
  .footer-text { font-size: 13px; }
}
</style>
