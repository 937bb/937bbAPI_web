<template>
  <div class="home">
    <header class="main-header">
      <div class="stats-bar">
        <span>API 总数：<b>{{ apiCount }}</b></span>
        <span>总调用次数：<b>{{ totalRequestCount }}</b></span>
      </div>
      <div class="search-bar">
        <input v-model="searchText" type="text" placeholder="搜索 API 名称/描述..." @input="onSearch" />
        <button @click="onSearch">搜索</button>
      </div>
    </header>

    <!-- 最新发布区域 -->
    <section class="section-block">
      <h2><i class="iconfont">🔥</i> 最新发布</h2>
      <ul class="latest-list">
        <li v-for="api in latestApis" :key="api.id">
          <nuxt-link :to="`/api/${api.id}`" class="api-link-latest">
            <div class="api-card-header">
              <span class="api-title">{{ api.title }}</span>
              <span class="api-method" :class="api.method.toLowerCase()">{{ api.method }}</span>
            </div>
            <div class="api-summary">{{ api.summary }}</div>
            <div class="api-url">{{ api.url }}</div>
          </nuxt-link>
        </li>
      </ul>
    </section>

    <!-- API 列表区域 -->
    <section class="section-block">
      <h2><i class="iconfont">📚</i> API 列表</h2>
      <ul class="api-list">
        <li v-for="api in apis" :key="api.id">
          <nuxt-link :to="`/api/${api.id}`" class="api-link">
            <div class="api-card-header">
              <span class="api-title">{{ api.title }}</span>
              <span class="api-method" :class="api.method.toLowerCase()">{{ api.method }}</span>
            </div>
            <div class="api-summary">{{ api.summary }}</div>
            <div class="api-url">{{ api.url }}</div>
          </nuxt-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'
const config = useRuntimeConfig()
const siteName = config.public.siteName || '937bb——API 聚合站'

// 搜索相关
const searchText = ref('')
const latestApis = ref([
  {
    id: '1',
    title: '二维码生成API',
    summary: '快速生成二维码图片',
    url: '/api/qr',
    method: 'GET',
    createTime: '2025-06-20',
    requestCount: 1234
  }
])
const apisOrigin = [
  {
    id: '1',
    title: '二维码生成API',
    summary: '快速生成二维码图片',
    url: '/api/qr',
    method: 'GET',
    createTime: '2025-06-20',
    requestCount: 1234
  },
  {
    id: '2',
    title: '每日一言API',
    summary: '获取每日一句有趣的话',
    url: '/api/yy',
    method: 'GET',
    createTime: '2025-06-18',
    requestCount: 888
  }
]
const apis = ref([...apisOrigin])

function onSearch() {
  const text = searchText.value.trim().toLowerCase()
  if (!text) {
    apis.value = [...apisOrigin]
    return
  }
  apis.value = apisOrigin.filter(api =>
    api.title.toLowerCase().includes(text) ||
    api.summary.toLowerCase().includes(text)
  )
}

