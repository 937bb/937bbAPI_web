<template>
  <footer class="bg-white border-t border-gray-100 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页脚主要内容 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 网站Logo和描述 -->
        <div class="space-y-4">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-bold text-blue-600">{{ siteName }}</span>
          </NuxtLink>
          <p class="text-gray-600 text-sm">
            提供稳定、安全、高效的API接口服务，助力开发者快速构建应用
          </p>
        </div>

        <!-- 联系我们 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">联系我们</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm text-gray-600">support@example.com</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-sm text-gray-600">+86 123 4567 8910</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="text-center">
          <p class="text-sm text-gray-500">
            &copy; {{ currentYear }} {{ siteName }}. 保留所有权利。
          </p>
          <div class="mt-2">
            <a 
              :href="icpUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-xs text-gray-500 hover:text-blue-600 transition-colors"
            >
              {{ icp }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useGlobalConfig } from '~/utils/globalConfig';

// 获取全局配置
const { siteName, icp, icpUrl } = useGlobalConfig();
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
/* 平滑悬停过渡效果 */
a, button {
  transition: all 0.2s ease-in-out;
}

/* 可访问性：焦点样式 */
a:focus, button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.5);
}

/* 屏幕阅读器专用 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
