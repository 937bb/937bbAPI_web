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
  GET_TODAY_STATS: "/api/web/getTodayStatistics",
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
    headers: { 
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '' 
    }
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

/**
 * 写入完整的API数据（覆盖式更新）
 * @param {Object} data - 完整的API数据对象
 * @param {string} token - 认证token
 * @returns {Promise} 返回Promise对象
 */
export function writeApi(data, token) {
	if (!data || typeof data !== 'object') {
		throw new Error('Invalid API data');
	}
	return $apiFetch(API.WRITE_API, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '' 
		},
		body: JSON.stringify(data)
	});
}

/**
 * 删除API
 * @param {string|number} id - API ID
 * @param {string} token - 认证token
 * @returns {Promise} 返回Promise对象
 */
export function deleteApi(id, token) {
	if (!id) {
		throw new Error('API ID is required');
	}
	return $apiFetch(API.DELETE_API, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '' 
		},
		body: JSON.stringify({ id })
	});
}

/**
 * 获取分组列表
 * @param {string} token - 认证token
 * @returns {Promise<Array>} 返回分组列表的Promise
 */
export function getGroupList(token) {
  return $apiFetch(API.GET_GROUP_LIST, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '' 
    }
  });
}

/**
 * 删除分组
 * @param {string|number} id - 分组ID
 * @param {string} token - 认证token
 * @returns {Promise} 返回Promise对象
 */
export function deleteGroup(id, token) {
	if (!id) {
		throw new Error('Group ID is required');
	}
	return $apiFetch(API.DELETE_GROUP, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '' 
		},
		body: JSON.stringify({ id })
	});
}

/**
 * 新增分组
 * @param {string} title - 分组标题
 * @param {string} [description=''] - 分组描述
 * @param {string} token - 认证token
 * @returns {Promise} 返回Promise对象
 */
export function addGroup(title, description = '', token) {
	if (!title) {
		throw new Error('Group title is required');
	}
	return $apiFetch(API.ADD_GROUP, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '' 
		},
		body: JSON.stringify({ title, description })
	});
}

/**
 * 新增API（兼容命名，实际调用addApi）
 * @param {Object} data - API数据对象
 * @param {string} token - 认证token
 * @returns {Promise} 返回Promise对象
 */
export function createApi(data, token) {
	return addApi(data, token);
}

/**
 * 搜索API
 * @param {Object} params - 搜索参数
 * @param {string} [params.keyword] - 搜索关键词
 * @param {string|number} [params.groupId] - 分组ID
 * @param {string} [params.method] - 请求方法
 * @param {string} [params.status] - API状态
 * @param {string} token - 认证token
 * @returns {Promise<Array>} 返回API列表的Promise
 */
export function searchApis(params = {}, token) {
	const query = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== '') {
			query.append(key, value);
		}
	});

	return $apiFetch(`/api/web/searchApis?${query.toString()}`, {
		method: 'GET',
		headers: { 
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '' 
		}
	});
}

/**
 * 获取API统计数据
 * @param {string} token - 认证token
 * @returns {Promise<Object>} 返回统计数据的Promise
 */
export function getApiStats(token) {
	return $apiFetch('/api/web/getApiStats', {
		method: 'GET',
		headers: { 
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '' 
		}
	});
}

/**
 * 导出API文档
 * @param {string} format - 导出格式（json/markdown/html）
 * @param {string} token - 认证token
 * @returns {Promise<Blob>} 返回文件Blob的Promise
 */
export function exportApis(format = 'json', token) {
  return $apiFetch(`${API.EXPORT_APIS}?format=${format}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    responseType: 'blob' // 确保正确处理二进制响应
  });
}

/**
 * 获取今日统计信息
 * @param {string} token - 认证token
 * @returns {Promise<Object>} 返回今日统计数据的Promise
 */
export function getTodayStatistics(token) {
  return $apiFetch(API.GET_TODAY_STATS, {
    method: 'GET',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  });
}

// 其他接口可继续补充...
