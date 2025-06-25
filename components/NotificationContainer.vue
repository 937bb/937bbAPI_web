<template>
  <transition-group
    name="notification"
    tag="div"
    class="fixed top-4 right-4 z-50 space-y-3 w-full max-w-xs"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="relative p-4 rounded-lg shadow-lg transition-all duration-300 transform"
      :class="[
        'flex items-start',
        {
          'bg-green-50': notification.type === 'success',
          'bg-red-50': notification.type === 'error',
          'bg-yellow-50': notification.type === 'warning',
          'bg-blue-50': notification.type === 'info',
        },
      ]"
    >
      <!-- Icon -->
      <div class="flex-shrink-0 mt-0.5">
        <svg
          v-if="notification.type === 'success'"
          class="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else-if="notification.type === 'error'"
          class="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <svg
          v-else-if="notification.type === 'warning'"
          class="h-6 w-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium text-gray-900">
          {{ notification.message }}
        </p>
      </div>

      <!-- Close button -->
      <div class="ml-4 flex-shrink-0 flex">
        <button
          @click="$emit('remove', notification.id)"
          class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span class="sr-only">Close</span>
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  notifications: {
    type: Array,
    required: true,
    default: () => []
  }
});

defineEmits(['remove']);
</script>

<style scoped>
/* Notification animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-active {
  position: absolute;
  right: 0;
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
