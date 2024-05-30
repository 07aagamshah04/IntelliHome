const JWT = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    password: user.password,
    role: user.role,
  };
  const token = JWT.sign(payload, SECRET);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, SECRET);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
