<template>
	<div class="min-h-screen flex flex-col bg-[#f8fafc]">
		<!-- 主要内容区域 -->
		<main class="flex-1 max-w-7xl mx-auto px-2 py-10 w-full">
			<NuxtPage />
		</main>

		<!-- 页脚 -->
		<footer class="footer">
			<div class="footer-inner">
				<div class="footer-text">
					&copy; 2025 937bbAPI |
					<span class="footer-link">
						<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2024128229号-1</a>
					</span>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const siteName = ref(import.meta.env.VITE_SITE_NAME || "WebAPI接口");
const icp = ref(import.meta.env.VITE_ICP || "");
const icpUrl = ref("https://beian.miit.gov.cn/");
const user = ref(null);
onMounted(() => {
	const u = localStorage.getItem("user");
	if (u) user.value = JSON.parse(u);
});
</script>

<style>
:root {
	--primary-color: #3b82f6;
	--primary-color-dark: #2563eb;
	--primary-color-light: #60a5fa;
	--background-color: #f8fafc;
	--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

body {
	background-color: var(--background-color);
	font-family: "Inter", system-ui, -apple-system, sans-serif;
	line-height: 1.5;
}

.modern-card {
	background: white;
	border-radius: 1rem;
	padding: 1.5rem;
	box-shadow: var(--card-shadow);
	transition: all 0.3s ease;
	border: 1px solid #e5e7eb;
}

.modern-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.status-badge {
	font-size: 0.75rem;
	font-weight: 500;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	display: inline-block;
}

.status-success {
	background-color: #dcfce7;
	color: #166534;
}

.status-danger {
	background-color: #fee2e2;
	color: #991b1b;
}

.primary-button {
	background-color: var(--primary-color);
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	font-weight: 500;
	transition: all 0.2s ease;
	border: none;
	cursor: pointer;
}

.primary-button:hover {
	background-color: var(--primary-color-dark);
	transform: translateY(-1px);
}

.input-field {
	background-color: white;
	border: 1px solid #e5e7eb;
	border-radius: 0.5rem;
	padding: 0.75rem 1rem;
	font-size: 0.875rem;
	transition: all 0.2s ease;
}

.input-field:focus {
	outline: none;
	border-color: var(--primary-color);
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.nuxt-link-exact-active {
	color: var(--primary-color);
	font-weight: 500;
}

.code-block {
	background-color: #f8fafc;
	border-radius: 0.5rem;
	padding: 1rem;
	font-family: "JetBrains Mono", monospace;
	overflow-x: auto;
}

.table {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 1rem;
}

.table th,
.table td {
	padding: 0.75rem;
	border-bottom: 1px solid #e5e7eb;
}

.table th {
	font-weight: 600;
	text-align: left;
}

.global-nav {
	width: 100%;
	background: none;
	/* border-bottom: 1.5px solid #e5e7eb; */
	box-shadow: 0 2px 8px 0 rgba(45, 140, 240, 0.04);
	position: fixed;
	top: 0;
	z-index: 100;
}
.nav-inner {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2vw;
	height: 60px;
}
.nav-logo {
	font-size: 1.25rem;
	font-weight: bold;
	color: #6366f1;
	text-decoration: none;
	letter-spacing: 1px;
}
.nav-links {
	display: flex;
	align-items: center;
	gap: 18px;
}
.nav-link {
	color: #fff;
	font-size: 1.07rem;
	font-weight: 500;
	text-decoration: none;
	padding: 6px 18px;
	border-radius: 8px;
	transition: background 0.2s, color 0.2s;
}
.nav-link:hover,
.nav-link.nuxt-link-exact-active {
	background: #e0e7ff;
	color: #3b82f6;
}
@media (max-width: 900px) {
	main {
		max-width: 100vw;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.max-w-7xl,
	.modern-card,
	.footer-inner {
		max-width: 98vw !important;
	}
	.code-block {
		padding: 0.5rem;
		font-size: 0.95rem;
	}
	.table th,
	.table td {
		padding: 0.5rem;
		font-size: 0.95rem;
	}
}
@media (max-width: 600px) {
	main {
		padding-left: 0.2rem;
		padding-right: 0.2rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.modern-card {
		padding: 0.7rem;
		border-radius: 0.6rem;
	}
	.footer-inner,
	.max-w-7xl {
		padding-left: 0.5rem !important;
		padding-right: 0.5rem !important;
	}
	.code-block {
		font-size: 0.9rem;
	}
	.table th,
	.table td {
		font-size: 0.9rem;
		padding: 0.3rem;
	}
	body {
		font-size: 15px;
	}
}
</style>
