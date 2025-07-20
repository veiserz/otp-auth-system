// filepath: /home/masoud/Music/task/otp-auth-system/src/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OTP Auth System API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"], // مسیر فایل‌های روت برای داکیومنت
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
