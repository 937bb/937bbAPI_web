<!--
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-23 08:44:15
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-24 11:13:33
-->
<template>
  <div 
    class="bg-white/95 rounded-xl p-4.5 border border-gray-100 shadow-sm transition-all duration-200
           hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transform hover:-translate-y-0.5"
    @click="navigateToDetail"
  >
    <div class="flex items-center justify-between mb-1.5">
      <h3 class="text-base font-bold text-gray-900 truncate">{{ api.title }}</h3>
      <span 
        class="inline-block w-2 h-2 rounded-full"
        :class="api.status === 'active' ? 'bg-green-500' : 'bg-gray-300'"
      ></span>
    </div>
    
    <p class="text-gray-500 text-sm truncate">{{ api.summary }}</p>
    
    <p 
      v-if="api.description" 
      class="text-gray-400 text-xs mt-0.5 truncate"
    >
      {{ api.description }}
    </p>
    
    <div class="h-px bg-gradient-to-r from-blue-50 to-transparent my-2"></div>
    
    <div class="flex items-center justify-between text-xs text-gray-400 pt-1">
      <span class="flex items-center">
        <span class="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
        <span class="font-medium">{{ api.requestCount }}</span>
        <span class="ml-0.5">w</span>
      </span>
      <span class="bg-gray-100 px-2 py-0.5 rounded text-gray-500 text-xs">
        {{ api.type || 'RESTful API' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({ 
  api: {
    type: Object,
    required: true
  } 
});

const router = useRouter();

const navigateToDetail = () => {
  if (props.api?.id) {
    router.push(`/api/${props.api.id}`);
  }
};
</script>

<style scoped>
/* Removed all styles as they are now handled by Tailwind CSS classes */
</style>