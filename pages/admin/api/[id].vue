<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ isNew ? "创建新API" : "编辑API详情" }}
      </h1>
      <div class="flex space-x-3">
        <button
          type="button"
          @click="$router.push('/admin/api')"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          返回列表
        </button>
        <button
          type="submit"
          @click="submitEdit"
          :disabled="saving"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <svg
            v-if="saving"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ saving ? "保存中..." : "保存" }}
        </button>
      </div>
    </div>

    <div v-if="!apiData && !isNew" class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">未找到API数据</h3>
      <p class="mt-1 text-sm text-gray-500">请检查API ID是否正确</p>
      <div class="mt-6">
        <button
          type="button"
          @click="$router.push('/admin/api')"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          返回API列表
        </button>
      </div>
    </div>

    <form
      v-else
      class="space-y-6 divide-y divide-gray-200"
      @submit.prevent="submitEdit"
    >
      <div class="space-y-6 sm:space-y-5">
        <div class="space-y-6 sm:space-y-5">
          <!-- 基本信息 -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                基本信息
              </h3>
            </div>
            <div class="px-4 py-5 sm:p-6 space-y-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                  >
                    标题 <span class="text-red-500">*</span>
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="title"
                      v-model="form.title"
                      required
                      maxlength="32"
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-4">
                  <label
                    for="url"
                    class="block text-sm font-medium text-gray-700"
                  >
                    接口地址 <span class="text-red-500">*</span>
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    >
                      {{ apiBase }}
                    </span>
                    <input
                      type="text"
                      id="url"
                      v-model="form.url"
                      required
                      maxlength="64"
                      pattern="^/.*"
                      placeholder="如 /api/xxx"
                      class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                    />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    请以斜杠
                    <code class="bg-gray-100 px-1 py-0.5 rounded">/</code>
                    开头的路径，例如
                    <code class="bg-gray-100 px-1 py-0.5 rounded"
                      >/api/user</code
                    >
                  </p>
                </div>
                <!-- 完整API地址展示 -->
                <div class="sm:col-span-6" v-if="form.url">
                  <label class="block text-sm font-medium text-gray-700">
                    完整接口地址
                  </label>
                  <div class="mt-1">
                    <div class="flex rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                      >
                        {{ form.method || "GET" }}
                      </span>
                      <div class="flex-1 min-w-0">
                        <div class="flex rounded-md shadow-sm">
                          <span
                            class="inline-flex items-center px-3 rounded-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm truncate"
                          >
                            {{ apiBase }}
                          </span>
                          <input
                            type="text"
                            :value="form.url.replace(/^\//, '')"
                            disabled
                            class="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 请求方式 -->
                <div class="sm:col-span-2">
                  <label
                    for="method"
                    class="block text-sm font-medium text-gray-700"
                  >
                    请求方式 <span class="text-red-500">*</span>
                  </label>
                  <div class="mt-1">
                    <select
                      id="method"
                      v-model="form.method"
                      required
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option v-for="m in methodOptions" :key="m" :value="m">
                        {{ m }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- 分组 -->
                <div class="sm:col-span-4">
                  <div class="flex justify-between items-end">
                    <label
                      for="groupId"
                      class="block text-sm font-medium text-gray-700"
                    >
                      分组 <span class="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      @click="showGroupModal = true"
                      class="text-sm text-blue-600 hover:text-blue-800"
                    >
                      管理分组
                    </button>
                  </div>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <select
                      id="groupId"
                      v-model="form.groupId"
                      required
                      class="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option
                        v-for="g in groupOptions"
                        :key="g.id"
                        :value="g.id"
                      >
                        {{ g.title }}
                      </option>
                    </select>
                    <button
                      type="button"
                      @click="fetchGroups"
                      class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                    >
                      <svg
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 摘要 -->
              <div class="sm:col-span-6">
                <label
                  for="summary"
                  class="block text-sm font-medium text-gray-700"
                >
                  摘要
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="summary"
                    v-model="form.summary"
                    maxlength="64"
                    placeholder="简要描述接口用途"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    简洁地描述接口的主要功能，最多64个字符
                  </p>
                </div>
              </div>

              <!-- 接口说明 -->
              <div class="sm:col-span-6">
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700"
                >
                  接口说明
                </label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="3"
                    maxlength="256"
                    placeholder="详细说明接口功能、使用场景、注意事项等"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  ></textarea>
                  <p class="mt-1 text-xs text-gray-500">
                    详细描述接口的功能和使用方法，最多256个字符
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 请求响应示例 -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              请求响应示例
            </h3>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-6">
              <!-- 请求参数示例 -->
              <div>
                <label
                  for="requestExample"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  请求参数示例
                </label>
                <div class="rounded-md shadow-sm">
                  <div
                    class="flex justify-between items-center bg-gray-50 px-3 py-2 border border-b-0 border-gray-300 rounded-t-md"
                  >
                    <div class="flex space-x-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        JSON
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="form.requestExample = '{}'"
                      class="text-xs text-gray-500 hover:text-gray-700"
                    >
                      清空
                    </button>
                  </div>
                  <textarea
                    id="requestExample"
                    v-model="form.requestExample"
                    rows="4"
                    maxlength="512"
                    placeholder='{\n  "key1": "value1",\n  "key2": 123\n}'
                    class="block w-full px-3 py-2 border border-t-0 border-gray-300 rounded-b-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm"
                  ></textarea>
                </div>
              </div>

              <!-- 返回示例 -->
              <div>
                <label
                  for="responseExample"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  返回示例
                </label>
                <div class="rounded-md shadow-sm">
                  <div
                    class="flex justify-between items-center bg-gray-50 px-3 py-2 border border-b-0 border-gray-300 rounded-t-md"
                  >
                    <div class="flex space-x-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                      >
                        JSON
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="form.responseExample = '{}'"
                      class="text-xs text-gray-500 hover:text-gray-700"
                    >
                      清空
                    </button>
                  </div>
                  <textarea
                    id="responseExample"
                    v-model="form.responseExample"
                    rows="6"
                    placeholder='{\n  "code": 0,\n  "msg": "success",\n  "data": {}\n}'
                    class="block w-full px-3 py-2 border border-t-0 border-gray-300 rounded-b-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 请求参数描述 -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              请求参数描述
            </h3>
            <button
              type="button"
              @click="
                form.requestParams.push({
                  name: '',
                  type: 'string',
                  required: true,
                  description: '',
                })
              "
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                class="-ml-0.5 mr-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              添加参数
            </button>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div
            v-if="form.requestParams.length === 0"
            class="text-center py-4 text-sm text-gray-500"
          >
            暂无请求参数，点击右上角"添加参数"按钮添加
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="(param, idx) in form.requestParams"
              :key="idx"
              class="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-12">
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >参数名</label
                  >
                  <input
                    v-model="param.name"
                    type="text"
                    placeholder="如：username"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >类型</label
                  >
                  <select
                    v-model="param.type"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                    <option value="boolean">boolean</option>
                    <option value="null">null</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >必填</label
                  >
                  <select
                    v-model="param.required"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option :value="true">是</option>
                    <option :value="false">否</option>
                  </select>
                </div>
                <div class="sm:col-span-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >描述</label
                  >
                  <input
                    v-model="param.description"
                    type="text"
                    placeholder="参数说明"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="sm:col-span-1 flex items-end">
                  <button
                    type="button"
                    @click="form.requestParams.splice(idx, 1)"
                    class="inline-flex items-center justify-center p-1.5 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回数据描述 -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              返回数据描述
            </h3>
            <button
              type="button"
              @click="
                form.responseStatus.push({
                  name: '',
                  type: 'string',
                  meaning: '',
                  description: '',
                })
              "
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg
                class="-ml-0.5 mr-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              添加字段
            </button>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div
            v-if="form.responseStatus.length === 0"
            class="text-center py-4 text-sm text-gray-500"
          >
            暂无返回字段，点击右上角"添加字段"按钮添加
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="(field, idx) in form.responseStatus"
              :key="idx"
              class="bg-green-50 p-4 rounded-lg border border-green-200"
            >
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-12">
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >字段名</label
                  >
                  <input
                    v-model="field.name"
                    type="text"
                    placeholder="如：code"
                    class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >类型</label
                  >
                  <select
                    v-model="field.type"
                    class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                    <option value="boolean">boolean</option>
                    <option value="null">null</option>
                  </select>
                </div>
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >含义</label
                  >
                  <input
                    v-model="field.meaning"
                    type="text"
                    placeholder="如：状态码"
                    class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >说明</label
                  >
                  <input
                    v-model="field.description"
                    type="text"
                    placeholder="字段说明（可选）"
                    class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="sm:col-span-1 flex items-end">
                  <button
                    type="button"
                    @click="form.responseStatus.splice(idx, 1)"
                    class="inline-flex items-center justify-center p-1.5 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="pt-5">
        <div class="flex justify-end space-x-3">
          <NuxtLink
            to="/admin/api"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </NuxtLink>
          <button
            type="submit"
            :disabled="saving"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <svg
              v-if="saving"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ saving ? "保存中..." : "保存" }}
          </button>
        </div>
      </div>
    </form>

    <!-- 分组管理弹窗 -->
    <GroupManagementModal
      v-model="showGroupModal"
      :groups="groupOptions"
      :new-group-name="newGroupName"
      :error="groupError"
      @update:new-group-name="(val) => (newGroupName = val)"
      @add="handleAddGroup"
      @delete="handleDeleteGroup"
    />

    <MessageModal
      v-model="messageModal.show"
      :message="messageModal.text"
      :type="messageModal.type"
    />
  </div>
