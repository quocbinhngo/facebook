const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

function generateToken(payload, expired) {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: expired });
}

module.exports = { generateToken };
