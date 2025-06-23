<!--
 * @Descripttion: 
 * @version: 
 * @Author: 937bb
 * @Date: 2025-06-22 14:03:42
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-22 23:10:27
-->
<template>
  <div>
    <div class="admin-section-title">用户详情</div>
    <div v-if="!userData" class="admin-empty">未找到用户数据</div>
    <form v-else class="user-detail-form" @submit.prevent="submitEdit">
      <div class="form-row">
        <label>用户名</label>
        <input v-model="form.username" required maxlength="32" />
      </div>
      <div class="form-row">
        <label>昵称</label>
        <input v-model="form.nickname" maxlength="32" />
      </div>
      <div class="form-row">
        <label>邮箱</label>
        <input v-model="form.email" type="email" maxlength="64" />
      </div>
      <div class="form-row">
        <label>角色</label>
        <select v-model="form.role">
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
        </select>
      </div>
      <div class="form-row">
        <label>状态</label>
        <select v-model="form.status">
          <option value=0>正常</option>
          <option value=1>禁用</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="edit-btn">保存</button>
        <NuxtLink to="/admin/users" class="edit-btn cancel">返回列表</NuxtLink>
      </div>
    </form>
    <MessageModal v-model="messageModal.show" :message="messageModal.text" :type="messageModal.type" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import MessageModal from '~/components/MessageModal.vue'
import { useRoute, useRouter } from "vue-router";
import { getUserDetail, updateUser } from "~/utils/api/index.js";
const route = useRoute();
const router = useRouter();
// mock: 可用pinia/接口替换
const userData = ref(null);
const userId = route.params.id;
const token = (() => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  return user?.token || "";
})();

async function fetchDetail() {
  try {
    const res = await getUserDetail(userId, token);
    if (res.code === 200 && res.data.id) {
      userData.value = {
        id: res.data.id,
        username: res.data.account,
        nickname: res.data.account, // 后端无昵称字段，默认用账号
        email: res.data.email,
        role: res.data.isAdmin === 1 ? "admin" : "user",
        status: res.data.status,
      };
      Object.assign(form, { ...userData.value });
    } else {
      userData.value = null;
    }
  } catch (e) {
    userData.value = null;
  }
}
fetchDetail();

const form = reactive({
  id: "",
  username: "",
  nickname: "",
  email: "",
  role: "user",
  status: 0,
});
const messageModal = ref({ show: false, text: '', type: 'info' })
function showMessage(text, type = 'info', duration = 2000) {
  messageModal.value = { show: false, text: '', type }
  setTimeout(() => {
    messageModal.value = { show: true, text, type }
    setTimeout(() => { messageModal.value.show = false }, duration)
  }, 10)
}

async function submitEdit() {
  if (!form.username.trim()) {
    showMessage('用户名不能为空', 'warn'); return;
  }
  if (form.email && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    showMessage('邮箱格式不正确', 'warn'); return;
  }
  // 组装后端需要的参数
  const data = {
    userId: form.id,
    account: form.username,
    email: form.email,
    isAdmin: form.role === "admin" ? 1 : 0,
    status: Number(form.status),
  };
  try {
    const res = await updateUser(data, token);
    if (res.code === 200) {
      showMessage('保存成功', 'success');
      router.push('/admin/users');
    } else {
      showMessage(res.msg || '保存失败', 'error');
    }
  } catch (e) {
    showMessage(e.message || '保存失败', 'error');
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
.user-detail-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 18px 0 rgba(45, 140, 240, 0.07);
  padding: 32px 38px 18px 38px;
}
.form-row {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 18px;
}
.form-row label {
  width: 100px;
  font-size: 1.05rem;
  color: #555;
  font-weight: 600;
  padding-top: 7px;
}
.form-row input,
.form-row select {
  flex: 1;
  padding: 8px 12px;
  border-radius: 7px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.05rem;
  color: #6366f1;
  background: #f8fafc;
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
</style>
