import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || process.env.REDIS_HOST_DOCKER,
  port: process.env.REDIS_PORT
});

export default redisClient;
