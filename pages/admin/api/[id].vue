<template>
	<div>
		<div class="admin-section-title">API详情编辑</div>
		<div v-if="!apiData" class="admin-empty">未找到API数据</div>
		<form v-else class="api-detail-form" @submit.prevent="submitEdit">
			<div class="form-row">
				<label>标题</label>
				<input v-model="form.title" required maxlength="32" />
			</div>
			<div class="form-row">
				<label>接口地址</label>
				<input v-model="form.url" required maxlength="64" pattern="^/.*" placeholder="如 /api/xxx" />
			</div>
			<!-- 新增：完整API地址展示 -->
			<div class="form-row" v-if="form.url">
				<label>完整接口地址</label>
				<div class="full-api-url">
					<code>{{ apiBase + form.url }}</code>
				</div>
			</div>
			<div class="form-row">
				<label>请求方式</label>
				<select v-model="form.method" required>
					<option v-for="m in methodOptions" :key="m" :value="m">
						{{ m }}
					</option>
				</select>
			</div>
			<div class="form-row">
				<label>分组</label>
				<select v-model="form.groupId" required>
					<option v-for="g in groupOptions" :key="g.id" :value="g.id">{{ g.title }}</option>
				</select>
				<button type="button" class="edit-btn" style="margin-left: 10px" @click="showGroupModal = true">分组管理</button>
			</div>
			<div class="form-row">
				<label>摘要</label>
				<input v-model="form.summary" maxlength="64" placeholder="简要描述接口用途" />
			</div>
			<div class="form-row">
				<label>接口说明</label>
				<textarea v-model="form.description" maxlength="256" rows="4" placeholder="详细说明接口功能"></textarea>
			</div>
			<div class="form-row">
				<label>请求参数示例</label>
				<textarea v-model="form.requestExample" maxlength="512" rows="4" placeholder="如 {name: 张三}"></textarea>
			</div>
			<div class="form-row">
				<label>返回示例</label>
				<textarea v-model="form.responseExample" rows="4" placeholder="如 {code: 0, msg: ok}"></textarea>
			</div>
			<div class="form-row">
				<label>请求参数描述</label>
				<div v-for="(param, idx) in form.requestParams" :key="idx" class="param-block">
					<div class="param-block-row">
						<input v-model="param.name" placeholder="参数名" />
					</div>
					<div class="param-block-row">
						<select v-model="param.type">
							<option value="string">string</option>
							<option value="number">number</option>
							<option value="object">object</option>
							<option value="array">array</option>
							<option value="boolean">boolean</option>
							<option value="null">null</option>
						</select>
					</div>
					<div class="param-block-row">
						<select v-model="param.required">
							<option :value="true">必填</option>
							<option :value="false">可选</option>
						</select>
					</div>
					<div class="param-block-row">
						<input v-model="param.description" placeholder="描述" />
					</div>
					<div class="param-block-row">
						<button type="button" class="edit-btn delete" @click="form.requestParams.splice(idx, 1)">删除</button>
					</div>
					<hr class="param-block-divider" v-if="form.requestParams.length > 1 && idx < form.requestParams.length - 1" />
				</div>
				<button
					type="button"
					class="edit-btn"
					@click="
						form.requestParams.push({
							name: '',
							type: 'string',
							required: true,
							description: '',
						})
					"
				>
					+参数
				</button>
			</div>
			<div class="form-row">
				<label>返回数据描述</label>
				<div v-for="(field, idx) in form.responseStatus" :key="idx" class="param-block">
					<div class="param-block-row">
						<input v-model="field.name" placeholder="字段名，如 code/data/msg" />
					</div>
					<div class="param-block-row">
						<select v-model="field.type">
							<option value="string">string</option>
							<option value="number">number</option>
							<option value="object">object</option>
							<option value="array">array</option>
							<option value="boolean">boolean</option>
							<option value="null">null</option>
						</select>
					</div>
					<div class="param-block-row">
						<input v-model="field.meaning" placeholder="含义，如 状态码/数据体/提示信息" />
					</div>
					<div class="param-block-row">
						<input v-model="field.description" placeholder="说明（可选）" />
					</div>
					<div class="param-block-row">
						<button type="button" class="edit-btn delete" @click="form.responseStatus.splice(idx, 1)">删除</button>
					</div>
					<hr class="param-block-divider" v-if="form.responseStatus.length > 1 && idx < form.responseStatus.length - 1" />
				</div>
				<button type="button" class="edit-btn" @click="form.responseStatus.push({ name: '', type: '', meaning: '', description: '' })">+字段</button>
			</div>
			<div class="form-actions">
				<button type="submit" class="edit-btn">保存</button>
				<NuxtLink to="/admin/api" class="edit-btn cancel">返回列表</NuxtLink>
			</div>
		</form>

		<!-- 分组管理弹窗 -->
		<div v-if="showGroupModal" class="modal-mask">
			<div class="modal-group">
				<div class="modal-title">分组管理</div>
				<div class="modal-group-list">
					<div v-for="g in groupOptions" :key="g" class="modal-group-item">
						<span>{{ g.title }}</span>
						<button class="edit-btn delete" @click="handleDeleteGroup(g)">删除</button>
					</div>
				</div>
				<div class="modal-group-add">
					<input v-model="newGroupName" placeholder="新分组名" maxlength="16" />
					<button class="edit-btn" @click="handleAddGroup">添加</button>
				</div>
				<div v-if="groupError" class="modal-error">{{ groupError }}</div>
				<div class="modal-actions">
					<button class="edit-btn cancel" @click="showGroupModal = false">关闭</button>
				</div>
			</div>
		</div>

		<MessageModal v-model="messageModal.show" :message="messageModal.text" :type="messageModal.type" />
	</div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import MessageModal from "~/components/MessageModal.vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalConfig } from "~/utils/globalConfig.js";
