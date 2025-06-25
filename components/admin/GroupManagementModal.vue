<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-50" @close="$emit('update:modelValue', false)">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <FolderIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    分组管理
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="space-y-3 max-h-60 overflow-y-auto pr-2">
                      <div 
                        v-for="(group, index) in groups" 
                        :key="group.id" 
                        class="group flex items-center justify-between rounded-lg p-3 transition-colors duration-150 hover:bg-gray-50"
                        :class="{ 'bg-blue-50': index % 2 === 0 }"
                      >
                        <div class="flex items-center min-w-0">
                          <FolderIcon class="h-5 w-5 flex-shrink-0 text-gray-400 mr-3" />
                          <span class="truncate text-sm font-medium text-gray-900">{{ group.title }}</span>
                        </div>
                        <button
                          type="button"
                          @click="$emit('delete', group)"
                          :disabled="loading"
                          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <TrashIcon class="h-3.5 w-3.5 mr-1" />
                          删除
                        </button>
                      </div>
                      <div v-if="groups.length === 0" class="text-center py-4">
                        <p class="text-sm text-gray-500">暂无分组，请添加</p>
                      </div>
                    </div>
                    
                    <div class="mt-5 sm:mt-6">
                      <div class="flex space-x-3">
                        <div class="flex-1">
                          <input
                            type="text"
                            :value="newGroupName"
                            @input="$emit('update:newGroupName', $event.target.value)"
                            placeholder="输入新分组名称"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            :disabled="loading"
                            @keyup.enter="$emit('add')"
                          />
                        </div>
                        <button
                          type="button"
                          @click="$emit('add')"
                          :disabled="!newGroupName.trim() || loading"
                          class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <PlusIcon class="-ml-1 mr-1.5 h-4 w-4" />
                          添加
                        </button>
                      </div>
                      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  @click="$emit('update:modelValue', false)"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm transition-colors"
                  :disabled="loading"
                >
                  关闭
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { FolderIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline';

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  groups: {
    type: Array,
    required: true,
    default: () => []
  },
  newGroupName: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue', 'update:newGroupName', 'add', 'delete']);
</script>
