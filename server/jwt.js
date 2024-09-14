const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET; // Load secret from environment variables

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    email: user.email,
    id: user._id
  };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Token is invalid');
  }
}

module.exports = { generateToken, verifyToken };
