import { createClient } from 'redis';
import config from '../../config/config.js';

const redisClient = createClient({
  url: config.REDISURL 
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (err) {
      console.error('Redis connection failed:', err);
      setTimeout(connectRedis,5000)
  }
};

export { redisClient, connectRedis };
