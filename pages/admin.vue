<template>
  <div class="admin-layout">
    <aside class="admin-sider" :class="{collapsed: siderCollapsed}">
      <div class="admin-logo">API 后台管理</div>
      <nav class="admin-menu">
        <NuxtLink to="/admin/users" :class="['admin-menu-item', {active: isUserPage}]">
          <span>用户管理</span>
        </NuxtLink>
        <NuxtLink to="/admin/api" :class="['admin-menu-item', {active: isApiPage}]">
          <span>API管理</span>
        </NuxtLink>
      </nav>
      <div class="admin-sider-toggle" @click="siderCollapsed=!siderCollapsed">
        <span>{{ siderCollapsed ? '→' : '←' }}</span>
      </div>
    </aside>
    <main class="admin-main">
      <header class="admin-header">
        <span v-if="isUserPage">用户管理</span>
        <span v-else-if="isApiPage">API接口管理</span>
        <span v-else>后台管理</span>
      </header>
      <section class="admin-content">
        <NuxtPage />
      </section>
      <footer class="admin-footer">© 2025 API 后台管理</footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalConfig } from '~/utils/globalConfig.js'
const { siteName, icp, icpUrl } = useGlobalConfig();
const siderCollapsed = ref(false)
const route = useRoute()
const isUserPage = computed(() => route.path.startsWith('/admin/users'))
const isApiPage = computed(() => route.path.startsWith('/admin/api'))
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #f4f7fb; }
.admin-sider { width: 210px; background: #fff; box-shadow: 2px 0 12px 0 rgba(56,189,248,0.07); display: flex; flex-direction: column; transition: width 0.2s; }
.admin-sider.collapsed { width: 56px; }
.admin-logo { font-size: 1.18rem; font-weight: bold; color: #6366f1; padding: 28px 0 18px 0; text-align: center; letter-spacing: 1px; }
.admin-menu { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.admin-menu-item { padding: 14px 0 14px 38px; font-size: 1.07rem; color: #555; cursor: pointer; border-left: 4px solid transparent; transition: background 0.2s, color 0.2s, border 0.2s; }
.admin-menu-item.active { background: #f0f7ff; color: #6366f1; border-left: 4px solid #6366f1; font-weight: 600; }
.admin-sider-toggle { padding: 10px 0; text-align: center; color: #bbb; cursor: pointer; font-size: 1.2rem; border-top: 1px solid #f0f0f0; }
.admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.admin-header { height: 56px; background: #fff; box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04); display: flex; align-items: center; padding: 0 32px; font-size: 1.13rem; color: #6366f1; font-weight: 600; letter-spacing: 1px; }
.admin-content { flex: 1; padding: 32px 36px 18px 36px; min-width: 0; }
.admin-footer { text-align: center; color: #bbb; font-size: 0.98rem; padding: 12px 0 8px 0; background: none; }
@media (max-width: 900px) {
  .admin-layout { flex-direction: column; }
  .admin-sider { width: 100vw; flex-direction: row; height: 48px; box-shadow: none; border-bottom: 1.5px solid #f0f0f0; }
  .admin-sider.collapsed { width: 100vw; }
  .admin-logo { display: none; }
  .admin-menu { flex-direction: row; gap: 0; }
  .admin-menu-item { padding: 0 18px; border-left: none; border-bottom: 3px solid transparent; height: 48px; display: flex; align-items: center; }
  .admin-menu-item.active { background: #f0f7ff; border-bottom: 3px solid #6366f1; border-left: none; }
  .admin-sider-toggle { display: none; }
  .admin-main { padding-top: 0; }
  .admin-header { padding: 0 16px; font-size: 1.05rem; }
  .admin-content { padding: 18px 4vw 12px 4vw; }
}
</style>
