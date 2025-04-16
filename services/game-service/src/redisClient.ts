import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://redis:6379' // host: redis (з docker-compose)
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const initRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('✅ Redis connected');
    }
};

export default redisClient;