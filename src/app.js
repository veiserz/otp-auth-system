const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const { swaggerUi, swaggerSpec } = require("./config/swagger.js");
const {
  ErrorHandlerMiddleware,
} = require("./middleware/errorHandlerMiddleware.js");
const { otpRoutes, userRouter } = require("./routes/index.js");
const { redisClient } = require("./config/redis.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/otp", otpRoutes);
app.use("/user", userRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(ErrorHandlerMiddleware);

(async () => {
  await redisClient.connect();
  app.listen(PORT, () => {
    console.log(`✅ Express.js server is running on port ${PORT}`);
  });
})();
