<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative rounded-md shadow-sm">
      <!-- 前置图标 -->
      <div v-if="$slots.prefix || prefixIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix">
          <component :is="prefixIcon" v-if="prefixIcon" class="h-5 w-5 text-gray-400" />
        </slot>
      </div>
      
      <!-- 输入框 -->
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="[
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
          { 'pl-10': $slots.prefix || prefixIcon },
          { 'pr-10': $slots.suffix || suffixIcon },
          { 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500': error },
          { 'opacity-50 bg-gray-50 cursor-not-allowed': disabled },
          sizeClasses,
          inputClass
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      
      <!-- 后置图标 -->
      <div v-if="$slots.suffix || suffixIcon" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="suffix">
          <component :is="suffixIcon" v-if="suffixIcon" class="h-5 w-5 text-gray-400" />
        </slot>
      </div>
    </div>
    
    <!-- 错误信息 -->
    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
    
    <!-- 帮助文本 -->
    <p v-else-if="helperText" class="mt-1 text-sm text-gray-500">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${uuidv4()}`
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'tel', 'number', 'url', 'search'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  prefixIcon: {
    type: Object,
    default: null
  },
  suffixIcon: {
    type: Object,
    default: null
  },
  inputClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const sizeClasses = computed(() => ({
  'py-2 px-3': props.size === 'sm',
  'py-2.5 px-3': props.size === 'md',
  'py-3 px-4': props.size === 'lg',
  'text-sm': props.size === 'sm' || props.size === 'md',
  'text-base': props.size === 'lg'
}));
</script>
