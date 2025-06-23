<template>
  <div v-if="visible" class="message-modal-mask">
    <div class="message-modal-content" :class="type">
      <span class="message-modal-text">{{ message }}</span>
      <button class="message-modal-close" @click="close">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onUnmounted } from 'vue'
const props = defineProps({
  modelValue: Boolean,
  message: String,
  type: { type: String, default: 'info' }, // info/success/error/warn
  duration: { type: Number, default: 2000 }
})
const emit = defineEmits(['update:modelValue'])
const visible = ref(props.modelValue)
let timer = null
watch(() => props.modelValue, v => {
  visible.value = v
  if (v && props.duration > 0) {
    clearTimeout(timer)
    timer = setTimeout(() => close(), props.duration)
  }
})
function close() {
  visible.value = false
  emit('update:modelValue', false)
}
onUnmounted(() => { clearTimeout(timer) })
</script>

<style scoped>
.message-modal-mask {
  position: fixed; left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.08); z-index: 2000;
  display: flex; align-items: flex-start; justify-content: center;
}
.message-modal-content {
  margin-top: 80px; min-width: 220px; max-width: 90vw;
  background: #fff; border-radius: 8px; box-shadow: 0 2px 18px 0 rgba(45,140,240,0.13);
  padding: 18px 32px 18px 24px; display: flex; align-items: center; gap: 18px;
  font-size: 1.08rem; color: #6366f1; position: relative;
}
.message-modal-content.success { color: #16a34a; border-left: 5px solid #16a34a; }
.message-modal-content.error { color: #ef4444; border-left: 5px solid #ef4444; }
.message-modal-content.warn { color: #f59e42; border-left: 5px solid #f59e42; }
.message-modal-content.info { color: #6366f1; border-left: 5px solid #6366f1; }
.message-modal-close {
  background: none; border: none; color: #bbb; font-size: 1.3rem; cursor: pointer; position: absolute; right: 12px; top: 8px;
}
.message-modal-close:hover { color: #ef4444; }
</style>
