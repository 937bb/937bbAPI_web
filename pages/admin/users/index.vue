<template>
  <div>
    <div class="admin-section-title">用户列表</div>
    <button class="add-btn" @click="showAddDialog=true">新增用户</button>
    <table class="admin-table" v-if="users.length">
      <thead>
        <tr>
          <th>用户名</th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>角色</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><NuxtLink :to="`/admin/users/${user.id}`" class="edit-btn">{{ user.username }}</NuxtLink></td>
          <td>{{ user.nickname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role==='admin'?'管理员':'普通用户' }}</td>
          <td>{{ user.status==='active'?'正常':'禁用' }}</td>
          <td>
            <NuxtLink :to="`/admin/users/${user.id}`" class="edit-btn">编辑</NuxtLink>
            <button class="edit-btn delete" @click="openDeleteDialog(user)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="admin-empty">暂无用户</div>

    <!-- 新增用户弹窗 -->
    <div v-if="showAddDialog" class="modal-mask">
      <div class="modal-dialog" style="min-width:340px;max-width:96vw;">
        <div class="modal-title">新增用户</div>
        <form @submit.prevent="submitAdd">
          <div class="modal-form-item">
            <label>用户名</label>
            <input v-model="addForm.username" required maxlength="32" />
          </div>
          <div class="modal-form-item">
            <label>昵称</label>
            <input v-model="addForm.nickname" maxlength="32" />
          </div>
          <div class="modal-form-item">
            <label>邮箱</label>
            <input v-model="addForm.email" type="email" maxlength="64" />
          </div>
          <div class="modal-form-item">
            <label>角色</label>
            <select v-model="addForm.role">
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          <div class="modal-form-item">
            <label>状态</label>
            <select v-model="addForm.status">
              <option value="active">正常</option>
              <option value="banned">禁用</option>
            </select>
          </div>
          <div class="modal-form-actions">
            <button type="submit" class="edit-btn">保存</button>
            <button type="button" class="edit-btn cancel" @click="closeAddDialog">取消</button>
          </div>
          <div v-if="addError" class="modal-error">{{ addError }}</div>
        </form>
      </div>
    </div>
    <!-- 删除确认弹窗 -->
    <div v-if="deleteDialogVisible" class="modal-mask">
      <div class="modal-dialog">
        <div class="modal-title">确认删除</div>
        <div class="modal-content">确定要删除用户 <b>{{ deleteTarget?.username }}</b> 吗？此操作不可撤销。</div>
        <div class="modal-form-actions">
          <button class="edit-btn delete" @click="doDelete">删除</button>
          <button class="edit-btn cancel" @click="closeDeleteDialog">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const users = ref([
  {id:'1',username:'admin',nickname:'超级管理员',email:'admin@test.com',role:'admin',status:'active'},
  {id:'2',username:'user1',nickname:'普通用户',email:'user1@test.com',role:'user',status:'active'}
])
const showAddDialog = ref(false)
const addForm = ref({username:'',nickname:'',email:'',role:'user',status:'active'})
const addError = ref('')
function submitAdd() {
  if (!addForm.value.username.trim()) { addError.value = '用户名不能为空'; return }
  if (addForm.value.email && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(addForm.value.email)) { addError.value = '邮箱格式不正确'; return }
  if (users.value.some(u=>u.username===addForm.value.username)) { addError.value = '用户名已存在'; return }
  users.value.push({
    ...addForm.value,
    id: Date.now().toString()
  })
  showAddDialog.value = false
  addError.value = ''
  addForm.value = {username:'',nickname:'',email:'',role:'user',status:'active'}
}
function closeAddDialog() {
  showAddDialog.value = false
  addError.value = ''
}
// 删除逻辑
const deleteDialogVisible = ref(false)
const deleteTarget = ref(null)
function openDeleteDialog(user) {
  deleteTarget.value = user
  deleteDialogVisible.value = true
}
function closeDeleteDialog() {
  deleteDialogVisible.value = false
  deleteTarget.value = null
}
function doDelete() {
  if (deleteTarget.value) {
    users.value = users.value.filter(u=>u.id!==deleteTarget.value.id)
  }
  closeDeleteDialog()
}
</script>

<style scoped>
.admin-section-title { font-size: 1.15rem; font-weight: bold; color: #6366f1; margin-bottom: 18px; }
.add-btn { background: linear-gradient(90deg,#6366f1,#60a5fa); color: #fff; border: none; border-radius: 8px; padding: 8px 22px; font-size: 1.05rem; font-weight: 600; cursor: pointer; margin-bottom: 18px; box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.07); transition: background 0.2s; }
.add-btn:hover { background: linear-gradient(90deg,#60a5fa,#6366f1); }
.admin-table { width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 10px; overflow: hidden; box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04); }
.admin-table th, .admin-table td { border: 1px solid #e6e6e6; padding: 12px 18px; text-align: left; font-size: 1.07rem; }
.admin-table th { background: #f0f7ff; color: #0284c7; font-weight: 700; }
.edit-btn { background: #e0e7ff; color: #6366f1; border: none; border-radius: 8px; padding: 6px 18px; font-size: 1.02rem; font-weight: 600; cursor: pointer; margin-right: 8px; transition: background 0.2s; }
.edit-btn:hover { background: #6366f1; color: #fff; }
.edit-btn.cancel { background: #f1f5f9; color: #bbb; }
.edit-btn.delete { background: #fee2e2; color: #ef4444; }
.edit-btn.delete:hover { background: #ef4444; color: #fff; }
.admin-empty { color: #bbb; font-size: 1.03rem; padding: 8px 0; text-align: center; }
.modal-mask { position: fixed; left: 0; top: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.18); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.modal-dialog { background: #fff; border-radius: 10px; box-shadow: 0 2px 18px 0 rgba(45,140,240,0.13); padding: 28px 32px 18px 32px; min-width: 320px; max-width: 96vw; }
.modal-title { font-size: 1.13rem; font-weight: bold; color: #6366f1; margin-bottom: 18px; }
.modal-form-item { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
.modal-form-item label { font-size: 1.01rem; color: #555; }
.modal-form-item input, .modal-form-item select { padding: 7px 12px; border-radius: 7px; border: 1.5px solid #e0e7ef; font-size: 1.05rem; color: #6366f1; background: #f8fafc; }
.modal-form-actions { display: flex; gap: 18px; justify-content: flex-end; margin-top: 12px; }
.modal-error { color: #ef4444; font-size: 0.98rem; margin-top: 8px; text-align: right; }
.modal-content { font-size: 1.05rem; color: #444; margin-bottom: 18px; }
</style>
