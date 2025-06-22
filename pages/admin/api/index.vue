<template>
  <div>
    <div class="admin-section-title">API接口管理</div>
    <div class="admin-filter-bar">
      <select v-model="methodFilter" class="admin-filter-select">
        <option value="">全部方法</option>
        <option v-for="m in methodOptions" :key="m" :value="m">{{ m }}</option>
      </select>
      <select v-model="groupFilter" class="admin-filter-select">
        <option value="">全部分组</option>
        <option v-for="g in groupOptions" :key="g" :value="g">{{ g }}</option>
      </select>
      <button class="group-manage-btn" @click="showGroupManage=true">分组管理</button>
    </div>
    <button class="add-btn" @click="openEditDialog()">新增API</button>
    <table class="admin-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>路径</th>
          <th>方法</th>
          <th>分组</th>
          <th>请求次数</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api in filteredApis" :key="api.id">
          <td>{{ api.title }}</td>
          <td class="mono">{{ api.url }}</td>
          <td>{{ api.method }}</td>
          <td>{{ api.group }}</td>
          <td>{{ api.requestCount }}</td>
          <td>{{ formatDate(api.createTime) }}</td>
          <td>
            <NuxtLink :to="`/admin/api/${api.id}`" class="edit-btn">编辑</NuxtLink>
            <button class="edit-btn delete" @click="openDeleteDialog(api)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="filteredApis.length===0" class="admin-empty">暂无API</div>

    <!-- 编辑/新增弹窗 -->
    <div v-if="editDialogVisible" class="modal-mask">
      <div class="modal-dialog" style="max-width:900px;min-width:600px;">
        <div class="modal-title">{{ editForm.id ? '编辑API' : '新增API' }}</div>
        <form @submit.prevent="submitEdit" autocomplete="off">
          <div class="modal-form-item">
            <label>标题</label>
            <input v-model="editForm.title" required maxlength="32" />
          </div>
          <div class="modal-form-item">
            <label>接口地址</label>
            <input v-model="editForm.url" required maxlength="64" pattern="^/.*" placeholder="如 /api/xxx" />
          </div>
          <div class="modal-form-item">
            <label>请求方式</label>
            <select v-model="editForm.method" required>
              <option v-for="m in methodOptions" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
          <div class="modal-form-item">
            <label>分组</label>
            <select v-model="editForm.group" required>
              <option v-for="g in groupOptions" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>
          <div class="modal-form-item">
            <label>摘要</label>
            <input v-model="editForm.summary" maxlength="64" placeholder="简要描述接口用途" />
          </div>
          <div class="modal-form-item">
            <label>接口说明</label>
            <textarea v-model="editForm.description" maxlength="256" rows="4" placeholder="详细说明接口功能"></textarea>
          </div>
          <div class="modal-form-item">
            <label>请求参数示例</label>
            <textarea v-model="editForm.requestExample" maxlength="512" rows="4" placeholder="如 {name: 张三}"></textarea>
          </div>
          <div class="modal-form-item">
            <label>返回示例</label>
            <textarea v-model="editForm.responseExample" maxlength="512" rows="4" placeholder="如 {code: 0, msg: ok}"></textarea>
          </div>
          <div class="modal-form-item">
            <label>请求参数描述</label>
            <div v-for="(param, idx) in editForm.requestParams" :key="idx" class="param-row">
              <input v-model="param.name" placeholder="参数名" style="width:90px" />
              <select v-model="param.required" style="width:70px"><option :value="true">必填</option><option :value="false">可选</option></select>
              <input v-model="param.description" placeholder="描述" style="flex:1" />
              <button type="button" class="edit-btn delete" @click="editForm.requestParams.splice(idx,1)">删除</button>
            </div>
            <button type="button" class="edit-btn" @click="editForm.requestParams.push({name:'',required:true,description:''})">+参数</button>
          </div>
          <div class="modal-form-item">
            <label>返回状态描述(JSON对象)</label>
            <textarea v-model="editForm.responseStatusText" maxlength="1024" rows="6" placeholder='如 {"code":0,"msg":"ok","data":{}}'></textarea>
          </div>
          <div class="modal-form-actions">
            <button type="submit" class="edit-btn">保存</button>
            <button type="button" class="edit-btn cancel" @click="closeEditDialog">取消</button>
          </div>
          <div v-if="editError" class="modal-error">{{ editError }}</div>
        </form>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="deleteDialogVisible" class="modal-mask">
      <div class="modal-dialog">
        <div class="modal-title">确认删除</div>
        <div class="modal-content">确定要删除 API <b>{{ deleteTarget?.title }}</b> 吗？此操作不可撤销。</div>
        <div class="modal-form-actions">
          <button class="edit-btn delete" @click="doDelete">删除</button>
          <button class="edit-btn cancel" @click="closeDeleteDialog">取消</button>
        </div>
      </div>
    </div>

    <!-- 分组管理弹窗 -->
    <div v-if="showGroupManage" class="modal-mask">
      <div class="modal-dialog" style="min-width:340px;max-width:96vw;">
        <div class="modal-title">分组管理</div>
        <div class="modal-form-item">
          <label>新增分组</label>
          <div style="display:flex;gap:10px;align-items:center;">
            <input v-model="newGroupName" maxlength="16" placeholder="分组名" style="flex:1;" />
            <button class="edit-btn" @click="addGroup">添加</button>
          </div>
        </div>
        <div class="modal-form-item">
          <label>已有分组</label>
          <div v-for="(g,idx) in groupOptions" :key="g" class="group-row">
            <input v-model="groupOptions[idx]" maxlength="16" style="width:120px;" />
            <button class="edit-btn delete" @click="removeGroup(idx)" v-if="groupOptions.length>1">删除</button>
          </div>
        </div>
        <div class="modal-form-actions">
          <button class="edit-btn" @click="closeGroupManage">完成</button>
        </div>
        <div v-if="groupError" class="modal-error">{{ groupError }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const apis = ref([
  {id:'1',title:'二维码生成API',url:'/api/qr',method:'GET',group:'工具类',createTime:new Date(),requestCount:12},
  {id:'2',title:'每日一言API',url:'/api/yy',method:'GET',group:'娱乐类',createTime:new Date(),requestCount:5}
])
const methodOptions = ['GET','POST','PUT','DELETE','PATCH']
const groupOptions = ref(['工具类','娱乐类'])
const methodFilter = ref('')
const groupFilter = ref('')
const showGroupManage = ref(false)
const newGroupName = ref('')
const groupError = ref('')
const filteredApis = computed(()=>{
  return apis.value.filter(api=>
    (!methodFilter.value || api.method===methodFilter.value) &&
    (!groupFilter.value || api.group===groupFilter.value)
  )
})
function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString()
}
// 新增/编辑弹窗逻辑
const editDialogVisible = ref(false)
const editForm = ref({
  id:'', title:'', url:'', method:'GET', group:'', summary:'', description:'', requestExample:'', responseExample:'',
  requestParams: [], responseStatus: {}, responseStatusText: ''
})
const editError = ref('')
function openEditDialog(api) {
  if (api) {
    editForm.value = {
      ...api,
      requestParams: Array.isArray(api.requestParams) ? JSON.parse(JSON.stringify(api.requestParams)) : [],
      responseStatus: api.responseStatus && typeof api.responseStatus === 'object' && !Array.isArray(api.responseStatus) ? JSON.parse(JSON.stringify(api.responseStatus)) : {},
      responseStatusText: api.responseStatus && typeof api.responseStatus === 'object' && !Array.isArray(api.responseStatus) ? JSON.stringify(api.responseStatus, null, 2) : ''
    }
  } else {
    editForm.value = {
      id:'', title:'', url:'', method:'GET', group:groupOptions.value[0]||'', summary:'', description:'', requestExample:'', responseExample:'',
      requestParams: [], responseStatus: {}, responseStatusText: ''
    }
  }
  editError.value = ''
  editDialogVisible.value = true
}
function closeEditDialog() {
  editDialogVisible.value = false
}
function submitEdit() {
  // 简单表单校验
  if (!editForm.value.title.trim() || !editForm.value.url.trim() || !editForm.value.method || !editForm.value.group) {
    editError.value = '请填写完整信息'; return;
  }
  if (!/^\/\w+/.test(editForm.value.url)) {
    editError.value = '路径需以 / 开头'; return;
  }
  // 校验参数描述
  for (const p of editForm.value.requestParams) {
    if (!p.name.trim()) { editError.value = '参数名不能为空'; return; }
  }
  try {
    editForm.value.responseStatus = editForm.value.responseStatusText ? JSON.parse(editForm.value.responseStatusText) : {}
    if (Array.isArray(editForm.value.responseStatus) || typeof editForm.value.responseStatus !== 'object' || !editForm.value.responseStatus) throw new Error()
  } catch {
    editError.value = '返回状态描述需为有效JSON对象'; return;
  }
  if (editForm.value.id) {
    // 编辑
    const idx = apis.value.findIndex(a=>a.id===editForm.value.id)
    if (idx>-1) apis.value[idx] = {...editForm.value}
  } else {
    // 新增
    apis.value.push({
      ...editForm.value,
      id: Date.now().toString(),
      createTime: new Date(),
      requestCount: 0
    })
  }
  closeEditDialog()
}
// 删除弹窗逻辑
const deleteDialogVisible = ref(false)
const deleteTarget = ref(null)
function openDeleteDialog(api) {
  deleteTarget.value = api
  deleteDialogVisible.value = true
}
function closeDeleteDialog() {
  deleteDialogVisible.value = false
  deleteTarget.value = null
}
function doDelete() {
  if (deleteTarget.value) {
    apis.value = apis.value.filter(a=>a.id!==deleteTarget.value.id)
  }
  closeDeleteDialog()
}
// 分组管理逻辑
function addGroup() {
  const name = newGroupName.value.trim()
  if (!name) { groupError.value = '分组名不能为空'; return }
  if (groupOptions.value.includes(name)) { groupError.value = '分组名已存在'; return }
  groupOptions.value.push(name)
  newGroupName.value = ''
  groupError.value = ''
}
function removeGroup(idx) {
  if (groupOptions.value.length <= 1) { groupError.value = '至少保留一个分组'; return }
  groupOptions.value.splice(idx,1)
  groupError.value = ''
}
function closeGroupManage() {
  showGroupManage.value = false
  groupError.value = ''
}
</script>

