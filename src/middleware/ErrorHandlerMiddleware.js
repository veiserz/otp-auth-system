// Middleware مدیریت خطاها
const ErrorHandlerMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  // اگر خطا status داشته باشد، همان را برگردان
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
};
module.exports = { ErrorHandlerMiddleware };
