/*
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-24 11:30:24
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-24 11:31:14
 */
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

// Create a shared state outside the composable
const userState = ref(null);

// Load user from localStorage on module load
if (process.client) {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      userState.value = JSON.parse(userData);
    } catch (e) {
      console.error('Failed to parse user data:', e);
      localStorage.removeItem('user');
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

  // Logout function
  const logout = () => {
    userState.value = null;
    if (process.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
