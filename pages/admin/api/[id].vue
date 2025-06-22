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
      <div class="form-row">
        <label>请求方式</label>
        <select v-model="form.method" required>
          <option v-for="m in methodOptions" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
      <div class="form-row">
        <label>分组</label>
        <select v-model="form.group" required>
          <option v-for="g in groupOptions" :key="g" :value="g">{{ g }}</option>
        </select>
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
        <textarea v-model="form.responseExample" maxlength="512" rows="4" placeholder="如 {code: 0, msg: ok}"></textarea>
      </div>
      <div class="form-row">
        <label>请求参数描述</label>
        <div v-for="(param, idx) in form.requestParams" :key="idx" class="param-block">
          <div class="param-block-row">
            <input v-model="param.name" placeholder="参数名" />
          </div>
          <div class="param-block-row">
            <select v-model="param.required"><option :value="true">必填</option><option :value="false">可选</option></select>
          </div>
          <div class="param-block-row">
            <input v-model="param.description" placeholder="描述" />
          </div>
          <div class="param-block-row">
            <button type="button" class="edit-btn delete" @click="form.requestParams.splice(idx,1)">删除</button>
          </div>
          <hr class="param-block-divider" v-if="form.requestParams.length>1 && idx<form.requestParams.length-1" />
        </div>
        <button type="button" class="edit-btn" @click="form.requestParams.push({name:'',required:true,description:''})">+参数</button>
      </div>
      <div class="form-row">
        <label>返回状态描述(JSON对象)</label>
        <textarea v-model="form.responseStatusText" maxlength="1024" rows="6" placeholder='如 {"code":0,"msg":"ok","data":{}}'></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="edit-btn">保存</button>
        <NuxtLink to="/admin/api" class="edit-btn cancel">返回列表</NuxtLink>
      </div>
      <div v-if="editError" class="modal-error">{{ editError }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// mock: 可用pinia/接口替换
const apis = ref([
  {id:'1',title:'二维码生成API',url:'/api/qr',method:'GET',group:'工具类',createTime:new Date(),requestCount:12,summary:'二维码生成',description:'生成二维码图片',requestExample:'{"text":"hello"}',responseExample:'{"code":0}',requestParams:[{name:'text',required:true,description:'二维码内容'}],responseStatus:{code:0,msg:'ok',data:{}}},
  {id:'2',title:'每日一言API',url:'/api/yy',method:'GET',group:'娱乐类',createTime:new Date(),requestCount:5,summary:'每日一句',description:'获取一句话',requestExample:'',responseExample:'',requestParams:[],responseStatus:{code:0,msg:'ok',data:{}}}
])
const methodOptions = ['GET','POST','PUT','DELETE','PATCH']
const groupOptions = ref(['工具类','娱乐类'])
const apiId = route.params.id
const apiData = computed(()=>apis.value.find(a=>a.id===apiId))
const form = reactive({
  id:'', title:'', url:'', method:'GET', group:'', summary:'', description:'', requestExample:'', responseExample:'',
  requestParams: [], responseStatus: {}, responseStatusText: ''
})
const editError = ref('')
if (apiData.value) {
  Object.assign(form, {
    ...apiData.value,
    requestParams: Array.isArray(apiData.value.requestParams) ? JSON.parse(JSON.stringify(apiData.value.requestParams)) : [],
    responseStatus: apiData.value.responseStatus && typeof apiData.value.responseStatus==='object' && !Array.isArray(apiData.value.responseStatus) ? JSON.parse(JSON.stringify(apiData.value.responseStatus)) : {},
    responseStatusText: apiData.value.responseStatus && typeof apiData.value.responseStatus==='object' && !Array.isArray(apiData.value.responseStatus) ? JSON.stringify(apiData.value.responseStatus, null, 2) : ''
  })
}
function submitEdit() {
  if (!form.title.trim() || !form.url.trim() || !form.method || !form.group) {
    editError.value = '请填写完整信息'; return;
  }
  if (!/^\/\w+/.test(form.url)) {
    editError.value = '路径需以 / 开头'; return;
  }
  for (const p of form.requestParams) {
    if (!p.name.trim()) { editError.value = '参数名不能为空'; return; }
  }
  try {
    form.responseStatus = form.responseStatusText ? JSON.parse(form.responseStatusText) : {}
    if (Array.isArray(form.responseStatus) || typeof form.responseStatus !== 'object' || !form.responseStatus) throw new Error()
    // 结构校验
    if (!('code' in form.responseStatus) || typeof form.responseStatus.code !== 'number') {
      editError.value = '返回内容需包含 code 字段且为数字'; return;
    }
    if (!('msg' in form.responseStatus) || typeof form.responseStatus.msg !== 'string') {
      editError.value = '返回内容需包含 msg 字段且为字符串'; return;
    }
  } catch {
    editError.value = '返回状态描述需为有效JSON对象，且包含 code(数字)、msg(字符串) 字段'; return;
  }
  // mock保存
  const idx = apis.value.findIndex(a=>a.id===form.id)
  if (idx>-1) apis.value[idx] = {...form}
  editError.value = ''
  router.push('/admin/api')
}
</script>

<style scoped>
.admin-section-title { font-size: 1.15rem; font-weight: bold; color: #6366f1; margin-bottom: 18px; }
.api-detail-form { width: 100%; margin: 0; background: #fff; border-radius: 10px; box-shadow: 0 2px 18px 0 rgba(45,140,240,0.07); padding: 32px 3vw 18px 3vw; }
.form-row { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 18px; }
.form-row label { width: 120px; font-size: 1.05rem; color: #555; font-weight: 600; padding-top: 7px; }
.form-row input, .form-row select, .form-row textarea { flex: 1; padding: 8px 12px; border-radius: 7px; border: 1.5px solid #e0e7ef; font-size: 1.05rem; color: #6366f1; background: #f8fafc; }
.form-row textarea { resize: vertical; }
.form-actions { display: flex; gap: 18px; justify-content: flex-end; margin-top: 18px; }
.edit-btn { background: #e0e7ff; color: #6366f1; border: none; border-radius: 8px; padding: 7px 22px; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.edit-btn:hover { background: #6366f1; color: #fff; }
.edit-btn.cancel { background: #f1f5f9; color: #bbb; }
.edit-btn.delete { background: #fee2e2; color: #ef4444; }
.edit-btn.delete:hover { background: #ef4444; color: #fff; }
.modal-error { color: #ef4444; font-size: 0.98rem; margin-top: 8px; text-align: right; }
.param-block { background: #f8fafc; border-radius: 7px; padding: 14px 14px 8px 14px; margin-bottom: 14px; box-shadow: 0 1.5px 8px 0 rgba(45,140,240,0.04); }
.param-block-row { margin-bottom: 8px; }
.param-block-row:last-child { margin-bottom: 0; }
.param-block input, .param-block select { width: 100%; margin-bottom: 0; }
.param-block-divider { border: none; border-top: 1px dashed #e0e7ef; margin: 10px 0 0 0; }
@media (max-width: 700px) {
  .param-row { flex-direction: column; align-items: stretch; gap: 8px; }
  .param-row input, .param-row select { width: 100% !important; }
}
</style>
