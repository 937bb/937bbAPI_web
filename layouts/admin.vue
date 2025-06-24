<template>
	<div class="min-h-screen bg-gray-100">
		<!-- Sidebar -->
		<div
			class="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-blue-800 shadow-xl transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out z-30"
			:class="{ 'translate-x-0': mobileMenuOpen }"
		>
			<div class="flex items-center justify-center h-16 px-4 border-b border-blue-600">
				<h1 class="text-xl font-bold text-white">API 管理后台</h1>
			</div>
			<nav class="px-2 py-4">
				<NuxtLink
					to="/admin"
					class="flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors duration-200"
					:class="$route.path === '/admin' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-100 hover:bg-blue-600/50'"
				>
					<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
					控制台
				</NuxtLink>
				<NuxtLink
					to="/admin/api"
					class="flex items-center px-4 py-3 mt-1 text-sm font-medium rounded-lg mx-2 transition-colors duration-200"
					:class="$route.path.startsWith('/admin/api') ? 'bg-blue-600 text-white shadow-md' : 'text-blue-100 hover:bg-blue-600/50'"
				>
					<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
					API 管理
				</NuxtLink>
				<NuxtLink
					to="/admin/users"
					class="flex items-center px-4 py-3 mt-1 text-sm font-medium rounded-lg mx-2 transition-colors duration-200"
					:class="$route.path.startsWith('/admin/users') ? 'bg-blue-600 text-white shadow-md' : 'text-blue-100 hover:bg-blue-600/50'"
				>
					<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
					用户管理
				</NuxtLink>
			</nav>
		</div>

		<!-- Main Content -->
		<div class="md:pl-64 transition-all duration-300">
			<!-- Top Navigation -->
			<header class="bg-white shadow-sm sticky top-0 z-20">
				<div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
					<!-- Mobile menu button -->
					<button
						@click="mobileMenuOpen = !mobileMenuOpen"
						class="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
						aria-label="Toggle menu"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							<path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div class="flex-1 flex justify-between items-center">
						<h2 class="text-lg font-medium text-gray-900 hidden md:block">
							{{ pageTitle }}
						</h2>
						<div class="flex items-center space-x-4">
							<button class="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full">
								<span class="sr-only">通知</span>
								<div class="relative">
									<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
										/>
									</svg>
									<span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
								</div>
							</button>
							<div class="relative">
								<button
									@click="userMenuOpen = !userMenuOpen"
									class="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
								>
									<span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
										{{ userInitials }}
									</span>
									<span class="hidden md:inline-block">{{ user?.account || "管理员" }}</span>
									<svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								<transition
									enter-active-class="transition ease-out duration-100"
									enter-from-class="transform opacity-0 scale-95"
									enter-to-class="transform opacity-100 scale-100"
									leave-active-class="transition ease-in duration-75"
									leave-from-class="transform opacity-100 scale-100"
									leave-to-class="transform opacity-0 scale-95"
								>
									<div
										v-if="userMenuOpen"
										class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="user-menu"
									>
										<div class="py-1" role="none">
											<NuxtLink to="/user/center" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="userMenuOpen = false">
												个人中心
											</NuxtLink>
											<button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">退出登录</button>
										</div>
									</div>
								</transition>
							</div>
						</div>
					</div>
				</div>
			</header>

			<!-- Mobile menu -->
			<div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
				<div class="px-2 pt-2 pb-3 space-y-1">
					<NuxtLink
						to="/admin"
						@click="mobileMenuOpen = false"
						class="block px-3 py-2 rounded-md text-base font-medium"
						:class="$route.path === '/admin' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
					>
						控制台
					</NuxtLink>
					<NuxtLink
						to="/admin/api"
						@click="mobileMenuOpen = false"
						class="block px-3 py-2 rounded-md text-base font-medium"
						:class="$route.path.startsWith('/admin/api') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
					>
						API 管理
					</NuxtLink>
					<NuxtLink
						to="/admin/users"
						@click="mobileMenuOpen = false"
						class="block px-3 py-2 rounded-md text-base font-medium"
						:class="$route.path.startsWith('/admin/users') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
					>
						用户管理
					</NuxtLink>
				</div>
			</div>

			<!-- Page Content -->
			<main class="min-h-screen">
				<!-- Back to dashboard -->
				<div v-if="!$route.meta?.hideBreadcrumb" class="bg-white px-6 py-4 shadow-sm">
					<div class="max-w-7xl mx-auto">
						<div class="flex items-center">
							<NuxtLink to="/admin" class="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center">
								<svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								返回控制台
							</NuxtLink>
							<span class="mx-2 text-gray-400">/</span>
							<h1 class="text-lg font-medium text-gray-900">{{ $route.meta?.title || "Dashboard" }}</h1>
						</div>
					</div>
				</div>

				<!-- Main content area -->
				<div class="px-4 py-6 sm:px-6 lg:px-8">
					<slot></slot>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);

// 计算用户首字母
const userInitials = computed(() => {
	const name = route.meta?.user?.name || "管理员";
	return name.charAt(0).toUpperCase();
});

// 计算页面标题
const pageTitle = computed(() => {
	return route.meta?.title || "Dashboard";
});

// 处理登出
const handleLogout = () => {
	// 实现登出逻辑
	localStorage.removeItem("token");
	window.location.href = "/login";
};
</script>

<style scoped>
/* 添加任何需要的样式 */
</style>
