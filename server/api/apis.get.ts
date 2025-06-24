export default defineEventHandler(async (event) => {
  // Mock data - replace with actual database call
  return [
    {
      id: '1',
      title: '用户登录',
      method: 'POST',
      path: '/auth/login',
      summary: '用户登录接口',
      groupId: 'auth',
      requestCount: 1500,
      description: '用户使用账号密码登录系统',
    },
    {
      id: '2',
      title: '获取用户信息',
      method: 'GET',
      path: '/user/info',
      summary: '获取当前登录用户信息',
      groupId: 'user',
      requestCount: 3200,
      description: '获取当前登录用户的详细信息',
    },
    // Add more mock APIs as needed
  ];
});
