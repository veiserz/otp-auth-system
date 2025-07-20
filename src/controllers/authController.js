const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const { redisClient } = require("../config/redis.js");

const prisma = new PrismaClient();

const { generateRandomNumber } = require("../utils/generateRandomNumber.js");

const requestOtp = async (req, res) => {
  const { mobile } = req.body;
  console.log(`Requesting OTP for mobile: ${mobile}`);

  if (!mobile) return res.status(400).json({ message: "Mobile is required" });
  const numbergenerate = 6;
  const otpCode = generateRandomNumber(numbergenerate).toString();
  console.log(`OTP for ${mobile}: ${otpCode}`);

  const OTP_EXPIRY_SECONDS = 120;
  await redisClient.setEx(`otp:${mobile}`, OTP_EXPIRY_SECONDS, otpCode);

  res.json({ message: "OTP sent (check logs)" });
};

const verifyOtp = async (req, res) => {
  const { mobile, code } = req.body;
  if (!mobile || !code)
    return res.status(400).json({ message: "Mobile and code are required" });

  const redisCode = await redisClient.get(`otp:${mobile}`);

  if (!redisCode || code !== redisCode) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await redisClient.del(`otp:${mobile}`);
  console.log("before user");

  let user = await prisma.user.findUnique({ where: { mobile } });
  if (!user) {
    user = await prisma.user.create({
      data: { mobile },
    });
  }

  // Ensure JWT_SECRET is set and consistent across all APIs
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  const token = jwt.sign({ userId: user.id, mobile: user.mobile }, jwtSecret, {
    expiresIn: "1d",
  });

  res.json({ token });
};
module.exports = { requestOtp, verifyOtp };