import {
	getApiDetail,
	updateApi,
	createApi,
	getGroupList,
	addGroup,
	deleteGroup,
} from "~/utils/api/index.js";
const { apiBase } = useGlobalConfig();
const route = useRoute();
const router = useRouter();
const methodOptions = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const groupOptions = ref([]); // 分组选项，动态获取
const showGroupModal = ref(false); // 分组管理弹窗
const newGroupName = ref(""); // 新分组名
const groupError = ref(""); // 分组操作错误提示
const apiId = route.params.id;
const isNew = apiId === "new"; // 新增模式判断
const apiData = ref(null);
const form = reactive({
	id: "",
	title: "",
	url: "",
	method: "GET",
	group: "",
	groupId: "",
	summary: "",
	description: "",
	requestExample: "",
	responseExample: "",
	requestParams: [],
	responseStatus: [], // 返回数据描述，结构化字段注释
});
const messageModal = ref({ show: false, text: "", type: "info" });

function showMessage(text, type = "info", duration = 2000) {
	messageModal.value = { show: false, text: "", type };
	setTimeout(() => {
		messageModal.value = { show: true, text, type };
		setTimeout(() => {
			messageModal.value.show = false;
		}, duration);
	}, 10);
}

// 获取分组列表
async function fetchGroups() {
	const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
	const token = user?.token || "";
	try {
		const res = await getGroupList(token);
		if (res.code === 200 && Array.isArray(res.data)) {
			groupOptions.value = res.data;
		} else {
			groupOptions.value = [];
		}
	} catch {
		groupOptions.value = [];
	}
}

// 新增分组
async function handleAddGroup() {
	groupError.value = "";
	const name = newGroupName.value.trim();
	if (!name) {
		groupError.value = "分组名不能为空";
		return;
	}
	const description = "";
	const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
	const token = user?.token || "";
	try {
		const res = await addGroup(name, description, token);
		if (res.code === 200) {
			newGroupName.value = "";
			await fetchGroups();
		} else {
			groupError.value = res.msg || "添加失败";
		}
	} catch (e) {
		groupError.value = e.message || "添加失败";
	}
}

// 删除分组
async function handleDeleteGroup(name) {
	groupError.value = "";
	if (!confirm(`确定删除分组“${name}”？`)) return;
	const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
	const token = user?.token || "";
	try {
		// 需后端支持按 name 或 id 删除，这里假设 name
		const res = await deleteGroup(name, token);
		if (res.code === 200) {
			await fetchGroups();
		} else {
			groupError.value = res.msg || "删除失败";
		}
	} catch (e) {
		groupError.value = e.message || "删除失败";
	}
}

// 获取API详情
async function fetchDetail() {
	const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
	const token = user?.token || "";
	try {
		const res = await getApiDetail(apiId, token);
		if (res.code === 200 && res.data) {
			apiData.value = res.data;
			Object.assign(form, {
				...res.data,
				requestParams: Array.isArray(res.data.requestParams) ? JSON.parse(JSON.stringify(res.data.requestParams)) : [],
				responseStatus: Array.isArray(res.data.responseStatus) ? JSON.parse(JSON.stringify(res.data.responseStatus)) : [],
			});
		} else {
			apiData.value = null;
		}
	} catch {
		apiData.value = null;
	}
}

// 页面加载时获取分组和详情
fetchGroups();
if (!isNew) fetchDetail(); // 仅编辑时请求详情
else apiData.value = {}; // 新增时直接展示表单

