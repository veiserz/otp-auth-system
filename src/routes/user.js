const { getUserProfile } = require("../controllers/index.js");
const { JWTAuthMiddleware } = require("../middleware/jwtAuthMiddleware.js");
const express = require("express");

const userRouter = express.Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: information about the user
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/profile", JWTAuthMiddleware, getUserProfile);

module.exports = { userRouter };
