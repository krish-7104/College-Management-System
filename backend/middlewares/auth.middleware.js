const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return ApiResponse.unauthorized("Authentication token required").send(
        res
      );
    }

    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.userId) {
        return ApiResponse.unauthorized("Invalid token format").send(res);
      }

      req.userId = decoded.userId;
      req.token = token;
      next();
    } catch (jwtError) {
      console.error("JWT Error:", jwtError);
      return ApiResponse.unauthorized("Invalid or expired token").send(res);
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return ApiResponse.unauthorized("Authentication failed").send(res);
  }
};

module.exports = auth;