<style scoped>
.admin-section-title { font-size: 1.15rem; font-weight: bold; color: #6366f1; margin-bottom: 18px; }
.add-btn { background: linear-gradient(90deg,#6366f1,#60a5fa); color: #fff; border: none; border-radius: 8px; padding: 8px 22px; font-size: 1.05rem; font-weight: 600; cursor: pointer; margin-bottom: 18px; box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.07); transition: background 0.2s; }
.add-btn:hover { background: linear-gradient(90deg,#60a5fa,#6366f1); }
.admin-table { width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 10px; overflow: hidden; box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04); }
.admin-table th, .admin-table td { border: 1px solid #e6e6e6; padding: 12px 18px; text-align: left; font-size: 1.07rem; }
.admin-table th { background: #f0f7ff; color: #0284c7; font-weight: 700; }
.mono { font-family: monospace; color: #6366f1; }
.edit-btn { background: #e0e7ff; color: #6366f1; border: none; border-radius: 8px; padding: 6px 18px; font-size: 1.02rem; font-weight: 600; cursor: pointer; margin-right: 8px; transition: background 0.2s; }
.edit-btn:hover { background: #6366f1; color: #fff; }
.edit-btn.cancel { background: #f1f5f9; color: #bbb; }
.edit-btn.delete { background: #fee2e2; color: #ef4444; }
.edit-btn.delete:hover { background: #ef4444; color: #fff; }
.admin-empty { color: #bbb; font-size: 1.03rem; padding: 8px 0; text-align: center; }
.admin-filter-bar { display: flex; gap: 18px; align-items: center; margin-bottom: 12px; }
.admin-filter-select { padding: 6px 18px; border-radius: 8px; border: 1.5px solid #e0e7ef; font-size: 1.05rem; color: #6366f1; background: #f8fafc; }
.group-manage-btn { background: #e0e7ff; color: #6366f1; border: none; border-radius: 8px; padding: 6px 16px; font-size: 1.01rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.group-manage-btn:hover { background: #6366f1; color: #fff; }
.modal-mask {
  position: fixed; left: 0; top: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.18); z-index: 1000; display: flex; align-items: center; justify-content: center;
}
.modal-dialog {
  background: #fff; border-radius: 10px; box-shadow: 0 2px 18px 0 rgba(45,140,240,0.13); padding: 28px 32px 18px 32px; min-width: 320px; max-width: 96vw;
}
.modal-title { font-size: 1.13rem; font-weight: bold; color: #6366f1; margin-bottom: 18px; }
.modal-form-item { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
.modal-form-item label { font-size: 1.01rem; color: #555; }
.modal-form-item input, .modal-form-item select { padding: 7px 12px; border-radius: 7px; border: 1.5px solid #e0e7ef; font-size: 1.05rem; color: #6366f1; background: #f8fafc; }
.modal-form-actions { display: flex; gap: 18px; justify-content: flex-end; margin-top: 12px; }
.modal-error { color: #ef4444; font-size: 0.98rem; margin-top: 8px; text-align: right; }
.modal-content { font-size: 1.05rem; color: #444; margin-bottom: 18px; }
.param-row { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
.group-row { display: flex; gap: 10px; align-items: center; margin-bottom: 8px; }
textarea { resize: vertical; }
</style>
