<template>
  <div 
    v-if="loading"
    :class="[
      'flex items-center justify-center',
      fullscreen ? 'fixed inset-0 z-50 bg-white bg-opacity-75' : '',
      className
    ]"
  >
    <div class="flex flex-col items-center">
      <!-- 加载动画 -->
      <div class="relative">
        <!-- 外圈 -->
        <div 
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          :class="{
            'border-blue-500': variant === 'primary',
            'border-gray-200': variant === 'secondary',
            'border-green-500': variant === 'success',
            'border-yellow-500': variant === 'warning',
            'border-red-500': variant === 'error',
            'h-12 w-12 border-2': size === 'lg',
            'h-8 w-8 border-2': size === 'md',
            'h-4 w-4 border': size === 'sm',
            'h-3 w-3 border': size === 'xs',
          }"
        ></div>
        
        <!-- 内圈（仅大尺寸显示） -->
        <div 
          v-if="size === 'lg'"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-2"
          :class="{
            'border-blue-200': variant === 'primary',
            'border-gray-100': variant === 'secondary',
            'border-green-200': variant === 'success',
            'border-yellow-200': variant === 'warning',
            'border-red-200': variant === 'error',
          }"
        ></div>
      </div>
      
      <!-- 加载文本 -->
      <p 
        v-if="text || $slots.default"
        :class="[
          'mt-2 text-center',
          {
            'text-sm': size === 'sm' || size === 'xs',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
            'text-blue-600': variant === 'primary',
            'text-gray-600': variant === 'secondary',
            'text-green-600': variant === 'success',
            'text-yellow-600': variant === 'warning',
            'text-red-600': variant === 'error',
          }
        ]"
      >
        <slot>{{ text }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});
</script>
