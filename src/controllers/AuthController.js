const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const { redisClient } = require("../config/redis.js");

const prisma = new PrismaClient();

const requestOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile is required" });

  // تولید OTP تصادفی 6 رقمی
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP for ${mobile}: ${otpCode}`);

  // ذخیره OTP در Redis با TTL (مثلاً 2 دقیقه)
  await redisClient.setEx(`otp:${mobile}`, 120, otpCode);

  res.json({ message: "OTP sent (check logs)" });
};

const verifyOtp = async (req, res) => {
  const { mobile, code } = req.body;
  if (!mobile || !code)
    return res.status(400).json({ message: "Mobile and code are required" });

  // خواندن OTP از Redis
  const redisCode = await redisClient.get(`otp:${mobile}`);

  // بررسی صحت OTP
  if (!redisCode || code !== redisCode) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // حذف OTP پس از استفاده
  await redisClient.del(`otp:${mobile}`);
  console.log("before user");

  let user = await prisma.user.findUnique({ where: { mobile } });
  if (!user) {
    user = await prisma.user.create({
      data: { mobile },
    });
  }

  const token = jwt.sign(
    { userId: user.id, mobile: user.mobile },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  res.json({ token });
};
module.exports = { requestOtp, verifyOtp };
