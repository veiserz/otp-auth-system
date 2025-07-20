// Export all controllers from a single entry point
const { requestOtp, verifyOtp } = require("./authController.js");
const { getUserProfile } = require("./userController.js");

module.exports = {
  requestOtp,
  verifyOtp,
  getUserProfile,
};
