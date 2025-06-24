<template>
	<div class="container mx-auto px-4 py-8">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-bold text-gray-900">API 分组管理</h1>
			<button @click="showCreateModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">新建分组</button>
		</div>

		<!-- Group List -->
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
			<ul class="divide-y divide-gray-200">
				<li v-for="group in groups" :key="group.id" class="px-6 py-4">
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-lg font-medium text-gray-900">{{ group.title }}</h3>
							<p class="text-sm text-gray-500 mt-1">{{ group.description || "暂无描述" }}</p>
							<div class="mt-2 flex space-x-2">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
									{{ group.apiCount || 0 }} 个API
								</span>
							</div>
						</div>
						<div class="flex space-x-2">
							<button @click="editGroup(group)" class="text-blue-600 hover:text-blue-900">编辑</button>
							<button @click="confirmDelete(group)" class="text-red-600 hover:text-red-900">删除</button>
						</div>
					</div>
				</li>
			</ul>

			<!-- Empty State -->
			<div v-if="!loading && groups.length === 0" class="text-center py-12">
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
				</svg>
				<h3 class="mt-2 text-sm font-medium text-gray-900">暂无分组</h3>
				<p class="mt-1 text-sm text-gray-500">开始创建您的第一个API分组</p>
				<div class="mt-6">
					<button
						@click="showCreateModal = true"
						class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
						新建分组
					</button>
				</div>
			</div>

			<!-- Loading State -->
			<div v-if="loading" class="flex justify-center py-12">
				<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		</div>

		<!-- Create/Edit Group Modal -->
		<div v-if="showCreateModal || editingGroup" class="fixed z-10 inset-0 overflow-y-auto">
			<div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>

				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div
					class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
				>
					<div>
						<div class="mt-3 text-center sm:mt-5">
							<h3 class="text-lg leading-6 font-medium text-gray-900">
								{{ editingGroup ? "编辑分组" : "新建分组" }}
							</h3>
							<div class="mt-4">
								<div class="space-y-4">
									<div>
										<label for="group-title" class="block text-sm font-medium text-gray-700 text-left">分组名称</label>
										<input
											type="text"
											id="group-title"
											v-model="groupForm.title"
											class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											placeholder="输入分组名称"
										/>
									</div>
									<div>
										<label for="group-description" class="block text-sm font-medium text-gray-700 text-left">分组描述</label>
										<textarea
											id="group-description"
											v-model="groupForm.description"
											rows="3"
											class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											placeholder="输入分组描述（可选）"
										></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
						<button
							type="button"
							@click="saveGroup"
							:disabled="!groupForm.title"
							:class="[
								'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm',
								{ 'opacity-50 cursor-not-allowed': !groupForm.title },
							]"
						>
							保存
						</button>
						<button
							type="button"
							@click="cancelEdit"
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
						>
							取消
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Delete Confirmation Modal -->
		<div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
			<div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>

				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div
					class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
				>
					<div class="sm:flex sm:items-start">
						<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
							<ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-gray-900">删除分组</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">确定要删除分组 "{{ groupToDelete?.title }}" 吗？此操作无法撤销。</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							@click="handleDeleteGroup"
							class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							删除
						</button>
						<button
							type="button"
							@click="showDeleteModal = false"
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
						>
							取消
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { getGroupList, addGroup, deleteGroup } from "~/utils/api";

const router = useRouter();
const loading = ref(true);
const groups = ref([]);
const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const editingGroup = ref(null);
const groupToDelete = ref(null);

const groupForm = ref({
	title: "",
	description: "",
});

// 加载分组列表
const loadGroups = async () => {
	try {
		loading.value = true;
		const response = await getGroupList();
		groups.value = response.data || [];
	} catch (error) {
		console.error("加载分组失败:", error);
		// 这里可以添加错误提示
	} finally {
		loading.value = false;
	}
};

// 编辑分组
const editGroup = (group) => {
	editingGroup.value = group;
	groupForm.value = {
		title: group.title,
		description: group.description || "",
	};
	showCreateModal.value = true;
};

// 保存分组
const saveGroup = async () => {
	if (!groupForm.value.title) return;

	try {
		if (editingGroup.value) {
			// 更新分组
			// await updateGroup({
			//   id: editingGroup.value.id,
			//   ...groupForm.value
			// });
		} else {
			// 新增分组
			await addGroup(groupForm.value);
		}

		// 重新加载分组列表
		await loadGroups();
		cancelEdit();
	} catch (error) {
		console.error("保存分组失败:", error);
		// 这里可以添加错误提示
	}
};

// 取消编辑
const cancelEdit = () => {
	editingGroup.value = null;
	groupForm.value = { title: "", description: "" };
	showCreateModal.value = false;
};

// 确认删除
const confirmDelete = (group) => {
	groupToDelete.value = group;
	showDeleteModal.value = true;
};

// 删除分组
const handleDeleteGroup = async () => {
	if (!groupToDelete.value) return;

	try {
		await deleteGroup(groupToDelete.value.id);
		await loadGroups();
		showDeleteModal.value = false;
		groupToDelete.value = null;
	} catch (error) {
		console.error("删除分组失败:", error);
		// 这里可以添加错误提示
	}
};

// 初始化加载
onMounted(() => {
	loadGroups();
});
</script>

<style scoped>
/* 添加自定义样式 */
</style>
