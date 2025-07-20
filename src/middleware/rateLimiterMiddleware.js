const rateLimitMap = new Map();
const WINDOW_SIZE = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const RateLimiterMiddleware = (req, res, next) => {
  const mobile = req.body && req.body.mobile;
  if (!mobile) return res.status(400).json({ message: "Mobile is required" });

  const now = Date.now();
  let timestamps = rateLimitMap.get(mobile) || [];

  timestamps = timestamps.filter((ts) => now - ts < WINDOW_SIZE);

  if (timestamps.length >= MAX_REQUESTS) {
    return res
      .status(429)
      .json({ message: "Too many OTP requests. Please try again later." });
  }

  timestamps.push(now);

  rateLimitMap.set(mobile, timestamps);

  next();
};
module.exports = { RateLimiterMiddleware };
