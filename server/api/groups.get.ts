export default defineEventHandler(async (event) => {
  // Mock data - replace with actual database call
  return [
    {
      id: 'auth',
      title: '认证授权',
      description: '用户认证和授权相关接口',
    },
    {
      id: 'user',
      title: '用户中心',
      description: '用户信息管理相关接口',
    },
    // Add more groups as needed
  ];
});
