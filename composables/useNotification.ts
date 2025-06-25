import { inject } from 'vue';

export default function useNotification() {
  const notify = inject('notify');
  
  if (!notify) {
    throw new Error('Notification plugin not found. Make sure it is properly installed.');
  }
  
  return notify;
}
