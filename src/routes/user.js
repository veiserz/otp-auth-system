const { getUserProfile } = require("../controllers/UserController.js");
const { JWTAuthMiddleware } = require("../middleware/JWTAuthMiddleware.js");
const express = require("express");

const userRouter = express.Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: دریافت پروفایل کاربر
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: اطلاعات پروفایل کاربر
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/profile", JWTAuthMiddleware, getUserProfile);

module.exports = { userRouter };
