<template>
  <div class="api-card">
    <div class="api-card-header">
      <div class="api-title">{{ api.title }}</div>
      <span
        class="api-status-dot"
        :class="api.status === 'active' ? 'api-status-active' : 'api-status-inactive'"
      ></span>
    </div>
    <div class="api-summary">{{ api.summary }}</div>
    <div v-if="api.description" class="api-desc">{{ api.description }}</div>
    <div class="divider"></div>
    <div class="api-card-footer">
      <span class="api-reqcount">
        <span class="api-req-dot"></span>
        <span class="api-req-num">{{ api.requestCount }}</span><span class="api-req-w">w</span>
      </span>
      <span class="api-type">{{ api.type || 'RESTful API' }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ api: Object })
</script>

<style scoped>
.api-card {
  background: #fafdff;
  border-radius: 14px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
  padding: 18px 18px 14px 18px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s, background 0.18s;
  cursor: pointer;
}
.api-card:hover {
  box-shadow: 0 12px 32px 0 rgba(45,140,240,0.14), 0 2px 8px 0 rgba(54,209,196,0.10);
  border-color: #7dd3fc;
  background: #f4fbff;
  transform: translateY(-3px) scale(1.025);
}
.api-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.api-title {
  font-size: 16px;
  font-weight: 700;
  color: #222;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.api-status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.api-status-active { background: #22c55e; }
.api-status-inactive { background: #d1d5db; }
.api-summary {
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.api-desc {
  color: #8b949e;
  font-size: 12px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.divider {
  height: 1px;
  background: linear-gradient(90deg,#eaf6ff 0%,#fff 100%);
  margin: 8px 0 4px 0;
  border: none;
}
.api-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
  padding-top: 4px;
}
.api-reqcount {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.api-req-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  margin-right: 4px;
}
.api-req-num {
  color: #222;
  font-weight: bold;
}
.api-req-w {
  margin-left: 2px;
}
.api-type {
  color: #b0b7c3;
  font-weight: 500;
  letter-spacing: 0.5px;
}
@media (max-width: 700px) {
  .api-card { padding: 10px 8px 8px 8px; min-height: 80px; }
  .api-title { font-size: 14px; }
  .api-summary { font-size: 12px; margin-bottom: 1px; margin-top: 1px; }
  .api-desc { font-size: 11px; margin-bottom: 2px; }
}
</style>