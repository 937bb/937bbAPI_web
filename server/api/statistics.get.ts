export default defineEventHandler(async (event) => {
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Mock data - replace with actual database call
  return {
    date: today,
    totalRequests: 1245,
    successRequests: 1200,
    errorRequests: 45,
    activeUsers: 342,
    newUsers: 28,
    endpoints: [
      { path: '/auth/login', count: 450 },
      { path: '/user/info', count: 320 },
      { path: '/api/data', count: 250 },
      { path: '/products', count: 155 },
      { path: '/orders', count: 70 }
    ],
    responseTimes: {
      p50: 120,  // ms
      p90: 350,  // ms
      p99: 1200  // ms
    },
    statusCodes: {
      '2xx': 1200,
      '4xx': 35,
      '5xx': 10
    }
  };
});
