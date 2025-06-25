import { createApp, h, ref } from 'vue';
import NotificationContainer from '~/components/NotificationContainer.vue';

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

const notifications = ref([]);
let notificationId = 0;

function showNotification(message, type = NOTIFICATION_TYPES.INFO, options = {}) {
  const id = notificationId++;
  const notification = {
    id,
    message,
    type,
    timeout: options.timeout || 5000,
    show: true
  };

  notifications.value.push(notification);

  // Auto-remove notification after timeout
  if (notification.timeout > 0) {
    setTimeout(() => {
      removeNotification(id);
    }, notification.timeout);
  }

  return id;
}

function removeNotification(id) {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
}

// Create notification methods for each type
const notification = {
  success: (message, options) => showNotification(message, NOTIFICATION_TYPES.SUCCESS, options),
  error: (message, options) => showNotification(message, NOTIFICATION_TYPES.ERROR, options),
  warning: (message, options) => showNotification(message, NOTIFICATION_TYPES.WARNING, options),
  info: (message, options) => showNotification(message, NOTIFICATION_TYPES.INFO, options),
  remove: removeNotification,
  clear: () => { notifications.value = []; }
};

export default {
  install: (app) => {
    // Create a root element for notifications
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    document.body.appendChild(notificationContainer);

    // Mount the notification container
    const notificationApp = createApp({
      render: () => h(NotificationContainer, { notifications: notifications.value })
    });
    notificationApp.mount(notificationContainer);

    // Provide the notification methods to the app
    app.provide('notify', notification);
    app.config.globalProperties.$notify = notification;
  }
};

export { NOTIFICATION_TYPES };
