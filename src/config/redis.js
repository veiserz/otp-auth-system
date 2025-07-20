const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

module.exports = { redisClient };
