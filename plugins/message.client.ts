import { ref, reactive, readonly } from 'vue';
import MessageModal from '~/components/MessageModal.vue';

// 全局消息状态
const messageState = reactive({
  show: false,
  text: '',
  type: 'info',
  duration: 2000,
});
let timer: any = null;

function showMessage(text: string, type: string = 'info', duration: number = 2000) {
  messageState.show = false;
  messageState.text = '';
  messageState.type = type;
  messageState.duration = duration;
  if (timer) clearTimeout(timer);
  setTimeout(() => {
    messageState.show = true;
    messageState.text = text;
    messageState.type = type;
    timer = setTimeout(() => {
      messageState.show = false;
    }, duration);
  }, 10);
}

export default defineNuxtPlugin((nuxtApp) => {
  // 注入 useMessage composable
  nuxtApp.provide('message', {
    show: showMessage,
    state: readonly(messageState),
  });
  // 不再直接赋值 vueApp.config.globalProperties.$message，避免只读属性报错
});
