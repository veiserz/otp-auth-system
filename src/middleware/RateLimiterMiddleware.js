const rateLimitMap = new Map(); // { mobile: [timestamps] }
const WINDOW_SIZE = 10 * 60 * 1000; // 10 دقیقه
const MAX_REQUESTS = 5; // حداکثر ۵ درخواست در بازه

const RateLimiterMiddleware = (req, res, next) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile is required" });

  const now = Date.now();
  let timestamps = rateLimitMap.get(mobile) || [];

  // حذف درخواست‌های قدیمی خارج از بازه
  timestamps = timestamps.filter((ts) => now - ts < WINDOW_SIZE);

  if (timestamps.length >= MAX_REQUESTS) {
    return res
      .status(429)
      .json({ message: "Too many OTP requests. Please try again later." });
  }

  // ثبت زمان درخواست جدید
  timestamps.push(now);

  rateLimitMap.set(mobile, timestamps);

  next();
};
module.exports = { RateLimiterMiddleware };
