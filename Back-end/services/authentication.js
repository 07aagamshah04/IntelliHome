const JWT = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    password: user.password,
    role: user.role,
  };
  const options = {
    expiresIn: "1d", // Token expires in 1 day
  };
  const token = JWT.sign(payload, SECRET, options);
  return token;
}

function validateToken(token) {
  try {
    const payload = JWT.verify(token, SECRET);
    return payload;
  } catch (error) {
    // Handle token validation error, e.g., token expired, invalid token, etc.
    throw new Error("Invalid or expired token");
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};