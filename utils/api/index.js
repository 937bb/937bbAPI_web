// api/index.js
// 统一管理所有后端接口地址和请求方法，便于维护和替换

// 业务接口路径常量
export const API = {
	SEND_EMAIL_CODE: "/api/auth/sendEmailCode",
	REGISTER: "/api/auth/register",
	LOGIN: "/api/auth/login",
	GET_USER_LIST: "/api/web/getUserList",
	GET_USER_DETAIL: "/api/web/getUserDetailById",
	UPDATE_USER: "/api/web/updateUserById",
	GET_API_LIST: "/api/web/getApiList",
	GET_API_DETAIL: "/api/web/getApiDetailById",
	UPDATE_API: "/api/web/updateApiById",
	ADD_API: "/api/web/addApi",
	WRITE_API: "/api/web/writeApi",
	DELETE_API: "/api/web/deleteApiById",
	GET_GROUP_LIST: "/api/web/getGroupList",
	DELETE_GROUP: "/api/web/deleteGroupById",
	ADD_GROUP: "/api/web/addGroup",
	// ...可继续扩展
};

// 业务接口请求封装
import { $apiFetch } from "~/utils/apiFetch.js";

export function sendEmailCode(email) {
	return $apiFetch(API.SEND_EMAIL_CODE, {
		method: "POST",
		body: { email },
	});
}

export function register({ account, passwd, email, emailCode }) {
	return $apiFetch(API.REGISTER, {
		method: "POST",
		body: { account, passwd, email, emailCode },
	});
}

export function login({ account, passwd }) {
	return $apiFetch(API.LOGIN, {
		method: "POST",
		body: { account, passwd },
	});
}

// 获取用户列表（需带 token）
export function getUserList(token) {
	return $apiFetch(API.GET_USER_LIST, {
		method: "GET",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
	});
}

// 获取用户详情（需带 token，传参 userId）
export function getUserDetail(userId, token) {
	return $apiFetch(API.GET_USER_DETAIL + `?userId=${encodeURIComponent(userId)}`, {
		method: "GET",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
	});
}

// 修改用户信息（需带 token，post，body 见 updateUserDto）
export function updateUser(data, token) {
	return $apiFetch(API.UPDATE_USER, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: data,
	});
}

// 获取API列表（需带token）
export function getApiList(token) {
	return $apiFetch(API.GET_API_LIST, {
		method: "GET",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
	});
}
// 获取API详情（需带token，传参id）
export function getApiDetail(id, token) {
	return $apiFetch(API.GET_API_DETAIL + `?id=${encodeURIComponent(id)}`, {
		method: "GET",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
	});
}
// 修改API（需带token，post，body见updateApiDto）
export function updateApi(data, token) {
	return $apiFetch(API.UPDATE_API, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: data,
	});
}
// 新增API（需带token，post，body见addApiDto）
export function addApi(data, token) {
	return $apiFetch(API.ADD_API, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: data,
	});
}

// 写入API（需带token，post，body为完整API对象）
export function writeApi(data, token) {
	return $apiFetch(API.WRITE_API, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: data,
	});
}

// 删除API（需带token，post，body: {id}）
export function deleteApi(id, token) {
	return $apiFetch(API.DELETE_API, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: { id },
	});
}

// 获取分组列表（需带token）
export function getGroupList(token) {
	return $apiFetch(API.GET_GROUP_LIST, {
		method: "GET",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
	});
}
// 删除分组（需带token，post，body: {id}）
export function deleteGroup(id, token) {
	return $apiFetch(API.DELETE_GROUP, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: { id },
	});
}
// 新增分组（需带token，post，body: {name}）
export function addGroup(title, description, token) {
	return $apiFetch(API.ADD_GROUP, {
		method: "POST",
		headers: { Authorization: token ? `Bearer ${token}` : "" },
		body: { title, description },
	});
}

// 新增API（兼容命名 createApi，实际调用 addApi）
export function createApi(data, token) {
  return addApi(data, token);
}

// 其他接口可继续补充...
