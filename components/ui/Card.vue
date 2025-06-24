<template>
  <div 
    :class="[
      'bg-white rounded-lg shadow-sm overflow-hidden',
      {'hover:shadow-md transition-shadow duration-200': hoverable},
      {'border border-gray-200': !noBorder},
      className
    ]"
    v-bind="$attrs"
  >
    <!-- 卡片头部 -->
    <div 
      v-if="$slots.header || title" 
      class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
    >
      <h3 v-if="title" class="text-lg font-medium text-gray-900">
        {{ title }}
      </h3>
      <slot name="header"></slot>
    </div>
    
    <!-- 卡片内容 -->
    <div :class="['p-6', { 'pt-0': $slots.header || title }]">
      <slot></slot>
    </div>
    
    <!-- 卡片底部 -->
    <div 
      v-if="$slots.footer" 
      class="px-6 py-4 bg-gray-50 border-t border-gray-100"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});
</script>
