<template>
  <div class="overflow-x-auto">
    <div class="align-middle inline-block min-w-full">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <!-- 表头 -->
          <thead class="bg-gray-50">
            <tr>
              <th 
                v-for="(column, index) in columns" 
                :key="index"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="[column.headerClass, { 'cursor-pointer': sortable && column.sortable !== false }]"
                @click="handleSort(column)"
              >
                <div class="flex items-center">
                  <slot :name="`header-${column.prop}`" :column="column">
                    {{ column.label || column.prop }}
                  </slot>
                  <!-- 排序图标 -->
                  <span v-if="sortable && column.sortable !== false" class="ml-1 flex flex-col">
                    <span 
                      class="h-3 w-3"
                      :class="{
                        'text-gray-300': sortProp !== column.prop || sortOrder !== 'asc',
                        'text-blue-500': sortProp === column.prop && sortOrder === 'asc'
                      }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    <span 
                      class="h-3 w-3 -mt-1"
                      :class="{
                        'text-gray-300': sortProp !== column.prop || sortOrder !== 'desc',
                        'text-blue-500': sortProp === column.prop && sortOrder === 'desc'
                      }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </span>
                </div>
              </th>
              <th v-if="hasActions" scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          
          <!-- 表格内容 -->
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(row, rowIndex) in sortedData" 
              :key="rowIndex"
              :class="[{
                'bg-blue-50': striped && rowIndex % 2 === 0,
                'hover:bg-gray-50': hover
              }, row.rowClass]"
            >
              <td 
                v-for="(column, colIndex) in columns" 
                :key="colIndex"
                class="px-6 py-4 whitespace-nowrap text-sm"
                :class="[column.cellClass]"
              >
                <slot :name="`cell-${column.prop}`" :row="row" :value="row[column.prop]" :index="rowIndex">
                  {{ formatCellValue(row, column) }}
                </slot>
              </td>
              
              <!-- 操作列 -->
              <td v-if="hasActions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <slot name="actions" :row="row" :index="rowIndex">
                  <button 
                    v-for="(action, actionIndex) in actions" 
                    :key="actionIndex"
                    @click="handleAction(action, row, $event)"
                    class="text-blue-600 hover:text-blue-900 mr-3 last:mr-0"
                    :class="action.class"
                  >
                    {{ action.label }}
                  </button>
                </slot>
              </td>
            </tr>
            
            <!-- 空状态 -->
            <tr v-if="!data || data.length === 0">
              <td :colspan="columns.length + (hasActions ? 1 : 0)" class="px-6 py-4 text-center text-sm text-gray-500">
                <slot name="empty">
                  暂无数据
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- 分页 -->
        <div v-if="pagination && data.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="currentPage > 1 ? currentPage-- : null" 
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              上一页
            </button>
            <button 
              @click="currentPage < totalPages ? currentPage++ : null" 
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              下一页
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到
                <span class="font-medium">{{ Math.min(currentPage * pageSize, total) }}</span> 条，共
                <span class="font-medium">{{ total }}</span> 条
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button 
                  @click="currentPage > 1 ? currentPage-- : null" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">上一页</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- 页码 -->
                <template v-for="page in visiblePages" :key="page">
                  <button 
                    v-if="page === '...'"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    disabled
                  >
                    {{ page }}
                  </button>
                  <button 
                    v-else
                    @click="currentPage = page"
                    :class="{
                      'z-10 bg-blue-50 border-blue-500 text-blue-600': currentPage === page,
                      'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': currentPage !== page
                    }"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <button 
                  @click="currentPage < totalPages ? currentPage++ : null" 
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">下一页</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  // 表格列配置
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  // 表格数据
  data: {
    type: Array,
    default: () => []
  },
  // 是否显示斑马纹
  stripe: {
    type: Boolean,
    default: true
  },
  // 是否显示悬浮效果
  hover: {
    type: Boolean,
    default: true
  },
  // 是否可排序
  sortable: {
    type: Boolean,
    default: false
  },
  // 默认排序字段
  defaultSort: {
    type: Object,
    default: () => ({
      prop: '',
      order: 'ascending' // 'ascending' or 'descending'
    })
  },
  // 操作按钮配置
  actions: {
    type: Array,
    default: () => []
  },
  // 是否启用分页
  pagination: {
    type: [Boolean, Object],
    default: false
  },
  // 当前页码
  currentPage: {
    type: Number,
    default: 1
  },
  // 每页显示条数
  pageSize: {
    type: Number,
    default: 10
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 是否显示操作列
  showActions: {
    type: Boolean,
    default: false
  },
  // 自定义行类名
  rowClassName: {
    type: [String, Function],
    default: ''
  }
});

const emit = defineEmits([
  'sort-change',
  'current-change',
  'size-change',
  'action',
  'update:currentPage',
  'update:pageSize'
]);

// 使用 v-model 管理当前页码和每页条数
const currentPageModel = useVModel(props, 'currentPage', emit, { eventName: 'update:currentPage' });
const pageSizeModel = useVModel(props, 'pageSize', emit, { eventName: 'update:pageSize' });

// 排序相关
const sortProp = ref(props.defaultSort.prop || '');
const sortOrder = ref(props.defaultSort.order || 'ascending');

// 是否有操作列
const hasActions = computed(() => props.showActions || (props.actions && props.actions.length > 0) || !!slots.actions);

// 分页相关
const totalPages = computed(() => {
  const total = props.pagination && props.pagination.total !== undefined ? props.pagination.total : props.data.length;
  return Math.ceil(total / pageSizeModel.value);
});

// 可见页码
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPageModel.value;
  
  if (total <= 7) {
    // 总页数小于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // 总页数大于7，显示部分页码
    if (current <= 4) {
      // 当前页在左侧
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      // 当前页在右侧
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // 当前页在中间
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

// 排序后的数据
const sortedData = computed(() => {
  if (!props.sortable || !sortProp.value) {
    return paginatedData.value;
  }
  
  return [...paginatedData.value].sort((a, b) => {
    const aValue = a[sortProp.value];
    const bValue = b[sortProp.value];
    
    if (aValue === bValue) return 0;
    
    const result = aValue > bValue ? 1 : -1;
    return sortOrder.value === 'ascending' ? result : -result;
  });
});

// 分页数据
const paginatedData = computed(() => {
  if (!props.pagination) {
    return props.data;
  }
  
  const start = (currentPageModel.value - 1) * pageSizeModel.value;
  const end = start + pageSizeModel.value;
  
  return props.data.slice(start, end);
});

// 处理排序
const handleSort = (column) => {
  if (!props.sortable || column.sortable === false) return;
  
  if (sortProp.value === column.prop) {
    // 同一列点击切换排序方向
    sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : 'ascending';
  } else {
    // 不同列点击按升序排序
    sortProp.value = column.prop;
    sortOrder.value = 'ascending';
  }
  
  emit('sort-change', { column, prop: sortProp.value, order: sortOrder.value });
};

// 处理操作按钮点击
const handleAction = (action, row, event) => {
  emit('action', { action, row, event });
};

// 格式化单元格值
const formatCellValue = (row, column) => {
  const value = row[column.prop];
  
  if (column.formatter) {
    return column.formatter(row, column, value, row._index);
  }
  
  return value;
};

// 监听分页变化
watch(currentPageModel, (newVal) => {
  emit('current-change', newVal);
});

watch(pageSizeModel, (newVal) => {
  emit('size-change', newVal);
  currentPageModel.value = 1; // 每页条数变化时重置到第一页
});
</script>
