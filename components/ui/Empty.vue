<template>
  <div 
    :class="[
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className
    ]"
  >
    <!-- 图标 -->
    <div 
      class="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4"
      :class="{
        'text-blue-500': variant === 'primary',
        'text-gray-500': variant === 'secondary',
        'text-green-500': variant === 'success',
        'text-yellow-500': variant === 'warning',
        'text-red-500': variant === 'error',
      }"
    >
      <slot name="icon">
        <component 
          :is="iconComponent" 
          class="h-8 w-8" 
          aria-hidden="true" 
        />
      </slot>
    </div>
    
    <!-- 标题 -->
    <h3 
      v-if="title" 
      class="text-lg font-medium text-gray-900 mb-1"
    >
      {{ title }}
    </h3>
    
    <!-- 描述 -->
    <p 
      v-if="description" 
      class="text-sm text-gray-500 mb-6 max-w-md"
    >
      {{ description }}
    </p>
    
    <!-- 操作按钮 -->
    <div v-if="$slots.default" class="mt-2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { 
  DocumentTextIcon,
  InboxIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  title: {
    type: String,
    default: '暂无数据'
  },
  description: {
    type: String,
    default: '当前没有可显示的数据，请稍后再试或尝试其他操作。'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
});

const iconComponent = computed(() => {
  const icons = {
    primary: DocumentTextIcon,
    secondary: InboxIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationCircleIcon
  };
  return icons[props.variant] || DocumentTextIcon;
});
</script>