</template>

<script setup>
import GroupManagementModal from "~/components/admin/GroupManagementModal.vue";

definePageMeta({
  layout: "admin",
});
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
const saving = ref(false);
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
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
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
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
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
async function handleDeleteGroup(group) {
  groupError.value = "";
  if (!confirm(`确定删除分组“${group.title}”？`)) return;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = user?.token || "";
  try {
    const res = await deleteGroup(group.id, token);
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
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = user?.token || "";
  try {
    const res = await getApiDetail(apiId, token);
    if (res.code === 200 && res.data) {
      apiData.value = res.data;
      Object.assign(form, {
        ...res.data,
        requestParams: Array.isArray(res.data.requestParams)
          ? JSON.parse(JSON.stringify(res.data.requestParams))
          : [],
        responseStatus: Array.isArray(res.data.responseStatus)
          ? JSON.parse(JSON.stringify(res.data.responseStatus))
          : [],
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
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
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
@media (max-width: 768px) {
  /* Base container and spacing */
  html,
  body {
    width: 100%;
    overflow-x: hidden;
  }

  .mx-auto {
    width: 100%;
    max-width: 100%;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    box-sizing: border-box;
  }

  /* Form layout */
  .form-row {
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .form-row label {
    width: 100%;
    padding: 0;
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
  }

  .form-row input,
  .form-row select,
  .form-row textarea {
    width: 100%;
    min-height: 2.75rem;
    padding: 0.65rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.5rem;
  }

  .form-row textarea {
    min-height: 6rem;
  }

  /* Grid adjustments */
  .sm\:col-span-1,
  .sm\:col-span-2,
  .sm\:col-span-3,
  .sm\:col-span-4,
  .sm\:col-span-6 {
    grid-column: span 1 / span 1;
    width: 100%;
  }

  /* Modal styles */
  .modal-group {
    width: 92%;
    max-width: calc(100% - 2rem);
    margin: 1rem auto;
    padding: 1.25rem 1rem;
    box-sizing: border-box;
  }

  .modal-group-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    padding: 0.75rem 0;
  }

  .modal-group-item button {
    align-self: flex-start;
    margin-top: 0.5rem;
  }

  /* Form actions */
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .form-actions button {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    justify-content: center;
  }

  /* Button adjustments */
  button {
    min-height: 2.75rem;
    padding: 0.65rem 1rem;
    font-size: 1rem;
  }

  /* Table and list items */
  .param-block {
    padding: 1rem;
    margin: 0 -0.5rem 1rem;
    width: calc(100% + 1rem);
    box-sizing: border-box;
  }

  .param-block-row {
    margin-bottom: 0.75rem;
  }

  /* Header adjustments */
  .flex.justify-between.items-center {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .flex.space-x-3 {
    width: 100%;
    gap: 0.75rem;
  }

  .flex.space-x-3 button {
    flex: 1;
    text-align: center;
  }

  /* Responsive text */
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  /* Section spacing */
  .space-y-6 > div {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    max-width: 100%;
    overflow: hidden;
  }

  .space-y-6 > div:first-child {
    margin-top: 0;
  }

  .space-y-6 > div:last-child {
    margin-bottom: 0;
  }

  /* Adjust padding in cards */
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  /* Input groups */
  .flex.items-center {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .flex.items-center input[type="text"] {
    flex: 1 1 100%;
    margin-bottom: 0.5rem;
  }

  /* Make sure all buttons are touch-friendly */
  button,
  [role="button"] {
    min-width: 44px;
    min-height: 44px;
  }
}
</style>
