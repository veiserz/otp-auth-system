const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.DATABASE_URL);
const express = require("express");
const { swaggerUi, swaggerSpec } = require("./config/swagger.js");

const {
  ErrorHandlerMiddleware,
} = require("./middleware/ErrorHandlerMiddleware.js");
const otpRoutes = require("./routes/otp.js");
const { userRouter } = require("./routes/user.js"); // اضافه کردن ایمپورت روت یوزر
const { redisClient } = require("./config/redis.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// استفاده از روت‌های OTP و User
app.use("/otp", otpRoutes);
app.use("/user", userRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(ErrorHandlerMiddleware);

(async () => {
  await redisClient.connect();
  // سپس سرور را اجرا کن
  app.listen(PORT, () => {
    console.log(`✅ Express.js server is running on port ${PORT}`);
  });
})();
