<template>
  <component
    :is="tag"
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      'disabled:opacity-50 disabled:pointer-events-none',
      buttonSizes[size],
      buttonVariants[variant][theme],
      fullWidth ? 'w-full' : '',
      className
    ]"
    :disabled="loading || disabled"
    v-bind="$attrs"
  >
    <span v-if="loading" class="absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'link', 'danger'].includes(value)
  },
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'light', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'a', 'router-link', 'nuxt-link'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
});

const buttonSizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base'
};

const buttonVariants = {
  primary: {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    light: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    dark: 'bg-blue-800 text-white hover:bg-blue-900'
  },
  secondary: {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    light: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
    dark: 'bg-gray-700 text-white hover:bg-gray-600'
  },
  outline: {
    default: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
    light: 'bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50',
    dark: 'bg-transparent border border-gray-600 text-white hover:bg-gray-800'
  },
  ghost: {
    default: 'bg-transparent text-gray-700 hover:bg-gray-100',
    light: 'bg-transparent text-gray-700 hover:bg-gray-50',
    dark: 'bg-transparent text-white hover:bg-gray-800'
  },
  link: {
    default: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline',
    light: 'bg-transparent text-blue-500 hover:text-blue-700 hover:underline',
    dark: 'bg-transparent text-blue-400 hover:text-blue-300 hover:underline'
  },
  danger: {
    default: 'bg-red-600 text-white hover:bg-red-700',
    light: 'bg-red-100 text-red-700 hover:bg-red-200',
    dark: 'bg-red-800 text-white hover:bg-red-900'
  }
};
</script>
