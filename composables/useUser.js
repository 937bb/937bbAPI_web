/**
 * @description: 用户状态管理组合式函数
 * @author: 937bb Team
 * @lastUpdate: 2025-06-27
 */
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import storage from '~/utils/storage';

// 在组合式函数外部创建共享状态
const userState = ref(null);

/**
 * 初始化用户状态
 * 从本地存储中加载已登录用户数据
 */
if (process.client) {
  const userData = storage.getItem('user');
  if (userData) {
    try {
      userState.value = userData;
    } catch (e) {
      console.error('解析用户数据失败:', e);
      storage.removeItem('user');
    }
  }
}

export function useUser() {
  const router = useRouter();
  
  // Use the shared state
  const user = computed({
    get: () => userState.value,
    set: (val) => { userState.value = val; }
  });

  /**
   * 用户登录
   * @param {Object} userData - 用户数据对象
   * @returns {Object} 登录后的用户数据
   */
  const login = (userData) => {
    userState.value = userData;
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return userData;
  };

  // 用户登出
  const logout = () => {
    userState.value = null;
    if (process.client) {
      storage.removeItem('user');
      storage.removeToken();
    }
    router.push('/user/login');
  };

  /**
   * 检查用户是否已认证
   * @returns {boolean} 是否已登录
   */
  const isAuthenticated = computed(() => {
    return !!userState.value;
  });

  /**
   * 检查用户是否拥有指定角色
   * @param {string} role - 要检查的角色名称
   * @returns {boolean} 是否拥有该角色
   */
  const hasRole = (role) => {
    return userState.value?.roles?.includes(role) || false;
  };

  /**
   * 更新用户数据
   * @param {Object} newData - 新的用户数据
   * @returns {Object} 更新后的用户数据
   */
  const updateUser = (newData) => {
    if (!userState.value) return;
    userState.value = { ...userState.value, ...newData };
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userState.value));
    }
    return userState.value;
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    updateUser,
  };
}