// 统计
const apiCount = computed(() => apisOrigin.length)
const totalRequestCount = computed(() => apisOrigin.reduce((sum, api) => sum + (api.requestCount || 0), 0))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
.home {
  max-width: 1440px;
  margin: 40px auto 0 auto;
  padding: 40px 24px 60px 24px;
  background: linear-gradient(135deg, #f6f7fb 0%, #f0f4f8 100%);
  border-radius: 24px;
  box-shadow: 0 8px 40px 0 rgba(60,80,120,0.08);
}
.main-header {
  background: linear-gradient(90deg, #f7fafc 0%, #e3e8f0 100%);
  padding: 32px 0 18px 0;
  box-shadow: 0 2px 12px 0 rgba(60,80,120,0.06);
  border-bottom: 2px solid #e3eaf2;
  margin-bottom: 40px;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.site-title {
  font-family: 'Montserrat', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2b3a55;
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px rgba(43,58,85,0.06);
}
.site-desc {
  color: #7a869a;
  font-size: 1rem;
  margin-bottom: 0;
}
.stats-bar {
  font-size: 0.98rem;
  color: #3b5998;
  font-weight: 600;
}
.stats-bar b {
  color: #ff9800;
  font-size: 1.08rem;
}
.search-bar {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(60,80,120,0.06);
  border: 1.5px solid #e3eaf2;
  width: 340px;
  margin: 12px auto 0 auto;
  display: flex;
  align-items: center;
  padding: 4px 10px;
}
.search-bar input {
  width: 200px;
  padding: 7px 12px;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  outline: none;
  background: transparent;
  color: #2b3a55;
}
.search-bar input:focus {
  background: #f6f7fb;
}
.search-bar button {
  padding: 7px 18px;
  background: linear-gradient(90deg, #3b5998 0%, #5b86e5 100%);
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 4px 0 rgba(60,80,120,0.04);
}
.search-bar button:hover {
  background: linear-gradient(90deg, #5b86e5 0%, #3b5998 100%);
}
.section-block {
  margin-bottom: 40px;
}
.section-block h2 {
  font-size: 1.1rem;
  color: #2b3a55;
  margin-bottom: 18px;
  border-left: 5px solid #5b86e5;
  padding-left: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}
.latest-list, .api-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
@media (max-width: 1100px) {
  .latest-list, .api-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .home {
    padding: 10px 2vw 24px 2vw;
    border-radius: 0;
    max-width: 100vw;
  }
  .main-header {
    padding: 18px 0 10px 0;
    margin-bottom: 24px;
  }
  .stats-bar {
    flex-direction: column;
    gap: 8px;
    font-size: 0.92rem;
  }
  .search-bar {
    width: 98vw;
    min-width: 0;
    max-width: 98vw;
    padding: 4px 2vw;
  }
  .section-block {
    margin-bottom: 24px;
  }
  .latest-list, .api-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .api-link, .api-link-latest {
    padding: 12px 6px 10px 6px;
    border-radius: 10px;
  }
  .api-title {
    font-size: 0.98rem;
  }
  .api-summary, .api-url, .api-method {
    font-size: 0.9rem;
  }
}
@media (max-width: 700px) {
  .latest-list, .api-list {
    grid-template-columns: 1fr;
  }
  .home {
    padding: 10px 2vw 24px 2vw;
    border-radius: 0;
  }
  .main-header h1 {
    font-size: 1.5rem;
  }
  .section-block h2 {
    font-size: 1.1rem;
    padding-left: 6px;
  }
  .api-link, .api-link-latest {
    padding: 14px 10px 12px 10px;
  }
  .api-title {
    font-size: 1rem;
  }
  .api-summary, .api-url, .api-method {
    font-size: 0.92rem;
  }
}
.api-link, .api-link-latest {
  display: block;
  background: linear-gradient(120deg, #f7fafc 0%, #e3e8f0 100%);
  border-radius: 14px;
  padding: 20px 22px 16px 22px;
  text-decoration: none;
  transition: box-shadow 0.2s, background 0.2s, transform 0.2s;
  box-shadow: 0 2px 12px 0 rgba(60,80,120,0.06);
  border: 1.5px solid #e3eaf2;
  color: #2b3a55;
  position: relative;
  overflow: hidden;
}
.api-link:hover, .api-link-latest:hover {
  background: linear-gradient(120deg, #5b86e5 0%, #36d1c4 100%);
  color: #fff;
  box-shadow: 0 8px 32px 0 rgba(91,134,229,0.18);
  transform: translateY(-2px) scale(1.02);
}
.api-link:hover .api-title,
.api-link-latest:hover .api-title,
.api-link:hover .api-summary,
.api-link-latest:hover .api-summary,
.api-link:hover .api-method,
.api-link-latest:hover .api-method,
.api-link:hover .api-url,
.api-link-latest:hover .api-url {
  color: #fff !important;
}
.api-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.api-title {
  font-size: 1rem;
  font-weight: 700;
  color: #3b5998;
  letter-spacing: 1px;
}
.api-method {
  font-size: 0.92rem;
  font-weight: 600;
  padding: 2px 12px;
  border-radius: 8px;
  background: #e3eaf2;
  color: #5b86e5;
  margin-left: 8px;
  box-shadow: 0 1px 4px 0 rgba(60,80,120,0.04);
}
.api-method.get {
  background: #e3f2fd;
  color: #1976d2;
}
.api-method.post {
  background: #fff7e6;
  color: #ff9800;
}
.api-summary {
  font-size: 0.95rem;
  color: #7a869a;
  margin-bottom: 8px;
  font-weight: 500;
}
.api-url {
  font-size: 0.92rem;
  color: #36d1c4;
  background: #e0f7fa;
  border-radius: 6px;
  padding: 2px 10px;
  margin-top: 6px;
  display: inline-block;
}
</style>
