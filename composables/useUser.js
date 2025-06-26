/*
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-24 11:30:24
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-24 11:31:14
 */
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import storage from '~/utils/storage';

// Create a shared state outside the composable
const userState = ref(null);

// 初始化时从存储加载用户数据
if (process.client) {
  const userData = storage.getItem('user');
  if (userData) {
    try {
      userState.value = userData;
    } catch (e) {
      console.error('Failed to parse user data:', e);
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

  // Login function
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

  // Check if user is authenticated
  const isAuthenticated = computed(() => {
    return !!userState.value;
  });

  // Check if user has specific role
  const hasRole = (role) => {
    return userState.value?.roles?.includes(role) || false;
  };

  // Update user data
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
