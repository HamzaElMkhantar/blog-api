import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  // Add your configuration here
  apiUrl: process.env.PROFILE_API_KEY,
  apiKey: 'your-api-key',
  maxConcurrentRequests: 10,
  maxRequestTime: 60000, // 1 minute
  maxRetries: 3,
  retryDelay: 5000, // 5 seconds
}));
