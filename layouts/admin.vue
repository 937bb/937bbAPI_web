<template>
  <div class="admin-layout">
    <!-- Mobile Header -->
    <header class="mobile-header">
      <button class="menu-toggle" @click="toggleMobileMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div class="mobile-title">
        <span v-if="isUserPage">用户管理</span>
        <span v-else-if="isApiPage">API接口管理</span>
        <span v-else>后台管理</span>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div 
      :class="['mobile-overlay', { active: mobileMenuOpen }]"
      @click="closeMobileMenu"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="admin-sider" 
      :class="{
        'collapsed': siderCollapsed,
        'mobile-open': mobileMenuOpen
      }"
    >
      <div class="admin-logo">API 后台管理</div>
      <nav class="admin-menu">
        <NuxtLink
          to="/admin"
          :class="['admin-menu-item', { active: isConsolePage }]"
          @click="closeMobileMenu"
        >
          <span>控制台</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/users"
          :class="['admin-menu-item', { active: isUserPage }]"
          @click="closeMobileMenu"
        >
          <span>用户管理</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/api"
          :class="['admin-menu-item', { active: isApiPage }]"
          @click="closeMobileMenu"
        >
          <span>API管理</span>
        </NuxtLink>
      </nav>
      <div class="admin-sider-toggle" @click="siderCollapsed = !siderCollapsed">
        <span>{{ siderCollapsed ? "→" : "←" }}</span>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="admin-content">
        <NuxtPage />
      </div>
      <footer class="admin-footer">
        <p>© 2025 API 后台管理</p>
        <p v-if="icp" class="mt-1 text-sm text-gray-500">
          <a :href="icpUrl" target="_blank" class="hover:underline">{{ icp }}</a>
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useGlobalConfig } from "~/utils/globalConfig.js";

const { siteName, icp, icpUrl } = useGlobalConfig();
const siderCollapsed = ref(false);
const mobileMenuOpen = ref(false);
const route = useRoute();

const isConsolePage = computed(() => route.path === "/admin");
const isUserPage = computed(() => route.path.startsWith("/admin/users"));
const isApiPage = computed(() => route.path.startsWith("/admin/api"));

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  // Prevent body scroll when menu is open
  if (process.client) {
    document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  if (process.client) {
    document.body.style.overflow = '';
  }
};

// Close mobile menu when route changes
watch(() => route.path, () => {
  closeMobileMenu();
});

// Close menu when clicking outside on mobile
const handleClickOutside = (event) => {
  const sidebar = document.querySelector('.admin-sider');
  const menuButton = document.querySelector('.menu-toggle');
  
  if (mobileMenuOpen.value && 
      !sidebar.contains(event.target) && 
      !menuButton.contains(event.target)) {
    closeMobileMenu();
  }
};

// Add/remove event listener for outside clicks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
  position: relative;
}

/* Mobile Header */
.mobile-header {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.menu-toggle {
  background: none;
  border: none;
  padding: 8px;
  margin-right: 12px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

.admin-sider {
  width: 250px;
  background-color: #001529;
  color: #fff;
  transition: transform 0.3s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
}

.admin-sider.mobile-open {
  transform: translateX(0);
}

@media (min-width: 769px) {
  .admin-sider {
    transform: none;
    left: 0;
  }
  
  .admin-sider.collapsed {
    width: 80px;
  }
  
  .admin-sider:not(.collapsed) + .admin-main {
    margin-left: 250px;
  }
  
  .admin-sider.collapsed + .admin-main {
    margin-left: 80px;
  }
}

.admin-sider.collapsed {
  width: 80px;
}

.admin-logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #002140;
}

.admin-menu {
  padding: 16px 0;
}

.admin-menu-item {
  display: block;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.3s;
  text-decoration: none;
}

.admin-menu-item:hover {
  color: #fff;
  background-color: #1890ff;
}

.admin-menu-item.active {
  color: #fff;
  background-color: #1890ff;
}

.admin-sider-toggle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #002140;
  color: #fff;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 56px;
  transition: margin 0.3s ease;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  padding: 0;
}

@media (min-width: 769px) {
  .admin-main {
    margin-top: 0;
    padding: 24px;
    margin-left: 250px;
    width: calc(100% - 250px);
  }
  
  .admin-sider.collapsed + .admin-main {
    margin-left: 80px;
    width: calc(100% - 80px);
  }
  
  .admin-content {
    padding: 24px;
  }
}

.admin-content {
  flex: 1;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0 auto;
  background-color: #f5f7fa;
}

/* Ensure content takes full width on mobile */
.admin-content > div {
  width: 100%;
  max-width: 100%;
}

/* Ensure pages have consistent padding */
.admin-content > div > div:first-child {
  padding: 1rem;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;
}

/* Add consistent spacing for mobile */
@media (max-width: 768px) {
  .admin-content > div > div:first-child {
    padding: 1rem;
  }
  
  /* Add margin to the main content containers */
  .admin-content > div > div {
    margin: 0.5rem;
  }
  
  /* Ensure tables and cards have proper spacing */
  .bg-white {
    margin: 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  /* Add spacing between sections */
  .space-y-3 > * + * {
    margin-top: 1rem;
  }
}

.admin-footer {
  padding: 16px 24px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
}

/* 响应式设计 */
@media (min-width: 769px) {
  .mobile-header,
  .mobile-overlay {
    display: none;
  }
  
  .admin-content {
    max-width: 100%;
    overflow-x: auto;
  }
  
  .admin-sider {
    position: fixed;
    left: 0;
    transform: none;
    width: 200px;
  }
  
  .admin-main {
    margin-left: 200px;
    margin-top: 0;
  }
  
  .admin-sider.collapsed + .admin-main {
    margin-left: 80px;
  }
}

@media (max-width: 768px) {
  .mobile-overlay {
    display: block;
  }
  
  .admin-sider {
    transform: translateX(-100%);
  }
  
  .admin-sider.mobile-open {
    transform: translateX(0);
  }
  
  .admin-main {
    margin-left: 0;
  }
  
  .admin-sider-toggle {
    display: none;
  }
}
</style>
