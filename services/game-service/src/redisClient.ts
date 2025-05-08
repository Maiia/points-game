import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const redisPublisher = redisClient.duplicate();
export const redisSubscriber = redisClient.duplicate();

export async function initRedis() {
  try {
    await redisClient.connect();
    await redisPublisher.connect(); // ⬅️ Підʼєднуємо дублікати теж
    await redisSubscriber.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error(err);
    console.log("Failed to connect to Redis");
  }
}

export default redisClient;
