const express = require("express");
const { requestOtp, verifyOtp } = require("../controllers/AuthController.js");
const {
  RateLimiterMiddleware,
} = require("../middleware/RateLimiterMiddleware.js");
const {
  validateOtpRequest,
  validateOtpVerify,
} = require("../middleware/Validation Middleware.js");

const otpRoutes = express.Router();

/**
 * @swagger
 * /otp/request:
 *   post:
 *     summary: ارسال درخواست OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent (check logs)
 *       400:
 *         description: Invalid mobile
 */
otpRoutes.post(
  "/request",
  validateOtpRequest,
  RateLimiterMiddleware,
  requestOtp
);

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     summary: تایید کد OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       400:
 *         description: Invalid or expired OTP
 */
otpRoutes.post("/verify", validateOtpVerify, verifyOtp);

module.exports = otpRoutes;
