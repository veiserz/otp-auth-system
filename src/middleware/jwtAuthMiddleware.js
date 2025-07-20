const jwt = require("jsonwebtoken");

const JWTAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res
          .status(401)
          .json({ message: "Token error", error: err.message });
      }
    }
    console.log("Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { JWTAuthMiddleware };
