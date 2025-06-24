<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[
                'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                maxWidthClass,
                className
              ]"
            >
              <!-- 标题 -->
              <DialogTitle
                v-if="title"
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              
              <!-- 内容 -->
              <div class="mt-2">
                <slot></slot>
              </div>

              <!-- 底部按钮 -->
              <div v-if="showFooter" class="mt-6 flex justify-end space-x-3">
                <slot name="footer">
                  <Button 
                    v-if="showCancelButton"
                    variant="outline" 
                    @click="handleCancel"
                  >
                    {{ cancelText }}
                  </Button>
                  <Button 
                    v-if="showConfirmButton"
                    :variant="confirmButtonVariant"
                    :loading="loading"
                    @click="handleConfirm"
                  >
                    {{ confirmText }}
                  </Button>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import Button from './Button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].includes(value)
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  confirmButtonVariant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success', 'warning', 'info'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'update:modelValue',
  'open',
  'opened',
  'close',
  'closed',
  'confirm',
  'cancel'
]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const maxWidthClass = computed(() => {
  const sizes = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  };
  return sizes[props.size] || sizes.md;
});

const openModal = () => {
  isOpen.value = true;
  emit('open');
  // 使用 nextTick 确保 DOM 更新后再触发 opened 事件
  nextTick(() => {
    emit('opened');
  });
};

const closeModal = () => {
  if (!props.closeOnClickModal) return;
  isOpen.value = false;
  emit('close');
  // 使用 nextTick 确保 DOM 更新后再触发 closed 事件
  nextTick(() => {
    emit('closed');
  });
};

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  closeModal();
  emit('cancel');
};

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  if (val) {
    openModal();
  } else {
    closeModal();
  }
});

// 监听 ESC 按键
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.closeOnPressEscape) {
    closeModal();
  }
};

// 添加/移除事件监听
onMounted(() => {
  if (props.modelValue) {
    openModal();
  }
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
