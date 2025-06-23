<template>
  <div class="main-bg">
    <nav class="global-nav">
      <div class="nav-inner">
        <NuxtLink to="/" class="nav-logo">{{ siteName }}</NuxtLink>
        <div class="nav-links">
          <template v-if="user">
            <NuxtLink to="/user/center" class="nav-link">用户中心</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/user/login" class="nav-link">登录/注册</NuxtLink>
          </template>
        </div>
      </div>
    </nav>
    <div class="main-content">
      <!-- 顶部横幅 -->
      <header class="hero">
        <div class="hero-inner">
          <div class="hero-title">937bbAPI</div>
          <div class="hero-slogan">最全、最易用的免费API接口导航站</div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span>{{ apiCount }}</span> 个API
            </div>
            <div class="hero-stat">
              <span>{{ totalRequestCount }}</span> 次调用
            </div>
          </div>
        </div>
      </header>
      <!-- 搜索区 -->
      <div class="search-bar">
        <input
          v-model="searchText"
          @input="onSearch"
          type="text"
          class="search-input"
          placeholder="🔍 输入关键词搜索API..."
        />
      </div>
      <!-- 分组Tab -->
      <nav class="group-tabs" v-if="groupNames.length > 0">
        <div
          :class="['group-tab', { active: activeGroup === '' }]"
          @click="activeGroup = ''"
        >
          全部
        </div>
        <div
          v-for="g in groupNames"
          :key="g.id"
          :class="['group-tab', { active: g.id === activeGroup }]"
          @click="activeGroup = g.id"
        >
          {{ g.title }}
        </div>
      </nav>
      <!-- API卡片区 -->
      <div class="api-list">
        <div
          v-for="api in filteredApis"
          :key="api.id"
          class="api-card"
          @click="goDetail(api.id)"
        >
          <div class="api-card-title">
            <span
              class="api-card-method"
              :class="api.method && api.method.toLowerCase()"
              >{{ api.method }}</span
            >
            {{ api.title }}
          </div>
          <div class="api-card-summary">{{ api.summary }}</div>
          <div class="api-card-meta">
            <span class="api-card-group">{{ getGroupTitle(api.groupId) }}</span>
            <span class="api-card-count">{{ api.requestCount }} 次调用</span>
          </div>
        </div>
        <div v-if="filteredApis.length === 0" class="api-empty">
          暂无符合条件的API
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-text">
          &copy; 2025 937bbAPI |
          <a href="mailto:hi@vvhan.com" class="footer-link">hi@vvhan.com</a>
          <span class="footer-link">
            <a href="https://beian.miit.gov.cn/" target="_blank"
              >粤ICP备2023000000号</a
            >
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getApiList, getGroupList } from "~/utils/api/index.js";

const router = useRouter();
const goDetail = (id) => {
  router.push(`/api/${id}`);
};

const searchText = ref("");
const apis = ref([]);
const groups = ref([]);

async function fetchApis() {
  try {
    const res = await getApiList();
    apis.value = Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    apis.value = [];
  }
}
async function fetchGroups() {
  try {
    const res = await getGroupList();
    groups.value = Array.isArray(res.data) ? res.data : [];
  } catch {
    groups.value = [];
  }
}
const user = ref(null);
onMounted(() => {
  fetchApis();
  fetchGroups();
  const u = localStorage.getItem("user");
  if (u) user.value = JSON.parse(u);
});

