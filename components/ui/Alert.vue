<template>
  <div 
    :class="[
      'rounded-md p-4',
      alertVariants[variant].container,
      className
    ]"
    role="alert"
  >
    <div class="flex">
      <!-- 图标 -->
      <div :class="['flex-shrink-0', alertVariants[variant].iconContainer]">
        <component 
          :is="iconComponent" 
          :class="['h-5 w-5', alertVariants[variant].icon]" 
          aria-hidden="true" 
        />
      </div>
      
      <!-- 内容 -->
      <div class="ml-3">
        <h3 v-if="title" :class="['text-sm font-medium', alertVariants[variant].title]">
          {{ title }}
        </h3>
        <div :class="['mt-2 text-sm', alertVariants[variant].message]">
          <slot>{{ message }}</slot>
        </div>
        
        <!-- 操作按钮 -->
        <div v-if="$slots.actions" class="mt-4">
          <div class="-mx-2 -my-1.5 flex">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
      
      <!-- 关闭按钮 -->
      <div v-if="dismissible" class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            :class="[
              'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
              alertVariants[variant].closeButton
            ]"
            @click="$emit('dismiss')"
          >
            <span class="sr-only">关闭</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline';

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['dismiss']);

const iconComponent = computed(() => {
  const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon
  };
  return icons[props.variant];
});

const alertVariants = {
  info: {
    container: 'bg-blue-50',
    iconContainer: 'text-blue-400',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    message: 'text-blue-700',
    closeButton: 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50'
  },
  success: {
    container: 'bg-green-50',
    iconContainer: 'text-green-400',
    icon: 'text-green-500',
    title: 'text-green-800',
    message: 'text-green-700',
    closeButton: 'text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50'
  },
  warning: {
    container: 'bg-yellow-50',
    iconContainer: 'text-yellow-400',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    message: 'text-yellow-700',
    closeButton: 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50'
  },
  error: {
    container: 'bg-red-50',
    iconContainer: 'text-red-400',
    icon: 'text-red-500',
    title: 'text-red-800',
    message: 'text-red-700',
    closeButton: 'text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50'
  }
};
</script>
