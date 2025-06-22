<template>
	<div class="main-bg">
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
				<input v-model="searchText" @input="onSearch" type="text" class="search-input" placeholder="🔍 输入关键词搜索API..." />
			</div>
			<!-- 分组Tab -->
			<nav class="group-tabs" v-if="groupNames.length > 1">
				<div v-for="(name, idx) in groupNames" :key="name" :class="['group-tab', { active: name === activeGroup }]" @click="activeGroup = name">
					{{ name }}
				</div>
			</nav>
			<!-- API卡片区 -->
			<div class="api-list">
				<div v-for="api in filteredApis" :key="api.id" class="api-card" @click="goDetail(api.id)">
					<div class="api-card-title">
						<span class="api-card-method" :class="api.method && api.method.toLowerCase()">{{ api.method }}</span>
						{{ api.title }}
					</div>
					<div class="api-card-summary">{{ api.summary }}</div>
					<div class="api-card-meta">
						<span class="api-card-group">{{ api.group }}</span>
						<span class="api-card-count">{{ api.requestCount }} 次调用</span>
					</div>
				</div>
				<div v-if="filteredApis.length === 0" class="api-empty">暂无符合条件的API</div>
			</div>
		</div>
		<!-- 页脚 -->
		<footer class="footer">
			<div class="footer-inner">
				<div class="footer-text">
					&copy; 2025 937bbAPI | <a href="mailto:hi@vvhan.com" class="footer-link">hi@vvhan.com</a>
					<span class="footer-link">
						<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023000000号</a>
					</span>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { $apiFetch } from "~/utils/apiFetch.js";

const router = useRouter();
const goDetail = (id) => {
	router.push(`/api/${id}`);
};

const searchText = ref("");
const apis = ref([]);
async function fetchApis() {
	// TODO: 替换为真实接口
	// const res = await $apiFetch('/api/apis')
	// apis.value = res.data
	apis.value = [
		{
			id: "1",
			title: "二维码生成API",
			summary: "快速生成二维码图片",
			url: "/api/qr",
			method: "GET",
			createTime: "2025-06-20",
			requestCount: 1234,
			group: "工具类",
			status: "active",
		},
		{
			id: "2",
			title: "每日一言API",
			summary: "获取每日一句有趣的话",
			url: "/api/yy",
			method: "GET",
			createTime: "2025-06-18",
			requestCount: 888,
			group: "娱乐类",
			status: "active",
		},
		{
			id: "3",
			title: "天气查询API",
			summary: "获取实时天气信息",
			url: "/api/weather",
			method: "GET",
			createTime: "2025-06-15",
			requestCount: 1560,
			group: "工具类",
			status: "active",
		},
		{
			id: "4",
			title: "星座运势API",
			summary: "查询今日星座运势",
			url: "/api/astro",
			method: "GET",
			createTime: "2025-06-10",
			requestCount: 900,
			group: "娱乐类",
			status: "active",
		},
		{
			id: "5",
			title: "短网址生成API",
			summary: "将长链接转为短网址",
			url: "/api/shorturl",
			method: "POST",
			createTime: "2025-06-12",
			requestCount: 700,
			group: "工具类",
			status: "active",
		},
		{
			id: "6",
			title: "随机头像API",
			summary: "获取随机头像图片",
			url: "/api/avatar",
			method: "GET",
			createTime: "2025-06-11",
			requestCount: 1200,
			group: "图片类",
			status: "active",
		},
		{
			id: "7",
			title: "笑话API",
			summary: "获取随机笑话",
			url: "/api/joke",
			method: "GET",
			createTime: "2025-06-09",
			requestCount: 1100,
			group: "娱乐类",
			status: "active",
		},
		{
			id: "8",
			title: "翻译API",
			summary: "中英互译",
			url: "/api/translate",
			method: "POST",
			createTime: "2025-06-08",
			requestCount: 800,
			group: "工具类",
			status: "active",
		},
		{
			id: "9",
			title: "图片鉴黄API",
			summary: "检测图片内容安全",
			url: "/api/nsfw",
			method: "POST",
			createTime: "2025-06-07",
			requestCount: 600,
			group: "图片类",
			status: "active",
		},
		{
			id: "10",
			title: "表情包API",
			summary: "获取热门表情包",
			url: "/api/emotion",
			method: "GET",
			createTime: "2025-06-06",
			requestCount: 950,
			group: "图片类",
			status: "active",
		},
		{
			id: "11",
			title: "成语接龙API",
			summary: "玩成语接龙游戏",
			url: "/api/idiom",
			method: "GET",
			createTime: "2025-06-05",
			requestCount: 500,
			group: "娱乐类",
			status: "active",
		},
		{
			id: "12",
			title: "手机号归属地API",
			summary: "查询手机号归属地",
			url: "/api/phone",
			method: "GET",
			createTime: "2025-06-04",
			requestCount: 400,
			group: "工具类",
			status: "active",
		},
		{
			id: "13",
			title: "随机壁纸API",
			summary: "获取高清壁纸",
			url: "/api/wallpaper",
			method: "GET",
			createTime: "2025-06-03",
			requestCount: 1300,
			group: "图片类",
			status: "active",
		},
		{
			id: "14",
			title: "历史上的今天API",
			summary: "查询历史事件",
			url: "/api/history",
			method: "GET",
			createTime: "2025-06-02",
			requestCount: 300,
			group: "工具类",
			status: "active",
		},
		{
			id: "15",
			title: "诗词推荐API",
			summary: "获取古诗词推荐",
			url: "/api/poem",
			method: "GET",
			createTime: "2025-06-01",
			requestCount: 200,
			group: "娱乐类",
			status: "active",
		},
		{
			id: "16",
			title: "图片加水印API",
			summary: "为图片添加水印",
			url: "/api/watermark",
			method: "POST",
			createTime: "2025-05-30",
			requestCount: 350,
			group: "图片类",
			status: "active",
		},
		{
			id: "17",
			title: "身份证识别API",
			summary: "识别身份证信息",
			url: "/api/idcard",
			method: "POST",
			createTime: "2025-05-29",
			requestCount: 250,
			group: "工具类",
			status: "active",
		},
		{
			id: "18",
			title: "二维码识别API",
			summary: "识别二维码内容",
			url: "/api/qrscan",
			method: "POST",
			createTime: "2025-05-28",
			requestCount: 150,
			group: "工具类",
			status: "active",
		},
		{
			id: "19",
			title: "动漫头像API",
			summary: "获取动漫风格头像",
			url: "/api/animeavatar",
			method: "GET",
			createTime: "2025-05-27",
			requestCount: 100,
			group: "图片类",
			status: "active",
		},
		{
			id: "20",
			title: "随机名言API",
			summary: "获取一句名言",
			url: "/api/quote",
			method: "GET",
			createTime: "2025-05-26",
			requestCount: 50,
			group: "娱乐类",
			status: "active",
		},
	];
}
onMounted(() => {
	fetchApis();
});
const apiCount = computed(() => apis.value.length);
const totalRequestCount = computed(() => apis.value.reduce((acc, api) => acc + api.requestCount, 0));
const groupNames = computed(() => {
	const set = new Set(apis.value.map((a) => a.group));
	return Array.from(set);
});
const activeGroup = ref("");
onMounted(() => {
	fetchApis();
	activeGroup.value = groupNames.value[0] || "";
});
const filteredApis = computed(() => {
	let list = apis.value;
	if (activeGroup.value) list = list.filter((a) => a.group === activeGroup.value);
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
const onSearch = () => {};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}
*, *::before, *::after {
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