const apiCount = computed(() => apis.value.length);
const totalRequestCount = computed(() =>
  apis.value.reduce((acc, api) => acc + api.requestCount, 0)
);
const groupNames = computed(() => groups.value);
const activeGroup = ref("");
const filteredApis = computed(() => {
  let list = apis.value;
  if (activeGroup.value)
    list = list.filter((a) => a.groupId === activeGroup.value);
  if (searchText.value.trim()) {
    const kw = searchText.value.trim().toLowerCase();
    list = list.filter(
      (api) =>
        api.title.toLowerCase().includes(kw) ||
        api.summary.toLowerCase().includes(kw) ||
        (api.description && api.description.toLowerCase().includes(kw)) ||
        (api.group && api.group.toLowerCase().includes(kw))
    );
  }
  return list;
});
const getGroupTitle = (id) => {
  const g = groups.value.find((g) => g.id === id);
  return g ? g.title : "";
};
const onSearch = () => {};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
.main-bg {
  background: linear-gradient(180deg, #f8fafc 0%, #eaf6ff 100%);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.hero {
  width: 100%;
  background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
  padding: 48px 0 32px 0;
  color: #fff;
  box-shadow: 0 4px 24px 0 rgba(56, 189, 248, 0.08);
}
.hero-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.hero-title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 2px;
}
.hero-slogan {
  font-size: 1.25rem;
  opacity: 0.92;
  margin-bottom: 8px;
}
.hero-stats {
  display: flex;
  gap: 32px;
  font-size: 1.1rem;
}
.hero-stat span {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 6px;
}
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -28px;
  margin-bottom: 32px;
}
.search-input {
  width: 100%;
  max-width: 420px;
  padding: 16px 24px;
  border-radius: 14px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.13rem;
  background: #fff;
  color: #222;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
}
.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #c7d2fe;
}
.group-tabs {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.group-tab {
  padding: 8px 22px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #6366f1;
  font-weight: 600;
  font-size: 1.08rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border: 1.5px solid transparent;
}
.group-tab.active,
.group-tab:hover {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}
.api-list {
  max-width: 1100px;
  margin: 0 auto 48px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px 28px;
}
.api-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 rgba(56, 189, 248, 0.07);
  border: 1.5px solid #e0e7ef;
  padding: 28px 24px 18px 24px;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s, transform 0.18s;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.api-card:hover {
  box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.13);
  border-color: #6366f1;
  transform: translateY(-4px) scale(1.025);
}
.api-card-title {
  font-size: 1.18rem;
  font-weight: bold;
  color: #22223b;
  display: flex;
  align-items: center;
  gap: 10px;
}
.api-card-method {
  display: inline-block;
  padding: 2px 14px;
  border-radius: 999px;
  font-size: 0.98rem;
  font-weight: 700;
  background: #e0f2fe;
  color: #0284c7;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 8px;
}
.api-card-method.get {
  background: #dcfce7;
  color: #16a34a;
}
.api-card-method.post {
  background: #fee2e2;
  color: #b91c1c;
}
.api-card-method.put {
  background: #fef9c3;
  color: #b45309;
}
.api-card-method.delete {
  background: #fee2e2;
  color: #b91c1c;
}
.api-card-summary {
  color: #6b7280;
  font-size: 1.05rem;
  min-height: 32px;
}
.api-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.98rem;
  color: #8b949e;
}
.api-card-group {
  margin-right: 10px;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 2px 10px;
  color: #6366f1;
  font-size: 0.98rem;
}
.api-card-count {
  color: #0284c7;
}
.api-empty {
  grid-column: 1/-1;
  text-align: center;
  color: #bbb;
  font-size: 1.1rem;
  padding: 32px 0;
}
.footer {
  width: 100%;
  background: #f8fafc;
  border-top: 1.5px solid #e0e7ef;
  padding: 32px 0 18px 0;
  margin-top: 32px;
  flex-shrink: 0;
  position: fixed;
  bottom: 0;
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.footer-text {
  color: #8b949e;
  font-size: 15px;
  text-align: center;
}
.footer-link {
  color: #0284c7;
  text-decoration: underline;
  margin-left: 8px;
}
@media (max-width: 1200px) {
  .api-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .hero-inner {
    max-width: 98vw;
  }
  .api-list {
    grid-template-columns: 1fr;
    gap: 18px 0;
  }
  .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 700px) {
  .hero {
    padding: 32px 0 18px 0;
  }
  .hero-title {
    font-size: 1.3rem;
  }
  .hero-slogan {
    font-size: 0.98rem;
  }
  .hero-stats {
    font-size: 0.98rem;
    gap: 12px;
  }
  .hero-stat span {
    font-size: 1.1rem;
  }
  .search-bar {
    margin-top: -18px;
    margin-bottom: 18px;
  }
  .search-input {
    font-size: 0.98rem;
    padding: 8px 10px;
    border-radius: 8px;
  }
  .group-tabs {
    gap: 8px;
    margin-bottom: 16px;
  }
  .group-tab {
    font-size: 0.98rem;
    padding: 6px 12px;
  }
  .api-list {
    grid-template-columns: 1fr;
    gap: 12px 0;
    padding-left: 2px;
    padding-right: 2px;
    /* width: 100vw; */
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
    box-sizing: border-box;
  }
  .api-card {
    width: 100%;
    box-sizing: border-box;
    padding-left: 8px;
    padding-right: 8px;
  }
  .api-card {
    padding: 14px 8px 10px 8px;
    border-radius: 10px;
  }
  .api-card-title {
    font-size: 1rem;
  }
  .api-card-summary {
    font-size: 0.95rem;
  }
  .api-card-meta {
    font-size: 0.92rem;
  }
  .footer {
    position: fixed;
    padding: 14px 0 8px 0;
    margin-top: 18px;
    bottom: 0;
  }
  .footer-inner {
    padding: 0 4px;
    gap: 4px;
  }
  .footer-text {
    font-size: 13px;
  }
}
</style>
