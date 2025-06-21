<template>
  <div>
    <!-- 全局头部，仅在非详情页显示 -->
    <header v-if="!isApiDetail" class="global-header">
      <div class="header-inner">
        <h1 class="site-title">{{ siteName }}</h1>
        <p class="site-desc">有趣的API，尽在此处</p>
      </div>
    </header>
    <!-- 页面内容渲染区域 -->
    <NuxtPage />
    <!-- 全局底部，展示备案号 -->
    <footer class="global-footer">
      <span v-if="icp && icp.length > 0"
        >备案号：<a :href="icpUrl" target="_blank" style="color: #aaa">{{
          icp
        }}</a></span
      >
      <span v-else>&copy; 2025 {{ siteName }} | 由 Nuxt3 驱动</span>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const siteName = import.meta.env.VITE_SITE_NAME || '937bb——API 聚合站';
const icp = import.meta.env.VITE_ICP || '';
const icpUrl = icp ? `https://beian.miit.gov.cn/` : "#";
// 判断当前是否为API详情页
const isApiDetail = route.path.startsWith('/api/')
</script>

<style scoped>
.global-header {
  background: linear-gradient(90deg, #f8fbff 0%, #eaf6ff 100%);
  padding: 36px 0 24px 0;
  box-shadow: 0 2px 12px 0 rgba(45,140,240,0.06);
  border-bottom: 2px solid #e3eaf2;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.site-title {
  font-family: 'Montserrat', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 2.6rem;
  font-weight: 800;
  color: #1a73e8;
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px rgba(26,115,232,0.08);
}
.site-desc {
  color: #5a6d8a;
  font-size: 1.15rem;
  margin-bottom: 0;
}
.global-footer {
  text-align: center;
  padding: 16px 0;
  color: #aaa;
  font-size: 14px;
  border-top: 1.5px solid #e3eaf2;
  background: #f8fbff;
  margin-top: 40px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
body {
  padding-bottom: 60px;
}
</style>