async function submitEdit() {
	if (!form.title.trim() || !form.url.trim() || !form.method || !form.groupId) {
		showMessage("请填写完整信息", "warn");
		return;
	}
	if (!/^\/.+/.test(form.url)) {
		showMessage("路径需以 / 开头", "warn");
		return;
	}
	for (const p of form.requestParams) {
		if (!p.name.trim()) {
			showMessage("参数名不能为空", "warn");
			return;
		}
	}
	for (const f of form.responseStatus) {
		if (!f.name || !f.type || !f.meaning) {
			showMessage("返回数据字段名、类型、含义不能为空", "warn");
			return;
		}
	}
	const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
	const token = user?.token || "";
	try {
		let res;
		if (isNew) {
			// 新增API
			res = await createApi(
				{
					...form,
					responseStatus: form.responseStatus,
				},
				token
			);
		} else {
			// 编辑API
			res = await updateApi(
				{
					...form,
					responseStatus: form.responseStatus,
				},
				token
			);
		}
		if (res.code !== 200) {
			showMessage(res.msg || "保存失败", "error");
			return;
		}
		showMessage(isNew ? "新增成功" : "保存成功", "success");
		router.push("/admin/api");
	} catch (e) {
		showMessage(e.message || "保存失败", "error");
	}
}
</script>

<style scoped>
.admin-section-title {
	font-size: 1.15rem;
	font-weight: bold;
	color: #6366f1;
	margin-bottom: 18px;
}
.api-detail-form {
	width: 100%;
	margin: 0;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 18px 0 rgba(45, 140, 240, 0.07);
	padding: 32px 3vw 18px 3vw;
}
.form-row {
	display: flex;
	align-items: flex-start;
	gap: 18px;
	margin-bottom: 18px;
}
.form-row label {
	width: 120px;
	font-size: 1.05rem;
	color: #555;
	font-weight: 600;
	padding-top: 7px;
}
.form-row input,
.form-row select,
.form-row textarea {
	flex: 1;
	padding: 8px 12px;
	border-radius: 7px;
	border: 1.5px solid #e0e7ef;
	font-size: 1.05rem;
	color: #6366f1;
	background: #f8fafc;
}
.form-row textarea {
	resize: vertical;
}
.form-actions {
	display: flex;
	gap: 18px;
	justify-content: flex-end;
	margin-top: 18px;
}
.edit-btn {
	background: #e0e7ff;
	color: #6366f1;
	border: none;
	border-radius: 8px;
	padding: 7px 22px;
	font-size: 1.05rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
}
.edit-btn:hover {
	background: #6366f1;
	color: #fff;
}
.edit-btn.cancel {
	background: #f1f5f9;
	color: #bbb;
}
.edit-btn.delete {
	background: #fee2e2;
	color: #ef4444;
}
.edit-btn.delete:hover {
	background: #ef4444;
	color: #fff;
}
.modal-error {
	color: #ef4444;
	font-size: 0.98rem;
	margin-top: 8px;
	text-align: right;
}
.param-block {
	background: #f8fafc;
	border-radius: 7px;
	padding: 14px 14px 8px 14px;
	margin-bottom: 14px;
	box-shadow: 0 1.5px 8px 0 rgba(45, 140, 240, 0.04);
}
.param-block-row {
	margin-bottom: 8px;
}
.param-block-row:last-child {
	margin-bottom: 0;
}
.param-block input,
.param-block select {
	width: 100%;
	margin-bottom: 0;
}
.param-block-divider {
	border: none;
	border-top: 1px dashed #e0e7ef;
	margin: 10px 0 0 0;
}
.modal-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.18);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal-group {
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 4px 32px 0 rgba(45, 140, 240, 0.13);
	padding: 32px 28px 18px 28px;
	min-width: 320px;
	max-width: 90vw;
}
.modal-title {
	font-size: 1.12rem;
	font-weight: bold;
	color: #6366f1;
	margin-bottom: 18px;
}
.modal-group-list {
	margin-bottom: 18px;
}
.modal-group-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 7px 0;
	border-bottom: 1px dashed #e0e7ef;
}
.modal-group-add {
	display: flex;
	gap: 10px;
	margin-bottom: 12px;
}
.modal-group-add input {
	flex: 1;
	padding: 7px 10px;
	border-radius: 7px;
	border: 1.5px solid #e0e7ef;
	font-size: 1rem;
}
.modal-actions {
	text-align: right;
}
@media (max-width: 700px) {
	.param-row {
		flex-direction: column;
		align-items: stretch;
		gap: 8px;
	}
	.param-row input,
	.param-row select {
		width: 100% !important;
	}
}
</style>
