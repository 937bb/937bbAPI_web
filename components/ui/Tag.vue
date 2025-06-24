<template>
  <span 
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variantClasses,
      sizeClasses,
      {
        'cursor-pointer hover:opacity-80': clickable,
        'inline-flex items-center': $slots.prefix || $slots.suffix,
      },
      className
    ]"
    @click="handleClick"
  >
    <!-- 前缀图标 -->
    <span v-if="$slots.prefix" class="mr-1">
      <slot name="prefix"></slot>
    </span>
    
    <!-- 内容 -->
    <slot>{{ text }}</slot>
    
    <!-- 后缀图标 -->
    <span v-if="$slots.suffix" class="ml-1">
      <slot name="suffix"></slot>
    </span>
    
    <!-- 可关闭按钮 -->
    <button 
      v-if="closable" 
      type="button" 
      class="ml-1.5 -mr-0.5 flex-shrink-0 flex items-center justify-center rounded-full focus:outline-none"
      :class="{
        'text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500': variant === 'primary',
        'text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500': variant === 'secondary' || variant === 'outline',
        'text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500': variant === 'success',
        'text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:bg-yellow-500': variant === 'warning',
        'text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500': variant === 'error',
        'h-3.5 w-3.5': size === 'sm',
        'h-4 w-4': size === 'md' || size === 'lg',
      }"
      @click.stop="handleClose"
    >
      <span class="sr-only">Remove</span>
      <svg class="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
        <path fill-rule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clip-rule="evenodd" />
      </svg>
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'error', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  rounded: {
    type: Boolean,
    default: true
  },
  closable: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'click']);

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    outline: 'bg-white text-gray-700 border border-gray-300'
  };
  return variants[props.variant] || variants.primary;
});

const sizeClasses = computed(() => ({
  'text-xs px-2 py-0.5': props.size === 'sm',
  'text-sm px-2.5 py-0.5': props.size === 'md',
  'text-base px-3 py-1': props.size === 'lg',
  'rounded-full': props.rounded,
  'rounded': !props.rounded
}));

const handleClose = (event) => {
  event.stopPropagation();
  emit('close', event);
};

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event);
  }
};
</script>
